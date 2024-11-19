import { Request, Response } from "express";
import { Sensor } from "../../resources/database/schemas/sensor";

class SensorController {
  async save(req: Request, res: Response) {
    try {
      const { description, latitude, longitude } = req.body;

      const newSensor = new Sensor({
        description,
        latitude: Number(latitude),
        longitude: Number(longitude),
      });

      await newSensor.save();
      return res.status(201).send();
    } catch (error) {
      console.error(error);
      return res.status(400).send({ message: error.message });
    }
  }

  async show(req: Request, res: Response) {
    try {
      const recentMoistures = await Sensor.findById(req.params.id);

      res.status(200).send(recentMoistures);
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: error.message });
    }
  }
}

export const sensorController = new SensorController();
