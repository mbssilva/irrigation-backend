import { Express } from "express";
import { welcome } from "./controllers/system.controller";
import { moistureController } from "./controllers/moisture.controller";
import { sensorController } from "./controllers/sensor.controller";
import { settingController } from "./controllers/setting.controller";

export function routeControllers(app: Express): void {
  app.route("/").get(welcome);

  app.route("/moisture").post(moistureController.save);
  app.route("/moisture").get(moistureController.index);

  app.route("/sensor/orders").get(sensorController.index);
  app.route("/sensor/:id").get(sensorController.show);
  app.route("/sensor").post(sensorController.save);

  app.route("/settings").post(settingController.save);
  app.route("/settings").get(sensorController.show);
}
