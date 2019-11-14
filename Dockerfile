FROM node:8.4.0

RUN apt-get update

# Official AWS documentation recommends using python3 and associated tooling. That doesn't work, or at least it does not work as as advertised.
RUN apt-get install python-dev python-pip -y

# The aws cli has a dependency issue and this resolves it
RUN easy_install --upgrade six

RUN pip install awscli

WORKDIR /usr/src/app
COPY package.json yarn.lock /usr/src/app/

RUN yarn

COPY . /usr/src/app

CMD ["yarn", "dev"]