import express from "express";
import dotenv from "dotenv"
import mongoose from "mongoose";
import cors from "cors";


import bookRoute from "./routes/book.route.js";
import userRoute from "./routes/user.route.js";

const app = express();

app.use(cors());
app.use(express.json());

dotenv.config();

const PORT = process.env.PORT || 4000;

const URI = process.env.MongoDBURI;

// connect to mongodb 

try {
    mongoose.connect(URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true

    });
    console.log("connected to mongodb!!");
} catch (error) {
    console.log("Error:", error);
    
}

// connecting router
app.use("/book",bookRoute);
app.use("/user",userRoute);

// deployment

app.listen(PORT, () => {
console.log(`server is listening on port ${PORT}`)
})