// import { User } from './User'
// import { UserEdit } from './UserEdit'

// const user = User.buildUser({ username: 'bob', age: 40 })

// const root = document.getElementById('root')
// if (!root) throw new Error('root not found')

// const editor = new UserEdit(root, user)
// editor.render()

import { UserList } from './UserList'
import { Collection } from '../models/Collection'
import { User, UserProps } from '../test/User'

const users = new Collection('http://localhost:3000/users', (json: UserProps) => {
  return User.buildUser(json)
})

users.on('change', () => {
  const root = document.getElementById('root')
  if (root) {
    new UserList(root, users).render()
  }
})

users.fetch()
