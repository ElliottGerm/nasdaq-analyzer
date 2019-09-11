FROM node as node

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Stage 2
FROM twalter/openshift-nginx:stable

COPY --from=node /usr/src/app/dist/ml-classifier-app /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf