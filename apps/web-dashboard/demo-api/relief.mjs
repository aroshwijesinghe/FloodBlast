import { randomUUID } from "node:crypto";
import { HttpError } from "./http.mjs";

const seedRequests = [
  { id: "lunch-gampaha", name: "Lunch parcels", district: "Gampaha", category: "food", unit: "packs", required: 200 },
  { id: "medical-badulla", name: "First-aid kits", district: "Badulla", category: "medical", unit: "kits", required: 30 },
];

export function createReliefRepository() {
  const requests = new Map(seedRequests.map((request) => [request.id, request]));
  const pledges = [];

  function totals(request) {
    const pledged = pledges
      .filter(({ requestId }) => requestId === request.id)
      .reduce((sum, { quantity }) => sum + quantity, 0);
    return { ...request, pledged, remaining: request.required - pledged };
  }

  return {
    list: () => [...requests.values()].map(totals),
    history(phone) {
      return pledges.filter((pledge) => pledge.phone === phone).reverse().map((pledge) => {
        const { id, requestId, quantity, status, createdAt } = pledge;
        const { name, district, unit } = requests.get(requestId);
        return { id, quantity, status, createdAt, name, district, unit };
      });
    },
    pledge(phone, { requestId, quantity }) {
      const request = requests.get(requestId);
      if (!request) throw new HttpError(404, "Relief request not found.");
      if (!Number.isSafeInteger(quantity) || quantity < 1) {
        throw new HttpError(400, "Enter a whole quantity greater than zero.");
      }
      if (quantity > totals(request).remaining) {
        throw new HttpError(409, "That quantity exceeds the current remaining balance.");
      }
      const pledge = { id: randomUUID(), requestId, phone, quantity, status: "PLEDGED", createdAt: new Date().toISOString() };
      pledges.push(pledge);
      return totals(request);
    },
  };
}
