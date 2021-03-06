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
COPY . .
RUN echo "copied local 'source' dir successfully over to /couchgag/server"

# cleaning up the transpiled js lib if one already exists
RUN echo "cleaning..."
RUN yarn clean:build 
RUN echo "cleaning complete!"

# building a fresh distribution of our js lib from our ts src code
RUN echo "building a fresh dist..."
RUN yarn build
RUN echo "building complete!"

# setting environment variables
# this is largely for verbosity, as we also set command line env variables in package.json#scripts
ENV PORT 2023
EXPOSE 2023

# starting our application with this command, for more info see package.json#scripts
CMD ["yarn", "start"]