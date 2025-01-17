import express, { urlencoded } from "express";
import jobRouter from './src/routes/job.route.js';
import authRouter from './src/routes/auth.route.js'

import expressEjsLayouts from 'express-ejs-layouts';
import path from 'path';
import session from "express-session";
import cookieParser from "cookie-parser";

//* --> Creating Express Server:
const server = express();



//* --> Cookie Parser
server.use(cookieParser())

//* --> Configuring data movements:
server.use(express.json());
server.use(express.static(path.resolve("src", "public")));
server.use(urlencoded({ extended: true }));

//* --> Setting Ejs Layouts:
server.use(expressEjsLayouts);
server.set("view engine", "ejs");
server.set("views", path.resolve("src", "views"));
server.set("layout", path.resolve("src", "views", "layout"));

//* --> Express session setup:
server.use(session({
    secret: 'VarunKey',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

// ~----------------------------------------------------------------------------
//^ --Function to calculate remaining days for each jobs
// Assuming you have a function to calculate remaining days
function calculateRemainingDays(jobLastDate) {
    // Your implementation to calculate remaining days
    // For example:
    const lastDate = new Date(jobLastDate);
    const currentDate = new Date();
    const remainingDays = Math.ceil((lastDate - currentDate) / (1000 * 60 * 60 * 24));
    if(remainingDays<0){
        return 'ended';
    }
    return remainingDays;
}
  
  // Assuming you're using Express, make the function available to your templates
  server.locals.calculateRemainingDays = calculateRemainingDays;
  // ~----------------------------------------------------------------------------
  

server.use(jobRouter);
server.use(authRouter)

export default server;