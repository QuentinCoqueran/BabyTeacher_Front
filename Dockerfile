FROM node:14.0.0

COPY package.json .

ARG HOST=0.0.0.0
ARG CONFIGURATION=production

RUN npm install
COPY . .
CMD ng serve --host $HOST --configuration=$CONFIGURATION

EXPOSE 3001
