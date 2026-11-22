import { HttpError } from "./http.mjs";

const seeds = [
  { id: "gampaha-hall", name: "Community reception hall", district: "Gampaha", point: [80.01, 7.09], verified: true },
  { id: "kalutara-school", name: "School relief center", district: "Kalutara", point: [79.99, 6.59], verified: true },
  { id: "badulla-hall", name: "Hillside community reception hall", district: "Badulla", point: [81.06, 6.99], verified: true },
];
const facilityKeys = ["water", "generator", "sanitation", "kitchen", "medical", "accessibility"];
const allowedReadiness = new Set(["READY", "UNAVAILABLE", "UNKNOWN"]);

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

  function find(id) {
    const shelter = shelters.get(id);
    if (!shelter?.verified) throw new HttpError(404, "Verified shelter not found.");
    return shelter;
  }

  return {
    list: () => [...shelters.values()].filter(({ verified }) => verified),
    find,
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
