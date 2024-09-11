import "dotenv/config";

export default {
  expo: {
    name: "E-learningApp",
    slug: "your-app-slug",
    // ... other expo config options
    extra: {
      JWT_SECRET:
        process.env.JWT_SECRET_KEY || "fallback_secret_for_development",
    },
    scheme: "http",
  },
};
