import { Express } from "express";
import { welcome } from "./controllers/system.controller";
import { moistureController } from "./controllers/moisture.controller";
import { sensorController } from "./controllers/sensor.controller";

export function routeControllers(app: Express): void {
  app.route("/").get(welcome);

  app.route("/moisture").post(moistureController.save);
  app.route("/moisture").get(moistureController.index);

  app.route("/sensor").post(sensorController.save);
  app.route("/sensor/:id").get(sensorController.show);
}
