# Use Node 16 alpine as parent image
FROM node:16-alpine

# Change the working directory on the Docker image to /app
WORKDIR /usr/src/criador-app-server

# Copy package.json and package-lock.json to the /criador-app-server directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install
RUN npm uninstall bcrypt
RUN npm install bcrypt

# Copy the rest of project files into this image
COPY . .

# Expose application port
EXPOSE 8000

# Start the application
CMD npm start