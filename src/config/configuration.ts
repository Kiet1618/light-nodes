import * as dotenv from "dotenv";
dotenv.config();

export default () => ({
  host: "127.0.0.1",
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    mongo_url: process.env.MONGO_URL,
  },
  redis_url: process.env.REDIS_URL,
  grpc_port:  parseInt(process.env.GRPC_PORT, 10) || 3000,
});
