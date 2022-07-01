import bodyParser from "body-parser";
import express from "express";
import chalk from "chalk";
import jwt from "express-jwt";
import jwksRsa from "jwks-rsa";

import Knowledge from "../modules/knowledge";

const apiRouter = express.Router();
const knowledgeService = new Knowledge();
const PATH = "/knowledge";

const checkJwt = jwt({
  algorithms: ["RS256"],
  issuer: [`https://${process.env.AUTH0_DOMAIN}/`],

  secret: jwksRsa.expressJwtSecret({
    cache: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
    rateLimit: true,
  }),
});

const logger = (message: unknown): void => {
  const time = new Date().toLocaleString();
  // eslint-disable-next-line no-console
  console.log(`${chalk.yellow(`[${time}]`)}: ${chalk.magenta(message)}`);
};

apiRouter.use((...params): void => {
  logger(`API Router hit - ${new Date()}`);
  params[2]();
});

apiRouter.use(bodyParser({ limit: "50mb" }));

apiRouter.get(
  `${PATH}/all`,
  checkJwt,
  async (_, res): Promise<void> => {
    await knowledgeService.init();
    res.header("Content-Type", "application/json");

    const result = await knowledgeService.findMany();
    knowledgeService.close();

    res.send(result);
  }
);

apiRouter.get(
  `${PATH}/:name`,
  async (req, res): Promise<{}> => {
    res.header("Content-Type", "application/json");
    const { name } = req.params;

    logger(`Get knowledge hit for name - ${name}`);

    if (!name) {
      res.status(400);
      res.send(null);
      return {};
    }

    await knowledgeService.init();
    const result = await knowledgeService.findByName(name);
    await knowledgeService.close();

    if (!result) {
      res.sendStatus(404);
      return {};
    }

    res.send(result);
    return {};
  }
);

apiRouter.post(
  `${PATH}/:name/pushData`,
  checkJwt,
  async (req, res): Promise<void> => {
    res.header("Content-Type", "application/json");
    const { name } = req.params;
    const data = req.body;

    logger(`Push data to knowledge with name - ${name}`);
    await knowledgeService.init();

    try {
      await knowledgeService.pushData(data, name);
      res.sendStatus(201);
    } catch (err) {
      res.sendStatus(500);
    }
    knowledgeService.close();
  }
);

apiRouter.post(
  `${PATH}/:name/updateData/:id`,
  checkJwt,
  async (req, res): Promise<void> => {
    res.header("Content-Type", "application/json");
    const { id, name } = req.params;
    const data = req.body;

    logger(`Update knowledge data: name - ${name}, id - ${id}`);
    await knowledgeService.init();

    try {
      await knowledgeService.updateData(id, data, name);
      res.sendStatus(200);
    } catch (err) {
      res.sendStatus(500);
    }

    knowledgeService.close();
  }
);

apiRouter.post(
  `${PATH}/:name/removeData/:id`,
  checkJwt,
  async (req, res): Promise<void> => {
    res.header("Content-Type", "application/json");
    const { id, name } = req.params;

    logger(`Remove knowledge data: name - ${name}, id - ${id}`);
    await knowledgeService.init();

    try {
      await knowledgeService.removeData(id, name);
      res.sendStatus(200);
    } catch (err) {
      res.sendStatus(500);
    }

    knowledgeService.close();
  }
);

export default apiRouter;
