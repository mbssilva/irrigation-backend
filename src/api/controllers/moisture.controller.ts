import { Request, Response } from "express";
import { subHours } from "date-fns";
import { Moisture } from "../../resources/database/schemas/moisture";
import { eventEmitter } from "../../resources/events/eventEmitter";

class MoistureController {
  async save(req: Request, res: Response) {
    try {
      eventEmitter.publish("HANDLE_REGISTER_MOISTURE", req.body);
      res.status(201).send();
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: error.message });
    }
  }

  async index(req: Request, res: Response) {
    try {
      const { sensorId, hours } = req.query;
      const initialTS = subHours(new Date(), Number(hours)); 

      const recentMoistures = await Moisture.find({
        sensorId,
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
