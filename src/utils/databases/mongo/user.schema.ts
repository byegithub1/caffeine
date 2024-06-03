import client from './db.ts'

import { Collection, Database, ObjectId } from '@mongo'

// Defining schema interface
interface UserSchema {
	_id: ObjectId
	username: string
	password: string
}

const db: Database = client.database('<db_name>')
const UserDB: Collection<UserSchema> = db.collection<UserSchema>('users')

export default UserDB
