import { HttpError } from "./http.mjs";

const seeds = [
  { id: "gampaha-hall", name: "Community reception hall", district: "Gampaha", point: [80.01, 7.09], verified: true, capacity: 300, occupancy: 200 },
  { id: "kalutara-school", name: "School relief center", district: "Kalutara", point: [79.99, 6.59], verified: true, capacity: 50, occupancy: 50 },
  { id: "badulla-hall", name: "Hillside community reception hall", district: "Badulla", point: [81.06, 6.99], verified: true, capacity: 40, occupancy: 18 },
];
const facilityKeys = ["water", "generator", "sanitation", "kitchen", "medical", "accessibility"];
const allowedReadiness = new Set(["READY", "UNAVAILABLE", "UNKNOWN"]);
const groups = ["children", "olderAdults", "pregnant", "injured"];

function seedFacilities(id) {
  const values = facilityKeys.map((key) => [key, key === "water" || key === "sanitation" ? "READY" : "UNKNOWN"]);
  if (id === "gampaha-hall") values[3][1] = "READY";
  if (id === "kalutara-school") values[5][1] = "READY";
  return Object.fromEntries(values);
}

export function createShelterRepository() {
  const shelters = new Map(seeds.map((shelter) => [shelter.id, {
    ...shelter, facilities: seedFacilities(shelter.id), auditedAt: null,
  }]));
  const audits = new Map();
  const demographics = new Map();

  function find(id) {
    const shelter = shelters.get(id);
    if (!shelter?.verified) throw new HttpError(404, "Verified shelter not found.");
    return shelter;
  }

  function needs(id) {
    const { occupancy } = find(id);
    const counts = demographics.get(id) || Object.fromEntries(groups.map((key) => [key, 0]));
    return {
      counts,
      mealPacksPerWindow: occupancy,
      mealPacksPerDay: occupancy * 3,
      supportKits: Math.ceil(occupancy / 50) + Math.ceil(Math.max(...Object.values(counts)) / 10),
    };
  }

  return {
    list: () => [...shelters.values()].filter(({ verified }) => verified),
    find,
    needs,
    updateDemographics({ id, counts }) {
      const shelter = find(id);
      if (!counts || !groups.every((key) => Number.isSafeInteger(counts[key]) && counts[key] >= 0 && counts[key] <= shelter.occupancy)) {
        throw new HttpError(400, "Each group count must be a whole number between zero and shelter occupancy.");
      }
      demographics.set(id, Object.fromEntries(groups.map((key) => [key, counts[key]])));
      return needs(id);
    },
    updateOccupancy({ id, capacity, occupancy }) {
      const shelter = find(id);
      if (!Number.isSafeInteger(capacity) || capacity < 1 || capacity > 100_000 ||
          !Number.isSafeInteger(occupancy) || occupancy < 0 || occupancy > 100_000) {
        throw new HttpError(400, "Enter a positive capacity and a non-negative occupant count, up to 100,000.");
      }
      const counts = demographics.get(id);
      if (counts && Math.max(...Object.values(counts)) > occupancy) {
        throw new HttpError(409, "Update group counts before lowering occupancy below those counts.");
      }
      Object.assign(shelter, { capacity, occupancy, occupancyAt: new Date().toISOString() });
      return shelter;
    },
    audit({ id, facilities }) {
      const shelter = find(id);
      if (!facilities || !facilityKeys.every((key) => allowedReadiness.has(facilities[key]))) {
        throw new HttpError(400, "Select a readiness status for every facility.");
      }
      shelter.facilities = Object.fromEntries(facilityKeys.map((key) => [key, facilities[key]]));
      shelter.auditedAt = new Date().toISOString();
      const event = { at: shelter.auditedAt, auditor: "Demo operator", facilities: shelter.facilities };
      audits.set(id, [event, ...(audits.get(id) || [])].slice(0, 25));
      return shelter;
    },
    audits: (id) => audits.get(find(id).id) || [],
  };
}
