import { model } from "mongoose";
import { moistureSchema } from "../schemas/moisture";

export const Moisture = model("Moisture", moistureSchema);
