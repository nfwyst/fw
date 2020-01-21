import { AxiosPromise, AxiosResponse } from "axios";

interface hasId {
  id?: number
}

interface Event {
  on(eventName: string, callback: () => void): void;
  trigger(eventName: string): void;
}

interface Properties<T> {
  get<K extends keyof T>(key: K): T[K];
  set(value: T): void;
  getAll(): T;
}

interface Api<T> {
  fetch(id: number): AxiosPromise;
  save(data: T): AxiosPromise;
}

export class Model<T extends hasId> {
  constructor(
    private properties: Properties<T>,
    private events: Event,
    private api: Api<T>
  ) { }

  on = this.events.on

  trigger = this.events.trigger

  get = this.properties.get

  getAll = this.properties.getAll

  set(value: T): void {
    this.properties.set(value)
    this.events.trigger('change')
  }

  fetch = (): void => {
    const id = this.get('id')
    if (typeof id !== 'number') throw new Error('missing id')
    this.api.fetch(id)
      .then((response: AxiosResponse): void => {
        this.set(response.data)
      })
      .catch(e => {
        this.trigger('error')
      })
  }

  save = (): void => {
    this.api.save(this.getAll())
      .then((response: AxiosResponse): void => {
        this.trigger('save')
      })
      .catch(e => {
        this.trigger('error')
      })
  }
}
