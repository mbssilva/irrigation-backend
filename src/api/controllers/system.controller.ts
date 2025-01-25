import * as pjson from "../../../package.json";
import { Request, Response } from "express";

export async function welcome(_: Request, res: Response): Promise<void> {
  const { name, version, author, license, description, keywords } = pjson;

  res.send({
    app: name,
    version,
    author,
    license,
    description,
    keywords 
  });
}
