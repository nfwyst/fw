import axios, { AxiosResponse } from 'axios'
import { Event } from './Event'

export class Collection<T, K> {
  models: T[] = [];
  events: Event = new Event();

  constructor(
    private rootUrl: string,
    private deserialize: (json: K) => T
  ) { }

  get on() {
    return this.events.on
  }

  get trigger() {
    return this.events.trigger
  }

  fetch = (): void => {
    axios.get(this.rootUrl).then((response: AxiosResponse): void => {
      const data = response.data as K[]
      this.models = []
      data.forEach((user: K): void => {
        this.models.push(this.deserialize(user))
      })
      this.trigger('change')
    })
  }
}
