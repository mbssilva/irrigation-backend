import { Moisture } from "../resources/database/schemas/moisture";
import { Sensor } from "../resources/database/schemas/sensor";
import { moistureLevelRegression } from "../utils";

type Input = {
  sensorId: string;
  moistureLevel: number;
};



export async function handleRegisterMoisture(data: Input): Promise<void> {
  try {
    const { moistureLevel, sensorId } = data;
    console.log(`handleRegisterMoisture :: sensorId: ${sensorId}, moistureLevel: ${moistureLevel}`);
    const sensor = await Sensor.findById(sensorId).catch(console.error);

    const parsedMoistureLevel = moistureLevelRegression(Number(moistureLevel));

    if (!sensor) {
      console.error(`SensorId ${sensorId} não encontrado.`);
      return;
    }

    const newMoisture = new Moisture({
      sensorId,
      value: Number(parsedMoistureLevel),
    });

    await newMoisture.save();
  } catch (error) {
    console.error(`handleRegisterMoisture`, error);
  }
}
