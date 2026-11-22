# FastAPI AI/NLP service entry point
from fastapi import FastAPI
from app.routers.forecast import router as forecast_router

app = FastAPI(title='FloodBlast AI Service')
app.include_router(forecast_router)

