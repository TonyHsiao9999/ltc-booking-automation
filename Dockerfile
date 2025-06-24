FROM node:20

# Install dependencies
RUN apt-get update && apt-get install -y wget gnupg libxshmfence-dev     && npm i -g npm && npm install -g playwright     && playwright install --with-deps chromium

# Set working directory
WORKDIR /app

# Copy files
COPY . .

# Run script
CMD ["node", "playwright-script.js"]