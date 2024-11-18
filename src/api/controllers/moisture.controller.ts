import { v4 as uuidv4 } from "uuid";
import { Request, Response } from "express";
import { Moisture } from "../../resources/database/schemas/moisture";
import { Sensor } from "../../resources/database/schemas/sensor";

class MoistureController {
  async save(req: Request, res: Response) {
    try {
      res.status(201).send();
      const { moistureLevel, sensorId } = req.body;

      const sensor = await Sensor.findById(sensorId).catch(console.error);

      if (!sensor) {
        console.error(`SensorId ${sensorId} não encontrado.`);
        return;
      }

      const newMoisture = new Moisture({
        sensorId,
        value: Number(moistureLevel),
      });

      newMoisture.save().catch(console.error);
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
