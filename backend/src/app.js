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
// origin: "http://localhost:5173",
console.log(process.env.FRONTEND_URL)
// app.use(cors({
//     origin : process.env.FRONTEND_URL,
//     credentials: true,
//     methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Authorization',  "Cookie"]
// }))
app.use((req, res, next) => {
    console.log('Request details:', {
        method: req.method,
        url: req.originalUrl,
        origin: req.headers.origin,
        referer: req.headers.referer,
        contentType: req.headers['content-type'],
        userAgent: req.headers['user-agent'].substring(0, 50) // Truncate for readability
    });
    next();
});

app.use(cors({
    origin: function(origin, callback) {
        console.log('Evaluating CORS for origin:', origin);
        const allowedOrigins = [
            'https://story-book-generation-negv.vercel.app',
            'http://localhost:5173',
            'https://story-book-generation-negv-git-master-indranil-maitis-projects.vercel.app',
            'https://story-book-generation-negv-dmv9lmd40-indranil-maitis-projects.vercel.app'
        ];
        
        // Allow requests with no origin (like mobile apps, curl requests, or direct browser requests)
        if (!origin) {
            console.log('Request has no origin, allowing');
            callback(null, true);
        } else if (allowedOrigins.indexOf(origin) !== -1) {
            console.log('Origin is in allowed list, allowing:', origin);
            callback(null, true);
        } else {
            console.log('Origin blocked by CORS:', origin);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie', 'X-Requested-With']
}));

app.use((req, res, next) => {
    console.log('Incoming request from origin:', req.headers.origin);
    next();
});

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
import paymentRouter from "./routes/payment.routes.js"


// app.use("/api/v1/users/login", authLimiter);
// app.use("/api/v1/stories/generate-prompt", storyGenerationLimiter);


app.use("/api/v1/healthcheck", healthcheckRouter)
app.use("/api/v1/users", userRouter)
app.use("/api/v1/character", characterRouter)
app.use("/api/v1/stories", storyRouter)
app.use("/api/v1/payments", paymentRouter)

app.use(errorHandler)

export { app }