import express from 'express'
import cors from "cors"
import cookieParser from 'cookie-parser'
import dotenv from "dotenv";
import rateLimit from 'express-rate-limit';

const app = express()
dotenv.config()

// Global rate limiter
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 100 requests per windowMs
  standardHeaders: true, // Return rate limit info in RateLimit-* headers
  legacyHeaders: false, // Disable X-RateLimit-* headers
  message: 'Too many requests, please try again later.'
});

// Specific rate limiters for different routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit login attempts
  message: 'Too many login attempts, please try again later.'
});

const storyGenerationLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // Limit story generations
  message: 'You have reached the maximum number of story generations. Please try again later.'
});

// app.use(globalLimiter);

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

// Apply specific rate limiters
// app.use("/api/v1/users/login", authLimiter);
// app.use("/api/v1/stories/generate-prompt", storyGenerationLimiter);


app.use("/api/v1/healthcheck", healthcheckRouter)
app.use("/api/v1/users", userRouter)
app.use("/api/v1/character", characterRouter)
app.use("/api/v1/stories", storyRouter)

app.use(errorHandler)

export { app }