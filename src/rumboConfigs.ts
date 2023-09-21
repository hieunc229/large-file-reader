import path from "path";

const rumboConfigs: RumboProps = {
  debug: process.env.NODE_ENV === "development",
  rootDir: __dirname,
  listen: {
    port: parseInt(process.env.PORT || "3000"),
    host: process.env.HOST || "0.0.0.0"
  },
  routes: {
    "/": {
      type: "client-ssr",
      excludePaths: ["components"],
      location: path.join(__dirname, "apps/client"),
    },
    "/api": {
      type: "server",
      excludePaths: ["_utils"],
      location: path.join(__dirname, "apps/api"),
    },
  },
  staticRoutes: null
};

export default rumboConfigs;
