FROM node:10.15.3 
RUN mkdir /app
WORKDIR /app
COPY package.json .
COPY ./yarn.lock .
RUN yarn  
CMD [ "npm", "start" ]