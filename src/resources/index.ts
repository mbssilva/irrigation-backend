import { mongo } from "./database/configuration/mongo";
import { eventRouter } from "./events/eventRouter";

class Resources {
  async start(): Promise<void> {
    console.info("Inicializando recursos.");

    await mongo.start();
    eventRouter.start();
  }

  async stop(server: any): Promise<void> {
    console.info("Desligando recursos.");

    await mongo.stop();

    console.info("Recursos desligados.");
    process.exit();
  }
}

export const resources = new Resources();
