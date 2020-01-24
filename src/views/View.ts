import { Model } from '../models/Model'

export abstract class View<T extends Model<K>, K> {
  protected regions: { [key: string]: Element } = {}

  constructor(private parent: Element, protected model: T) {
    this.model.on('change', this.render)
  }

  abstract template: () => string

  eventsMap = (): { [key: string]: () => void } => {
    return {}
  }

  regionsMap = (): { [key: string]: string } => {
    return {}
  }

  bindEvents = (fragment: DocumentFragment): void => {
    const eventsMap = this.eventsMap()
    for (let key in eventsMap) {
      const [eventKey, selector] = key.split(':')
      fragment.querySelectorAll(selector).forEach((item: Element) => {
        item.addEventListener(eventKey, eventsMap[key])
      })
    }
  }

  mapRegions = (fragement: DocumentFragment): void => {
    const regionsMap = this.regionsMap()
    for (let key in regionsMap) {
      const selector = regionsMap[key]
      const ele = fragement.querySelector(selector)
      if (ele) this.regions[key] = ele
    }
  }

  onRender = (): void => { }

  render = (): void => {
    this.parent.innerHTML = ''
    const templateElement = document.createElement('template')
    templateElement.innerHTML = this.template()
    this.bindEvents(templateElement.content)
    this.mapRegions(templateElement.content)
    this.onRender()
    this.parent.append(templateElement.content)
  }
}
