import { HttpError } from "./http.mjs";

const seeds = [
  { id: "gampaha-hall", name: "Community reception hall", district: "Gampaha", point: [80.01, 7.09], verified: true },
  { id: "kalutara-school", name: "School relief center", district: "Kalutara", point: [79.99, 6.59], verified: true },
  { id: "badulla-hall", name: "Hillside community reception hall", district: "Badulla", point: [81.06, 6.99], verified: true },
];

export function createShelterRepository() {
  const shelters = new Map(seeds.map((shelter) => [shelter.id, { ...shelter }]));

  function find(id) {
    const shelter = shelters.get(id);
    if (!shelter?.verified) throw new HttpError(404, "Verified shelter not found.");
    return shelter;
  }

  return {
    list: () => [...shelters.values()].filter(({ verified }) => verified),
    find,
  };
}
