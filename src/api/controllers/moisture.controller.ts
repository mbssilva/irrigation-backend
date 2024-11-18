import { Request, Response } from "express";
import { Moisture } from "../../resources/database/schemas/moisture";

class MoistureController {
  async save(req: Request, res: Response) {
    try {
      const { moistureLevel } = req.body;

      const newMoisture = new Moisture({
        sensorId: "1",
        value: Number(moistureLevel),
      });

      newMoisture.save().catch(console.error);
      return res.status(201).send();
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: error.message });
    }
  }

  async index(req: Request, res: Response) {
    try {
      const { hours } = req.query;

      const initialTS = new Date();
      initialTS.setHours(initialTS.getHours() - Number(hours));

      const recentMoistures = await Moisture.find({
        timestamp: { $gte: initialTS },
      });

      res.status(200).send(recentMoistures);
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: error.message });
    }
  }
}

export const moistureController = new MoistureController();
