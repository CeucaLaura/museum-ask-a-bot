import express from "express";
import next from "next";

import ENV from "../app/constants/env";

import apiRouter from "./routers/apiRouter";
import NextRouter from "./routers/nextRouter";

const expressApp = express();

const nextApp = (next as any)({
  dev: ENV.NODE_ENV === "development",
  dir: "./app",
});

const nextHandle = NextRouter.getRequestHandler(nextApp);

expressApp.use("/api", apiRouter);
expressApp.get("*", (req, res): void => nextHandle(req, res));

(async (): Promise<void> => {
  await nextApp.prepare();
  await expressApp.listen(ENV.PORT);
  // eslint-disable-next-line no-console
  console.log(`> Serving on http://localhost:${ENV.PORT}`);
})();
