import mongoose from "mongoose";

let isConnected = false;

export const connect = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("Already connected");
    return;
  }
  await mongoose.connect(process.env.MONGODB_URI , {
    dbName: "share_prompt",
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  isConnected = true;
  console.log("Database connected!");
};

export const disconnect = async () => {
  try {
    await mongoose.disconnect();
    isConnected = false;
    console.log("Database disconnected!");
  } catch (error) {
    console.log(error);
  } finally {
    await mongoose.disconnect();
    isConnected = false;
  }
};

export default connect;
// export {disconnect};
