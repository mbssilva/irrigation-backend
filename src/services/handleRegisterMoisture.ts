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

    if (!sensor) {
      console.error(`SensorId ${sensorId} não encontrado.`);
      return;
    }

    const newMoisture = new Moisture({
      sensorId,
      value: Number(moistureLevel),
    });

    await newMoisture.save();
  } catch (error) {
    console.error(`handleRegisterMoisture`, error);
  }
}
