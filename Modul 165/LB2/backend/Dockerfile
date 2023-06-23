# Use the official Node.js image as the base
FROM node:14

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port that the server listens on
EXPOSE 3000

# Start the server
CMD [ "node", "server.js" ]
