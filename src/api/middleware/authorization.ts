import { Request, Response, NextFunction } from "express";

export const verifyBearerToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ message: "Token não fornecido" });
    return;
  }

  const token = authHeader.split(" ")[1];
  if (token !== "XPTO") {
    res.status(403).json({ message: "Acesso negado. Token inválido." });
    return;
  }

  next();
};
