import { Moisture } from "../resources/database/schemas/moisture";
import { Sensor } from "../resources/database/schemas/sensor";

type Input = {
  sensorId: string;
  moistureLevel: number;
};

export async function handleRegisterMoisture(data: Input): Promise<void> {
  try {
    const { moistureLevel, sensorId } = data;
    console.log(`handleRegisterMoisture :: sensorId: ${sensorId}, moistureLevel: ${moistureLevel}`);
    const sensor = await Sensor.findById(sensorId).catch(console.error);

    const parsedMoistureLevel = 1.0966 * Math.exp((-10.02 * moistureLevel) / 4095);

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
