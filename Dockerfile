FROM node:18

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
ENV TZ="Australia/Sydney"

COPY package*.json ./

RUN npm install

RUN npm install webpack

COPY . .

RUN npm run build

EXPOSE 3000
CMD [ "npm", "start" ]