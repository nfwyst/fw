import { Model } from '../models/Model'
import { Properties } from '../models/Properties'
import { Event } from '../models/Event'
import { Api } from '../models/Api'
import { Collection } from '../models/Collection'

export interface UserProps {
  username?: string;
  age?: number;
  id?: number;
}

const rootUrl = 'http://localhost:3000/users'

export class User extends Model<UserProps> {
  static buildUser(props: UserProps): User {
    return new User(
      new Properties<UserProps>(props),
      new Event(),
      new Api<UserProps>(rootUrl)
    )
  }

  static buildUserCollection(): Collection<User, UserProps> {
    return new Collection<User, UserProps>(
      'http://localhost:3000/users',
      (json: UserProps) => User.buildUser(json)
    )
  }
}
