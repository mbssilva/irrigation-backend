export type EventDataTypes = {
  HANDLE_REGISTER_MOISTURE: { sensorId: string, value: number };
};

export type EventEmitterCallbackType<T extends keyof EventDataTypes> = (data?: EventDataTypes[T]) => Promise<void>;

export type EventEmitterConfigType = {
  eventName: keyof EventDataTypes;
  handlers?: EventEmitterCallbackType<keyof EventDataTypes>[];
};
