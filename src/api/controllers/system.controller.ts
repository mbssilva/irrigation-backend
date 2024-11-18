import * as pjson from "../../../package.json";
import { Request, Response } from "express";

export async function welcome(_: Request, res: Response): Promise<void> {
  res.send({
    app: pjson.name,
    version: pjson.version,
  });
}
