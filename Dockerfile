FROM python:3.5

RUN apt-get update
RUN apt-get -qq update
RUN curl -sL https://deb.nodesource.com/setup_7.x | bash -
RUN apt-get install -y nodejs

RUN pip install pipenv

ADD . /var/www
WORKDIR /var/www

RUN chmod +x /var/www/scripts/entrypoint.sh
ADD Pipfile /src/Pipfile
RUN pipenv lock --requirements --no-hashes > /tmp/requirements.txt
RUN pip install -r /tmp/requirements.txt

ADD package.json /var/www
RUN npm install -g gulp
RUN npm install

CMD ["./scripts/entrypoint.sh"]
