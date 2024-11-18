import { Schema, Document, model } from "mongoose";

interface IMoisture extends Document {
  sensorId: string;
  value: number;
  timestamp: Date;
}

const MoistureSchema = new Schema<IMoisture>(
  {
    sensorId: {
      type: String,
      ref: "Sensor",
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
  },
  {
    timestamps: true,
  }
);

MoistureSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    delete ret._id;
  },
});

export const Moisture = model("Moisture", MoistureSchema);
