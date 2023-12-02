# Use Node 16 alpine as parent image
FROM node:16-alpine

# Change the working directory on the Docker image to /app
WORKDIR /usr/src/criador-app-client

# Copy package.json and package-lock.json to the /criador-app-client directory
COPY public/ /usr/src/criador-app-client/public
COPY src/ /usr/src/criador-app-client/src
COPY package.json /usr/src/criador-app-client/

# Install dependencies
RUN npm install

# Expose application port
EXPOSE 3000

# Start the application
CMD npm start