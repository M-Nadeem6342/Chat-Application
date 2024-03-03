import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_DB_URI);
    console.log(
      `Connected to MongoDB Database Successfully ${conn.connection.host}`
    );
  } catch (err) {
    console.log(`Error connecting to MongoDB ${err}`);
  }
};

export default connectDB;
