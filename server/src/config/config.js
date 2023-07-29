const ENV = process.env
module.exports = {
  port: ENV.PORT || 80,
  mongoDbURL: ENV.MONGO_DB_URL
} 