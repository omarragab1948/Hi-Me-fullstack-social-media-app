/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
    ],
  },
  env: {
    MongoDB:
      "mongodb+srv://omar83980:Jerusalem1948@cluster0.8hyvsap.mongodb.net/Hi-Me?retryWrites=true&w=majority",
    API_KEY: "AIzaSyArtvvsCxzSRJGWQPbobrbP1KzefhvQ-Ag",
    AUTH_DOMAIN: "hi-me-c2277.firebaseapp.com",
    PROJECT_ID: "hi-me-c2277",
    STORAGE_BUCKET: "hi-me-c2277.appspot.com",
    MESSAGING_SENDER_ID: "366445846125",
    APP_ID: "1:366445846125:web:fd0bb23816f65c7404e964",
    MEASUREMENT_ID: "G-Z803RGMJ34",
  },
};

module.exports = nextConfig;
