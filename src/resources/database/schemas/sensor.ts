import { Schema, Document, model } from "mongoose";

interface ISensor extends Document {
  id: string;
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
      required: true
    },
    description: {
      type: String,
      required: false,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
        required: false,
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
