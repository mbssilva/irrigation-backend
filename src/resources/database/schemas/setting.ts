import { Schema, Document, model, Model } from "mongoose";

type ActionModesTypes = "hour" | "moisture";

interface ISetting extends Document {
  actionMode: ActionModesTypes[];
  lowerHour: string;
  upperHour: string;
  moistureThreshold: number;
}

interface ISettingModel extends Model<ISetting> {
  findOneAndCreateIfNotExists(): Promise<ISetting>;
}

const SettingSchema = new Schema<ISetting>(
  {
    actionMode: [
      {
        type: String,
        required: false,
      },
    ],
    lowerHour: {
      type: String,
      required: false,
    },
    upperHour: {
      type: String,
      required: false,
    },
    moistureThreshold: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

SettingSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    delete ret._id;
  },
});

SettingSchema.statics.findOneAndCreateIfNotExists = async function () {
  const settings = await this.findOne();
  if (settings) return settings;

  const newSettings = await this.create({
    actionMode: [],
    hour: undefined,
    moistureThreshold: undefined,
  });

  return newSettings;
};

export const Setting = model<ISetting, ISettingModel>("Setting", SettingSchema);
