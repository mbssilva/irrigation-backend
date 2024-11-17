import { Express } from "express";
import { welcome } from "./controllers/system";

export function routeControllers(app: Express): void {
  app.route("/").get(welcome);
}
