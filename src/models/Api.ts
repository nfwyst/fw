import axios, { AxiosPromise } from 'axios'

interface hasId {
  id?: number
}

export class Api<T extends hasId> {
  constructor(private rootUrl: string) { }

  fetch = (id: number): AxiosPromise => axios.get(`${this.rootUrl}/${id}`)

  save = (data: T): AxiosPromise => {
    const { id } = data
    if (id) {
      return axios.put(`${this.rootUrl}/${id}`, data)
    } else {
      return axios.post(this.rootUrl, data)
    }
  }
}
