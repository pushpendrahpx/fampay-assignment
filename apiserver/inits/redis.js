const { createClient } = require("redis");
const retry_strategy = require("./retry");

// const r = async () => {
//   await client.connect();

//   await client.set("key", "value");
//   const value = await client.get("key");
//   console.log(value);
//   await client.disconnect();
// };

// r();

class RedisConnection {
  constructor() {}
  async connect() {
    try {
      this.redisClient = await createClient({
        socket: {
          host: "redis",
          port: "6379",
        },
        retry_strategy: retry_strategy,
      });
      await this.redisClient.connect();

      console.log("REDIS CONNECTED");
    } catch (error) {
      console.log(error);
    }
  }
}
var redisConnection = new RedisConnection();
redisConnection.connect();
module.exports = {
  redisConnection,
};
