import grpc

from app.config import (
    image_classification_pb2,
    image_classification_pb2_grpc
)

class GrpcClient:
    @staticmethod
    def get_image_classification_from_grpc(endpoint: str, image: bytes, timeout: int = 60) -> str:
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
            ), timeout=timeout
        )
        return response.predicted_class