FROM python:3.5

RUN apt-get update
RUN apt-get -qq update
RUN apt-get install -y nodejs npm
RUN update-alternatives --install /usr/bin/node node /usr/bin/nodejs 10

RUN pip install pipenv

ADD . /var/www
WORKDIR /var/www

ADD Pipfile /src/Pipfile
RUN pipenv lock --requirements --no-hashes > /tmp/requirements.txt
RUN pip install -r /tmp/requirements.txt
RUN npm install
