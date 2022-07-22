FROM node:lts-alpine
RUN echo "creating working directory..."
RUN mkdir -p /couchgag/server
RUN echo "finished creating directory!"
WORKDIR /couchgag/server
RUN echo "copying package.json..."
COPY package.json .
RUN echo "copying of `package.json` complete!"
RUN echo "installing packages..."
RUN yarn install 
RUN echo "package install complete!"
RUN echo "porting over project..."
COPY . .
RUN echo "cleaning..."
RUN yarn clean:build 
RUN echo "cleaning complete!"
RUN echo "building a fresh dist..."
RUN yarn build
RUN echo "building complete!"
ENV PORT 2023
EXPOSE 2023
CMD ["yarn", "start"]