import mongoose from "mongoose";

export default async function connectDB(uri) {
       return mongoose.connect(uri, {
           useNewUrlParser: true,
           useUnifiedTopology: true
       })
   
}