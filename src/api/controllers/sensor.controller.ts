import { Request, Response } from "express";
import { Sensor } from "../../resources/database/schemas/sensor";

class SensorController {
  async save(req: Request, res: Response) {
    try {
      const { id, description, latitude, longitude } = req.body;

      const newSensor = new Sensor({
        _id: String(id),
        description,
        location: {
          coordinates: [Number(latitude), Number(longitude)]
        }
      });

      await newSensor.save();
      return res.status(201).send(newSensor);
    } catch (error) {
      console.error(error);
      return res.status(400).send({ message: error.message });
    }
  }
}

export const sensorController = new SensorController();
