import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import parseRoute from  "./routes/parse.js";
import uploadRoute from "./routes/upload.js";
import projectsRoute from "./routes/projects.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI  = process.env.MONGO_URI;

//middleware

app.use(cors());
app.use(express.json({limit:"10mb"}));
app.use(express.urlencoded({extended:true}));

//routes

app.use("/api/parse",parseRoute);
app.use("/api/upload",uploadRoute);
app.use("/api/projects",projectsRoute);

// Health Check

app.get("/",(req,res) => {
    res.json({status:"ok",message:"Code-Eclipse API is running"})
});

app.use((req,res) => {
    res.status(404).json({error : "Route not found."});
});

//Global error handler

app.use((err,req,res,next) => {
    console.error("Server Error : ",err.stack);
    res.status(500).json({error:err.message || "Internal server error."});
});

//MongoDB + Listen
mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");
        app.listen(PORT,() => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error("MongoDB connection failed:",err.message);
        process.exit(1);
    });
