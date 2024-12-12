import { Request, Response } from "express";
import { Setting } from "../../resources/database/schemas/setting";

class SettingController {
  async save(req: Request, res: Response) {
    const { actionMode, hour, moistureThreshold } = req.body;

    try {
      const settings = await Setting.findOneAndCreateIfNotExists();

      settings.actionMode = actionMode;
      settings.hour = hour;
      settings.moistureThreshold = moistureThreshold;

      await settings.save();
      res.status(201).send(settings);
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: error.message });
    }
  }

  async show(req: Request, res: Response) {
    try {
      const setting = await Setting.findOne();
      res.status(200).send(setting);
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: error.message });
    }
  }
}

export const settingController = new SettingController();
