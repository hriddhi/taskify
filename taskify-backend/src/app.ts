import express from "express"
import dotenv from "dotenv"
import morgan from "morgan"
import mongoose from "mongoose"
import cors from "cors"

import taskRouter from "./routes/taskRoutes"
import authRouter from "./routes/auth"

import authMiddleware from "./middleware/authMiddleware"

const envFile = `.env.${process.env.NODE_ENV || "development"}`
dotenv.config({ path: envFile })

const app = express()

app.use(morgan('short'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/auth", authRouter)

app.use(authMiddleware)

app.use("/api/tasks", taskRouter)

mongoose.connect(process.env.MONGO_URI!)
  .then(() => {
    app.listen(process.env.PORT || 8000, () => console.log("Server running..."));
  })
  .catch(err => console.error(err));

app.listen(8000, () => console.log("Server listening on port 8000"))
