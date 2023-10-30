import pickle
import tempfile

import cv2
from fastapi import APIRouter, File

from app.utils.grpc_client import GrpcClient

router = APIRouter()

@router.get("/", status_code=200)
def hello_world():
    return {
        "message": "Hello World"
    }

@router.post("/classify", status_code=200)
async def post_image(endpoint: str = "image-classification-worker:13000", file: bytes = File(...), timeout: int = 60) -> str:
    with tempfile.NamedTemporaryFile(suffix=".png", delete=True) as temp_file:
        temp_file.write(file)
        temp_file_path = temp_file.name

        image = cv2.imread(temp_file_path)

        response = GrpcClient.get_image_classification_from_grpc(endpoint, pickle.dumps(image), timeout=timeout)

    return response