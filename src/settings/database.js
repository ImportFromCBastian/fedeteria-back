import mysql from 'mysql2/promise'
import config from './settings.js'

const { user, host, password, database, port } = config.DB_OPTIONS

const connection = await mysql.createConnection({
  host: host,
  user: user,
  password: password,
  database: database,
  port: port,
})

export default connection
