import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    const res = await mongoose.connect(process.env.MONGODB_URI);
    console.log("DB :: MongoDB Connected -->", res.connection.host);
  } catch (error) {
    console.error(
      "DB :: Error :: While Connecting to MongoDB -->",
      error.message
    );
    process.exit(1);
  }
};

export default dbConnection;
