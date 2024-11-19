import { EventDataTypes, EventEmitterCallbackType, EventEmitterConfigType } from "../../types";

type Args<T extends keyof EventDataTypes> = T extends void ? [eventName: T] : [eventName: T, payload: EventDataTypes[T]];

class EventEmitter {
  private events: Map<keyof EventDataTypes, EventEmitterCallbackType<keyof EventDataTypes>[]>;

  constructor() {
    this.events = new Map();
  }

  public start(eventRegistrations: EventEmitterConfigType[]): void {
    eventRegistrations.forEach(({ eventName, handlers }) => {
      this.register(eventName);
      if (handlers) handlers.forEach((handler) => this.subscribe(eventName, handler));
    });
  }

  public stop(): void {
    this.events.clear();
  }

  public register(eventName: keyof EventDataTypes): void {
    if (!this.events.has(eventName)) {
      this.events.set(eventName, []);
    }
  }

  public subscribe<T extends keyof EventDataTypes>(eventName: T, callback: EventEmitterCallbackType<T>): void {
    const subscribers = this.events.get(eventName);
    if (subscribers) {
      subscribers.push(callback as () => Promise<void>);
    }
  }

  public publish<T extends keyof EventDataTypes>(...args: Args<T>): void {
    const [eventName, payload] = args;
    console.info(`EventEmitter.publish :: Event: ${eventName} :: Payload: ${JSON.stringify(payload)}`);

    const subscribers = this.events.get(eventName);
    if (subscribers) {
      subscribers.forEach((callback) => callback(payload));
    }
  }
}

export const eventEmitter = new EventEmitter();
