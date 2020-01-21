import { User } from './User'
import { UserForm } from './UserForm'

const user = User.buildUser({ username: 'bob', age: 40 })

const root = document.getElementById('root')
if (!root) throw new Error('root not found')

new UserForm(root, user).render()
