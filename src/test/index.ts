import { User } from './User'
import { UserEdit } from './UserEdit'

const user = User.buildUser({ username: 'bob', age: 40 })

const root = document.getElementById('root')
if (!root) throw new Error('root not found')

const editor = new UserEdit(root, user)
editor.render()
