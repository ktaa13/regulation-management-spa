# Step 1: Build the React app
FROM node:16 as build

WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# Copy the rest of the app and build it
COPY . ./
RUN npm run build

# Step 2: Serve the app with Nginx
FROM nginx:alpine

# Copy the build files from the previous step to the Nginx server's html directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 for the frontend
EXPOSE 80

# Start Nginx when the container runs
CMD ["nginx", "-g", "daemon off;"]
