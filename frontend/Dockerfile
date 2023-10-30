FROM node:21

ENV GENERATE_SOURCEMAP=false \
    WDS_SOCKET_PORT=10133

WORKDIR /app

COPY entrypoint.sh /entrypoint.sh
ENTRYPOINT [ "/entrypoint.sh" ]