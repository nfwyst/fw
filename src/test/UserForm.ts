import { View } from '../views/View'
import { User, UserProps } from './User'

export class UserForm extends View<User, UserProps> {
  template = (): string => {
    return `
      <div>
        <input placeholder="${this.model.get('username')}"/>
        <button>点击</button>
        <button class="set-age">设置随机年龄</button>
        <button class="save-model">保存用户</button>
      </div>
    `
  }

  onSetAgeClick = (): void => {
    this.model.set({ age: Math.round(Math.random() * 100) })
  }

  onSaveClick = (): void => {
    this.model.save()
  }

  eventsMap = (): { [key: string]: () => void } => {
    return {
      'click:.set-age': this.onSetAgeClick,
      'click:.save-model': this.onSaveClick
    }
  }
}
