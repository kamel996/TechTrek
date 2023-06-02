FROM node:20

WORKDIR /app

# Copy package.json and install dependencies
COPY package.json .
RUN npm install

# Copy the rest of the files
COPY ./backend .

# Set environment variables
ENV NODE_ENV=development
ENV PORT=5000
ENV MONGODB_URI=mongodb+srv://kamel:12345@cluster0.pvwr1nk.mongodb.net/shop
ENV JWT_SECRET=abc123
ENV PAYPAL_CLIENT_ID=AfFfT6R3Ca08-n2PwjAVplEDFITwusstA-gOMR4UFcwGRsVR_5A0tgJmy_vNZNLoMcQJdiHMqCD8kfq8
ENV GOOGLE_CLIENT_ID=749901222143-81vg8cdunnhee4jap7g2uanudfr31b0b.apps.googleusercontent.com

EXPOSE 5000

CMD ["node", "./server.js"]
