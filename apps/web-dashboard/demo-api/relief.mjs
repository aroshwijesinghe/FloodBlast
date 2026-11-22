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

  function totals(request) {
    const pledged = pledges
      .filter(({ requestId }) => requestId === request.id)
      .reduce((sum, { quantity }) => sum + quantity, 0);
    return { ...request, pledged, remaining: request.required - pledged };
  }

  return {
    list() {
      const date = colomboDate.format();
      seedMeals(date);
      return [...requests.values()].filter((request) => !request.date || request.date === date).map(totals);
    },
    history(phone) {
      return pledges.filter((pledge) => pledge.phone === phone).reverse().map((pledge) => {
        const { id, requestId, quantity, status, createdAt } = pledge;
        const { name, district, unit } = requests.get(requestId);
        return { id, quantity, status, createdAt, name, district, unit };
      });
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
