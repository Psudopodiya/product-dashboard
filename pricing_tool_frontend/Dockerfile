FROM node:20-slim

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

# Expose port
EXPOSE 5173

# Start the application
CMD ["npm", "run", "dev", "--", "--host"] 

# # Ony run for productions:
# CMD ["npm", "run", "preview", "--", "--host"]