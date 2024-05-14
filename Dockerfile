# Use an official node image as the base image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the React app
RUN npm run build

# Install a lightweight web server (e.g., serve)
RUN npm install -g serve

# Command to run the application
CMD ["serve", "-s", "dist", "-l", "5173"]

# Expose port 5173
EXPOSE 5173
