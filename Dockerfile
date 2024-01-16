FROM node:21
WORKDIR /src/app
COPY . /src/app                
RUN npm install
EXPOSE 3000
CMD node src/index.ts 
