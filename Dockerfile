FROM node:16.16.0-alpine

# creating our destination directory
RUN echo "creating working directory..."
RUN mkdir -p /couchgag/server
RUN echo "finished creating directory!"

# setting our working directory for our remaining commands
WORKDIR /couchgag/server

# setting up our application in the docker environment
# we want to use package.json as a manifest to create clean deps in the docker env
RUN echo "copying package.json..."
COPY package.json .
RUN echo "copying of `package.json` complete!"

# installing clean deps with yarn (built into node:16.16.0)
RUN echo "installing packages..."
RUN yarn install 
RUN echo "package install complete!"

# copying over all of our project files to 
RUN echo "porting over project..."
COPY ./mdb/ ./mdb/
COPY ./src/ ./src/
COPY ./README.md .
COPY ./tsconfig.json .
COPY ./.env .
RUN echo "copied local 'source' dir successfully over to /couchgag/server"

# building a fresh distribution of our js lib from our ts src code
RUN echo "building a fresh dist..."
RUN yarn build
RUN echo "building complete!"

# clean source code
RUN echo "cleaning dev bloat..."
RUN rm -rf node_modules/ 
RUN rm -rf yarn.lock
RUN yarn install --production
RUN rm -rf src/
RUN rm tsconfig.json
RUN echo "cleaned dev bloat!"

# starting our application with this command, for more info see package.json#scripts
CMD ["yarn", "start"]