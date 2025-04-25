import express from 'express'
import cors from "cors"
import cookieParser from 'cookie-parser'
import dotenv from "dotenv";

const app = express()
dotenv.config()

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization',  "Cookie"]
}))

// common middleware
app.use(express.json({limit: "50mb"}))  // Increase from current 16kb
app.use(express.urlencoded({extended: true, limit: "50mb"}))
app.use(express.raw({ 
    type: 'video/mp4', 
    limit: '100mb' 
  }));
app.use(express.static("public"))
app.use(cookieParser())

import healthcheckRouter from "./routes/healthcheck.route.js"
import userRouter from "./routes/user.routes.js"
// import cartRouter  from "./routes/cart.route.js"
// import productRouter from "./routes/product.route.js"
// import razorpayrouter from './routes/razorpay.route.js'
import { errorHandler } from './middlewares/error.middlewares.js'
import characterRouter from "./routes/character.routes.js"
import storyRouter from "./routes/story.routes.js"


app.use("/api/v1/healthcheck", healthcheckRouter)
app.use("/api/v1/users", userRouter)
app.use("/api/v1/character", characterRouter)
app.use("/api/v1/stories", storyRouter)

app.use(errorHandler)

export { app }