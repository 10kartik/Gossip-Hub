# Fetch the node image from docker hub
FROM node:20-buster

# Set the working directory
WORKDIR /app/

# Copy the package.json file from /backend directory to the working directory
COPY package.json /app/

# Install the dependencies
RUN npm install

# Copy the rest of the files from /backend directory to the working directory
COPY . /app/

# Copy the .env file from /backend directory to the working directory
COPY .env /app/

# Expose the port 7007
EXPOSE 7007

# Start the server
CMD ["npm", "run", "dev"]


