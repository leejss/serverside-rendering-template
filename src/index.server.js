import React from "react";
import ReactDOMServer from "react-dom/server";
import express from "express";
import { StaticRouter } from "react-router-dom";
import App from "./App";
import path from "path";
import fs from "fs";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootReducer from "./modules";
import PreloadContext from "./lib/PreloadContext";

const manifest = JSON.parse(
  fs.readFileSync(path.resolve("./build/asset-manifest.json"), "utf-8")
);

const chunks = Object.keys(manifest.files)
  .filter((key) => /chunk\.js$/.exec(key))
  .map((key) => `<script src="${manifest.files[key]}"></script>`)
  .join();

function createPage(root, stateScript) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
        name="description"
        content="Web site created using create-react-app"
        />
        <link href="${manifest.files["main.css"]}" rel="stylesheet" />
        <title>React App</title>
    </head>
    <body>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <div id="root">${root}</div>
        ${stateScript}
        <script src="${manifest.files["runtime-main.js"]}"></script>
        ${chunks}
        <script src="${manifest.files["main.js"]}"></script>
    </body>
    </html>
    `;
}

const app = express();

const serverRender = async (req, res, next) => {
  const context = {};
  const store = createStore(rootReducer, applyMiddleware(thunk));

  const preloadContext = {
    done: false,
    promises: [],
  };
  const jsx = (
    <PreloadContext.Provider value={preloadContext}>
      <Provider store={store}>
        <StaticRouter location={req.url} context={context}>
          <App />
        </StaticRouter>
      </Provider>
    </PreloadContext.Provider>
  );

  ReactDOMServer.renderToStaticMarkup(jsx);
  try {
    await Promise.all(preloadContext.promises);
  } catch (err) {
    return res.status(500);
  }

  preloadContext.done = true;

  const root = ReactDOMServer.renderToString(jsx);

  // state script 주입
  // store를 string으로 변환
  const stateString = JSON.stringify(store.getState()).replace(/</g, "\\u003c");
  // script 생성
  const stateScript = `<script>__PRELOADED_STATE__=${stateString}</script>`;

  res.send(createPage(root, stateScript));
};

const serve = express.static(path.resolve("./build"), {
  index: false,
});
app.use(serve);
app.use(serverRender);

app.listen(5000, () => {
  console.log(`Running on http://localhost:5000`);
});
