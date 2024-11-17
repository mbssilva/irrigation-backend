import { mongo } from "./database/configuration/mongo";

class Resources {
  async start(): Promise<void> {
    console.info("Inicializando recursos.");

    await mongo.start();
  }

  async stop(server: any): Promise<void> {
    console.info("Desligando recursos.");

    await mongo.stop();

    console.info("Recursos desligados.");
    process.exit();
  }
}

export const resources = new Resources();
