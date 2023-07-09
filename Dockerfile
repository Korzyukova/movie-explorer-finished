# Specify a base image
FROM node:18.16.0-alpine

# Set the working directory
WORKDIR /app

# copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# copy the rest of application code to the working directory
COPY . .

# install React dependencies
RUN npm run install-client

# build React
RUN npm run build-client

# install server dependencies
RUN npm run install-server

# start the server
CMD ["npm", "start"]

# set the PORT environment variable
ENV PORT $PORT