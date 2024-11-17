import express from "express";
import { routeControllers } from "../api/routes";
import envs from "../common/envs";
import { resources } from "../resources";

let shuttingDown = false;
let stopped = true;
const timeout = 1e4;

const app = express();
app.use(express.json());

routeControllers(app);
resources.start();

console.info(`Application starting up.`);
console.info(`Timezone: ${process.env.TZ}`);

export const server = app.listen(envs.appPort, () => {
  stopped = false;
  console.info(`Aplicação rodando na porta ${envs.appPort}`);
});

process.on("SIGTERM", async () => {
  console.info("SIGTERM - desligando o serviço...");
  setTimeout(stopWithError, timeout);
  if (!shuttingDown) {
    await stopGracefully();
  }
});

process.on("SIGINT", async () => {
  console.info("SIGINT - desligando o serviço...");
  setTimeout(stopWithError, timeout);
  if (!shuttingDown) {
    await stopGracefully();
  }
});

async function stopGracefully() {
  shuttingDown = true;
  await resources.stop(server);
  stopped = true;
  process.exit(0);
}

function stopWithError() {
  if (!stopped) {
    console.error(`Timeout de desligamento do serviço após ${timeout/1000} segundos.`);
    console.warn("Desligando forçadamente...");
    process.exit(1);
  }
}
