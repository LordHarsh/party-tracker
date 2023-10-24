import express from 'express';
import Loaders from './loaders';
import config from './config';
import LoggerInstance from './loaders/logger';

async function startServer() {
  const app = express();
  await Loaders({ expressApp: app });
  app
    .listen(config.port, () => {
      LoggerInstance.info(`
      <===== Server listening on port: ${config.port} =====>
    `);
    })
    .on('error', (err: Error) => {
      console.log(err);
      process.exit(1);
    });
}

startServer();