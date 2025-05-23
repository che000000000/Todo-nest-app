export default () => ({
  app: {
    port: process.env.APP_PORT,
    host: process.env.APP_HOST,
    allowedOrigin: process.env.ALLOWED_OROGIN
  },
  db: {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    username: process.env.POSTGRES_USER_NAME,
    dbname: process.env.POSTGRES_DB_NAME,
    password: process.env.POSTGRES_PASSWORD
  },
  redis: {
    user: process.env.REDIS_USER || "default",
    password: process.env.REDIS_PASSWORD || "root",
    host: process.env.REDIS_HOST || "localhost",
    port: process.env.REDIS_PORT || 6379,
    get uri() {
      return `redis://${this.user}:${this.password}@${this.host}:${this.port}`;
    }
  },
  session: {
    cookiesSecret: process.env.COOKIES_SECRET,
    sessionSecret: process.env.SESSION_SECRET,
    name: process.env.SESSION_NAME,
    domain: process.env.SESSION_DOMAIN,
    httpOnly: process.env.SESSION_HTTP_ONLY,
    secure: process.env.SESSION_SECURE,
    sameSite: process.env.SESSION_SAME_SITE,
    folder: process.env.SESSION_FOLDER
  }
})