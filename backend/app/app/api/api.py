from fastapi import APIRouter

from app.api.endpoints import image_classification

api_router = APIRouter()
api_router.include_router(image_classification.router, prefix="/image_classification", tags=["image_classification"])
