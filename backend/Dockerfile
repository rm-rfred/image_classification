FROM python:3.10

ENV DEBIAN_FRONTEND noninteractive
ENV PYTHONPATH .

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE 1 

RUN python3.10 -m pip install --no-cache-dir --upgrade pip==23.2.1

COPY ./requirements.txt /requirements.txt

ENV API_ENV DEV

RUN python3.10 -m pip install --no-cache-dir -r /requirements.txt

COPY ./entrypoint.sh /entrypoint.sh

RUN chmod 755 /entrypoint.sh

CMD [ "/entrypoint.sh" ]