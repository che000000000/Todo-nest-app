export default () => ({
  app: {
    port: process.env.APP_PORT,
    host: process.env.APP_HOST
  },
  db: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    dbname: process.env.DB_NAME,
    password: process.env.DB_PASSWORD
  }
})