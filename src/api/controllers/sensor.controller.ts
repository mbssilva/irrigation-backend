import { Request, Response } from "express";
import { Sensor } from "../../resources/database/schemas/sensor";
import { Moisture } from "../../resources/database/schemas/moisture";
import { Setting } from "../../resources/database/schemas/setting";

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

  async show(req: Request, res: Response) {
    try {
      console.log(req.params.id);
      const recentMoistures = await Sensor.findById(req.params.id);

      res.status(200).send(recentMoistures);
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: error.message });
    }
  }

  async index(req: Request, res: Response) {
    try {
      const allSensor = await Sensor.find({}, '_id');
      const settings = await Setting.findOne();
  
      if (!settings || !settings.actionMode) {
        return res.status(500).send("");
      }
  
      const orders: string[] = [];
  
      if (settings.actionMode.includes('moisture')) {
        for (let sensor of allSensor) {
          const lastMoisture = (await Moisture.aggregate([
            { $match: { sensorId: sensor.id } },
            { $sort: { timestamp: -1 } },
            { $limit: 1 },
          ]))[0];
  
          if (!lastMoisture) continue;
          if (lastMoisture.value < settings?.moistureThreshold) orders.push(sensor.id);
        }
      }
  
      if (settings.actionMode.includes('hour')) {
        const currentTime = new Date();
        const targetTime = new Date(settings.hour);
  
        if (currentTime < targetTime) {
          allSensor.forEach(sensor => orders.push(sensor.id));
        }
      }
  
      res.status(200).send([...new Set(orders)].toString());
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: error.message });
    }
  }  
}

export const sensorController = new SensorController();
