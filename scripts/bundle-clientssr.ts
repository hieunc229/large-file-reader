require("ignore-styles").default(['.css', '.scss']);
const path = require("path");
const fse = require("fs-extra");

import {
  resolveImports,
  importPathsToClientRoutes,
} from "../src/packages/rumbo/src/utils/route";

import bundleClientSSR from "../src/packages/rumbo/src/clientSSR/bundler";
import generateClientSSRApp from "../src/packages/rumbo/src/clientSSR/generator";
import configs from "../src/rumboConfigs";
import { rumboTempName } from "../src/packages/rumbo/src/configs";
import { formatClassName } from "../src/packages/rumbo/src/utils/text";

function __bundleSSRClient({ route, item, publicPath, distDir, rootDir }) {
  const { location, excludePaths = [] } = item;

  const entries = resolveImports({
    route,
    location,
    type: "client",
    excludePaths,
  }).map((item) => {
    return {
      ...item,
      staticImport: require(item.filePath),
    };
  });

  const routes = importPathsToClientRoutes({ paths: entries });

  const componentPath = path.join(
    rootDir,
    rumboTempName,
    `clientEntry${formatClassName(route)}.tsx`
  );

  generateClientSSRApp({
    componentPath,
    publicPath,
    route,
    debug: true
  });

  return bundleClientSSR({
    entries,
    publicPath,
    routes,
    route,
    distDir,
    debug: true,
    rootDir,
    webpackConfigs: {
      mode: "production",
    },
  });
}

async function buildClient() {
  const { routes } = configs;
  const rootDir = path.join(__dirname, "..");
  const publicPath = path.join(__dirname, "../public");
  const distDir = path.join(rootDir, "dist");

  if (distDir !== publicPath) {
    fse.copySync(publicPath, distDir);
  }

  for (const [route, item] of Object.entries(routes)) {
    // @ts-ignore
    switch (item.type) {
      case "client-ssr":
        await __bundleSSRClient({ route, item, publicPath, distDir, rootDir });
        break;
    }
  }
}

buildClient();
