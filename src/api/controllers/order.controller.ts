import { Request, Response } from "express";
import { isBefore, subHours, setHours, setMinutes } from 'date-fns';

import { Sensor } from "../../resources/database/schemas/sensor";
import { Moisture } from "../../resources/database/schemas/moisture";
import { Setting } from "../../resources/database/schemas/setting";
import { moistureLevelRegression } from "../../utils";

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

          const twoHoursAgo = subHours(new Date(), 2);
          if (isBefore(lastMoisture.timestamp, twoHoursAgo)) continue; // Verifica se o timestamp de lastMoisture é mais antigo que 2 horas
          if (lastMoisture.value < settings?.moistureThreshold) orders.push(sensor.id);
        }
      }
  
      if (settings.actionMode.includes('hour')) {
        const currentTime = new Date();
        const lowerTime = parseTime(settings.lowerHour);
        const upperTime = parseTime(settings.upperHour);
  
        if (currentTime > lowerTime && currentTime < upperTime) {
          allSensor.forEach(sensor => !orders.includes(sensor.id) && orders.push(sensor.id));
        }
      }
  
      res.status(200).send(orders.toString());
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: error.message });
    }
  }  
}

const parseTime = (timeString: string): Date => {
  const [hours, minutes] = timeString.split(':');
  return setMinutes(setHours(new Date(), parseInt(hours)), parseInt(minutes));
};

export const orderController = new OrderController();
