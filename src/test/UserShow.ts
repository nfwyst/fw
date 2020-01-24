import { View } from '../views/View'
import { User, UserProps } from './User'

export class UserShow extends View<User, UserProps> {
  template = (): string => {
    return `
      <div>
        <h1>用户信息</h1>
        <div>用户名: ${this.model.get('username')}</div>
        <div>用户年龄: ${this.model.get('age')}</div>
      </div>
    `
  }
}
