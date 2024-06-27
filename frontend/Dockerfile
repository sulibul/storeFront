FROM node:20.10.0

WORKDIR /app/frontend/

COPY package*.json /app/frontend/

RUN npm i -g vite

RUN npm install --include=dev

COPY . /app/frontend/

CMD ["npm", "run", "dev"]

