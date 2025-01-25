import { Request, Express, NextFunction } from "express";
import { welcome } from "./controllers/system.controller";
import { moistureController } from "./controllers/moisture.controller";
import { sensorController } from "./controllers/sensor.controller";
import { settingController } from "./controllers/setting.controller";
import { orderController } from "./controllers/order.controller";
import { verifyBearerToken } from "./middleware/authorization";

export function routeControllers(app: Express): void {
  app.route("/").get(welcome);

  app.use(verifyBearerToken);

  app.route("/moisture").post(moistureController.save);
  app.route("/moisture").get(moistureController.index);

  app.route("/sensor").post(sensorController.save);
  app.route("/sensor").get(sensorController.index);

  app.route("/orders").get(orderController.index);

  app.route("/settings").put(settingController.save);
  app.route("/settings").get(settingController.show);
}
