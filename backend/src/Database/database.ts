import mongoose, { ConnectOptions } from "mongoose";
import { DATABASE_CONNECTION } from "@/root/constants";

export async function connectToDatabase() {
  await mongoose
    .connect(`${process.env.DATABASE_URL}${process.env.DATABASE_NAME}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions)
    .then(() => {
      console.log(DATABASE_CONNECTION);
    })
    .catch(error => {
      console.log(error);
    });
}
