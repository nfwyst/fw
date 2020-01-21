import { User } from './User'

export class UserForm {
  constructor(private parent: Element, private model: User) {
    this.model.on('change', this.render)
  }

  template = (): string => {
    return `
      <div>
        <h1>用户表单</h1>
        <div>用户名: ${this.model.get('username')}</div>
        <div>年龄: ${this.model.get('age')}</div>
        <input />
        <button>点击</button>
        <button class="set-age">设置随机年龄</button>
      </div>
    `
  }

  onSetAgeClick = (): void => {
    this.model.set({ age: Math.round(Math.random() * 100) })
  }

  eventsMap = (): { [key: string]: () => void } => {
    return {
      'click:.set-age': this.onSetAgeClick
    }
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

  render = (): void => {
    this.parent.innerHTML = ''
    const templateElement = document.createElement('template')
    templateElement.innerHTML = this.template()
    this.bindEvents(templateElement.content)
    this.parent.append(templateElement.content)
  }
}
