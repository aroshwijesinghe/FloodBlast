"""Database-free planning baseline for a 24-hour flood scenario."""

from math import ceil


def estimate_demand(
    flood_depth_m: float,
    population_per_km2: float,
    area_km2: float,
    rain_mm: float,
    meals_per_person: float,
    litres_per_person: float,
) -> dict:
    population = ceil(population_per_km2 * area_km2)
    # Illustrative coefficients to calibrate against historical demand later.
    exposed_fraction = min(1.0, flood_depth_m * 0.25 + rain_mm / 1000)
    people = min(population, ceil(round(population * exposed_fraction, 8)))
    return {
        "people": people,
        "meal_packs": ceil(people * meals_per_person),
        "clean_water_litres": ceil(people * litres_per_person),
        "exposed_fraction": exposed_fraction,
        "horizon_hours": 24,
    }
