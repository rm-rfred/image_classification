import pickle

import cv2
import grpc
from fastapi import APIRouter, File
from simber import Logger

from api.config import (
    image_classification_pb2,
    image_classification_pb2_grpc
)

router = APIRouter()

LOG_FORMAT = "{levelname} [{filename}:{lineno}]:"

LOG_LEVEL: str = "INFO"
logger = Logger(__name__, log_path="/tmp/logs/server.log", level=LOG_LEVEL)
logger.update_format(LOG_FORMAT)


class GrpcClient:
    @staticmethod
    def get_image_classification_from_grpc(endpoint: str, image, timeout: int = 60) -> str:
        return GrpcClient.image_classification(
            endpoint=endpoint, image=image, timeout=timeout
        )
    
    @staticmethod
    def image_classification(
        endpoint: str, image, timeout: int=60
    ):
        """Apply image classification
        
        Arguments:
            endpoint (str): Server endpoint
            image: The image to apply classification
            timeout (int): Maximum seconds to process an image
  
        Returns:
            str:
                Image classification
        """
        channel = grpc.insecure_channel(
            endpoint,
            options=[
                ('grpc.max_send_message_length', -1),
                ('grpc.max_receive_message_length', -1),
                ('grpc.so_reuseport', 1),
                ('grpc.use_local_subchannel_pool', 1),
            ]
        )
        stub = image_classification_pb2_grpc.ImageClassificationServiceStub(channel)

        response = stub.ApplyImageClassification(
            image_classification_pb2.ImageClassificationRequest(
                image=image,
            )
        )
        return response.predicted_class

@router.get("/", status_code=200)
def hello_world():
    return {
        "message": "Hello World"
    }

@router.post("/classify", status_code=200)
async def post_image(endpoint: str = "image-classification-worker:13000", file: bytes = File(...), timeout: int = 60):
    with open('image.png','wb') as image:
        image.write(file)
        image.close()

    image = cv2.imread(f"image.png")
    return GrpcClient.get_image_classification_from_grpc(endpoint, pickle.dumps(image), timeout=timeout)