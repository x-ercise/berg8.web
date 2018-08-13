
#FROM node:7
#WORKDIR /src
#COPY package.js /src
#RUN npm install
#CMD node index.js
#EXPOSE 80

FROM nginx
COPY build /usr/share/nginx/html
EXPOSE 80