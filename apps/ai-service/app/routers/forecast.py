from fastapi import APIRouter
from pydantic import BaseModel, Field

from app.forecasting.resource_forecast import estimate_demand

router = APIRouter()


class DistrictScenario(BaseModel):
    district: str = Field(min_length=1, max_length=80)
    flood_depth_m: float = Field(ge=0, le=10)
    population_per_km2: float = Field(gt=0, le=100_000)
    area_km2: float = Field(gt=0, le=10_000)
    rain_mm: float = Field(ge=0, le=2_000)
    meals_per_person: float = Field(gt=0, le=20)
    litres_per_person: float = Field(gt=0, le=100)


@router.post("/forecast/resources")
def forecast(scenario: DistrictScenario) -> dict:
    inputs = scenario.model_dump(exclude={"district"})
    return {"district": scenario.district, **estimate_demand(**inputs)}
