FROM ubuntu:20.04

WORKDIR /app

ENV DEBIAN_FRONTEND noninteractive
ENV PYTHONPATH .

RUN apt-get update && apt-get install -y software-properties-common
RUN add-apt-repository 'ppa:deadsnakes/ppa' 
RUN apt update && apt install -y wget python3.10 python3.10-dev

RUN wget https://bootstrap.pypa.io/get-pip.py
RUN python3.10 get-pip.py

# Clean up the downloaded script
RUN rm get-pip.py

# OpenCV requirements
RUN python3.10 -m pip install --upgrade pip==23.3.1
RUN apt update && apt install -y libsm6 libxext6 libxrender-dev libgl1-mesa-glx


ENV PYTHONDONTWRITEBYTECODE 1 

COPY ./requirements.txt /requirements.txt

ENV API_ENV DEV

RUN python3.10 -m pip install -r /requirements.txt

COPY ./entrypoint.sh /entrypoint.sh

RUN chmod 755 /entrypoint.sh

CMD [ "/entrypoint.sh" ]