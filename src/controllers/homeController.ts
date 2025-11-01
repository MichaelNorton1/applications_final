import { Request, Response } from "express";

export const getHome = (req: Request, res: Response): void => {
  res.json({ message: "Welcome to the TypeScript Express API" });
};
