import mongoose from "mongoose";

export default async function dbConnect() {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}/testapp`);

    console.log("database connected successfully");
  } catch (error) {
    console.error("database not connected : " + error);
    process.exit(1);
  }
}
