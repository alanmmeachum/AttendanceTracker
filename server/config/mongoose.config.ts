import { ConnectOptions, connect } from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const MONGODB_URI: string = process.env.MONGODB_URI || "";

async function dbConnect(): Promise<void> {
  if (!MONGODB_URI) {
    console.error("MongoDB URI is not defined in the environment variables.");
    return;
  }
  try {
    await connect(MONGODB_URI, {
      dbName: "Attendance",
    } as ConnectOptions);
    console.log(
      "Pinged your deployment. You have successfully connected to MongoDB!"
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default dbConnect;
