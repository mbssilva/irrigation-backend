import { Schema, Document, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

interface ISensor extends Document {
  description: string;
  location: {
    type: string;
    coordinates: [number, number];
  };
}

const SensorSchema = new Schema<ISensor>(
  {
    _id: {
      type: String,
      default: uuidv4,
    },
    description: {
      type: String,
      required: false,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

SensorSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    delete ret._id;
  },
});

export const Sensor = model("Sensor", SensorSchema);
