import { connect } from "mongoose";

const connectMongoDB = async () => {
  try {
    await connect(process.env.MONGODB_URI);

    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};

export default connectMongoDB;