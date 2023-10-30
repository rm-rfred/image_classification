# Generated by the gRPC Python protocol compiler plugin. DO NOT EDIT!
"""Client and server classes corresponding to protobuf-defined services."""
import os
import sys

import grpc

sys.path.append(os.path.dirname(__file__))

import image_classification_pb2 as image__classification__pb2


class ImageClassificationServiceStub(object):
    """Missing associated documentation comment in .proto file."""

    def __init__(self, channel):
        """Constructor.

        Args:
            channel: A grpc.Channel.
        """
        self.ApplyImageClassification = channel.unary_unary(
                '/image_classification.ImageClassificationService/ApplyImageClassification',
                request_serializer=image__classification__pb2.ImageClassificationRequest.SerializeToString,
                response_deserializer=image__classification__pb2.ImageClassificationReply.FromString,
                )


class ImageClassificationServiceServicer(object):
    """Missing associated documentation comment in .proto file."""

    def ApplyImageClassification(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')


def add_ImageClassificationServiceServicer_to_server(servicer, server):
    rpc_method_handlers = {
            'ApplyImageClassification': grpc.unary_unary_rpc_method_handler(
                    servicer.ApplyImageClassification,
                    request_deserializer=image__classification__pb2.ImageClassificationRequest.FromString,
                    response_serializer=image__classification__pb2.ImageClassificationReply.SerializeToString,
            ),
    }
    generic_handler = grpc.method_handlers_generic_handler(
            'image_classification.ImageClassificationService', rpc_method_handlers)
    server.add_generic_rpc_handlers((generic_handler,))


 # This class is part of an EXPERIMENTAL API.
class ImageClassificationService(object):
    """Missing associated documentation comment in .proto file."""

    @staticmethod
    def ApplyImageClassification(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/image_classification.ImageClassificationService/ApplyImageClassification',
            image__classification__pb2.ImageClassificationRequest.SerializeToString,
            image__classification__pb2.ImageClassificationReply.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)
