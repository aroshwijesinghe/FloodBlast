import { randomUUID } from "node:crypto";
import { HttpError } from "./http.mjs";

const seedRequests = [
  { id: "medical-badulla", name: "First-aid kits", district: "Badulla", category: "medical", unit: "kits", required: 30 },
  { id: "water-kalutara", name: "Clean water bowsers", district: "Kalutara", category: "water", unit: "bowsers", required: 4 },
  { id: "blankets-badulla", name: "Emergency blankets", district: "Badulla", category: "blankets", unit: "blankets", required: 80 },
  { id: "formula-gampaha", name: "Baby formula", district: "Gampaha", category: "formula", unit: "tins", required: 24 },
];
const meals = [
  { id: "breakfast", name: "Breakfast parcels", window: "06:00–09:00", required: 140 },
  { id: "lunch", name: "Lunch parcels", window: "11:00–14:00", required: 200 },
  { id: "dinner", name: "Dinner parcels", window: "17:00–20:00", required: 180 },
];
const colomboDate = new Intl.DateTimeFormat("en-CA", {
  year: "numeric", month: "2-digit", day: "2-digit", timeZone: "Asia/Colombo",
});

export function createReliefRepository() {
  const requests = new Map(seedRequests.map((request) => [request.id, request]));
  const pledges = [];
  const submissions = new Map();

  function seedMeals(date) {
    for (const { id: meal, name, required, window } of meals) {
      const id = `${date}-${meal}-gampaha`;
      if (!requests.has(id)) {
        requests.set(id, { id, name, date, meal, window, required, district: "Gampaha", category: "food", unit: "packs" });
      }
    }
  }

  function totals(request, includeAllocations = false) {
    const allocations = pledges.filter(({ requestId }) => requestId === request.id);
    const pledged = allocations.reduce((sum, { quantity }) => sum + quantity, 0);
    const remaining = request.required - pledged;
    let status = "REQUESTED";
    if (pledged > 0 && remaining > 0) status = "PARTIALLY_PLEDGED";
    if (remaining === 0) {
      status = "FULLY_PLEDGED";
      if (allocations.every((pledge) => pledge.status === "DELIVERED")) status = "DELIVERED";
      else if (allocations.some((pledge) => pledge.status !== "PLEDGED")) status = "IN_TRANSIT";
    }
    return {
      ...request, pledged, remaining, status,
      ...(includeAllocations && { allocations: allocations.map(({ id, quantity, status }) => ({ id, quantity, status })) }),
    };
  }

  return {
    list(includeAllocations = false) {
      const date = colomboDate.format();
      seedMeals(date);
      return [...requests.values()]
        .filter((request) => !request.date || request.date === date ||
          (includeAllocations && pledges.some((pledge) => pledge.requestId === request.id && pledge.status !== "DELIVERED")))
        .sort((a, b) => (a.date ?? "").localeCompare(b.date ?? "") ||
          (a.window ?? "").localeCompare(b.window ?? ""))
        .map((request) => totals(request, includeAllocations));
    },
    history(phone) {
      return pledges.filter((pledge) => pledge.phone === phone).reverse().map((pledge) => {
        const { id, requestId, quantity, status, createdAt } = pledge;
        const { name, district, unit } = requests.get(requestId);
        return { id, quantity, status, createdAt, name, district, unit };
      });
    },
    publishLunch(shelter, required) {
      if (!required) throw new HttpError(409, "Enter shelter occupancy before requesting meals.");
      const date = colomboDate.format();
      seedMeals(date);
      const location = shelter.id === "gampaha-hall" ? "gampaha" : shelter.id;
      const id = `${date}-lunch-${location}`;
      const existing = requests.get(id);
      if (existing && totals(existing).pledged > 0 && existing.required !== required) {
        throw new HttpError(409, "This lunch request already has pledges. Keep its agreed quantity.");
      }
      const request = {
        id, name: "Lunch parcels", district: shelter.district, destination: shelter.name,
        meal: "lunch", window: "11:00–14:00", date, category: "food", unit: "packs", required,
      };
      requests.set(id, request);
      return totals(request);
    },
    advance({ pledgeId, status }) {
      const pledge = pledges.find(({ id }) => id === pledgeId);
      if (!pledge) throw new HttpError(404, "Pledge not found.");
      const request = requests.get(pledge.requestId);
      if (status === pledge.status) return totals(request, true);
      const next = { PLEDGED: "IN_TRANSIT", IN_TRANSIT: "DELIVERED" }[pledge.status];
      if (!next || status !== next || totals(request).remaining !== 0) {
        throw new HttpError(409, "Fully pledge the request, then record transit before delivery.");
      }
      pledge.status = status;
      return totals(request, true);
    },
    pledge(phone, { requestId, quantity, submissionId }) {
      if (typeof submissionId !== "string" || !/^[\da-f-]{36}$/i.test(submissionId)) {
        throw new HttpError(400, "A valid pledge submission reference is required.");
      }
      const key = `${phone}:${submissionId}`;
      const previous = submissions.get(key);
      if (previous) {
        if (previous.requestId !== requestId || previous.quantity !== quantity) {
          throw new HttpError(409, "This submission reference belongs to another pledge.");
        }
        return totals(requests.get(requestId));
      }
      const request = requests.get(requestId);
      if (!request) throw new HttpError(404, "Relief request not found.");
      if (request.date && request.date !== colomboDate.format()) {
        throw new HttpError(409, "This meal request has closed.");
      }
      if (!Number.isSafeInteger(quantity) || quantity < 1) {
        throw new HttpError(400, "Enter a whole quantity greater than zero.");
      }
      if (quantity > totals(request).remaining) {
        throw new HttpError(409, "That quantity exceeds the current remaining balance.");
      }
      // Validate and write in the same synchronous operation on the demo process.
      const pledge = { id: randomUUID(), requestId, phone, quantity, status: "PLEDGED", createdAt: new Date().toISOString() };
      pledges.push(pledge);
      submissions.set(key, pledge);
      return totals(request);
    },
  };
}
