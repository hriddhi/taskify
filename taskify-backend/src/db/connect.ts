import mongoose from "mongoose"

mongoose.connect(process.env.MONGO_URI!)
    .then(() => {
        console.log("Successfully connected to MongoDB")
    })
    .catch(err => console.error(err));