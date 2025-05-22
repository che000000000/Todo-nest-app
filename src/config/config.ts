export default () => ({
  app: {
    port: process.env.APP_PORT,
    host: process.env.APP_HOST
  },
  db: {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    username: process.env.POSTGRES_USER_NAME,
    dbname: process.env.POSTGRES_DB_NAME,
    password: process.env.POSTGRES_PASSWORD
  }
})