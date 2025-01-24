import { Request, Response, NextFunction } from "express";
import { envs } from "../../common/envs";

export const verifyBearerToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ message: "Token não fornecido" });
    return;
  }

  const token = authHeader.split(" ")[1];
  if (token !== envs.securityToken) {
    res.status(401).json({ message: "Acesso negado. Token inválido." });
    return;
  }

  next();
};
