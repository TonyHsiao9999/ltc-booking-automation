FROM mcr.microsoft.com/playwright:v1.43.1-jammy

# Set working directory
WORKDIR /app

# Copy files
COPY . .

# 安裝 npm 套件（但不再另外安裝瀏覽器，因為 image 已附帶）
RUN npm install

# 預設執行腳本
CMD ["node", "playwright-script.js"]
