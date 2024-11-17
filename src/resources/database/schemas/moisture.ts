import { Schema } from "mongoose";

interface IMoisture {
  sensorId: string;
  value: number;
  timestamp: Date;
}

export const moistureSchema = new Schema<IMoisture>({
  sensorId: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});
