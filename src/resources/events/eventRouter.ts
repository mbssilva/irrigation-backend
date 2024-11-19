import { eventEmitter } from "./eventEmitter";
import { EventEmitterConfigType } from "../../types";
import { handleRegisterMoisture } from "../../services/handleRegisterMoisture";

type H = () => Promise<void>;

const eventEmitterConfig: EventEmitterConfigType[] = [
  {
    eventName: "HANDLE_REGISTER_MOISTURE",
    handlers: [handleRegisterMoisture as H],
  },
];

export const eventRouter = {
  start: (): void => {
    eventEmitter.start(eventEmitterConfig);
    console.info("EventEmitter - Subscritores registrados.");
  },
  stop: (): void => {
    eventEmitter.stop();
    console.info("EventEmitter parando.");
  },
};
