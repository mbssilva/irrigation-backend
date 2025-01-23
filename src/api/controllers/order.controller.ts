import { Request, Response } from "express";
import { Sensor } from "../../resources/database/schemas/sensor";
import { Moisture } from "../../resources/database/schemas/moisture";
import { Setting } from "../../resources/database/schemas/setting";

class OrderController {
  async index(req: Request, res: Response) {
    try {
      const allSensor = await Sensor.find({}, '_id');
      const settings = await Setting.findOne();
  
      if (!settings || !settings.actionMode) {
        return res.status(204).send("");  
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
        const lowerHour = new Date(settings.lowerHour);
        const upperHour = new Date(settings.upperHour);
  
        if (currentTime > lowerHour && currentTime < upperHour) {
          allSensor.forEach(sensor => orders.push(sensor.id));
        }
      }
  
      res.status(200).send([...new Set(orders)].toString()); // Remove duplicações
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: error.message });
    }
  }  
}

export const orderController = new OrderController();
