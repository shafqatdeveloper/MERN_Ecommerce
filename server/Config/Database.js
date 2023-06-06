import mongoose from "mongoose";

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("Connected");
  } catch (error) {
    console.log(`Error while connecting to Database ${error}`);
  }
};

export default connectToDatabase;
