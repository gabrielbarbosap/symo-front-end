FROM node:20-slim

# Create app directory
WORKDIR /app

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Copy package files
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy project files
COPY . .

# Expose port 4200 for development server
EXPOSE 4200

# Start development server with host binding
CMD ["ng", "serve", "--host", "0.0.0.0"]
