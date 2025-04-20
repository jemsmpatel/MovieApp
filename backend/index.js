// packages
import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Files
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import genreRouts from './routes/genreRoutes.js';
import moviesRouts from './routes/moviesRouts.js';
import uploadRouts from './routes/uploadRouts.js';

// __dirname workaround for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// configuration
dotenv.config()
connectDB()

const app = express()

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())


const PORT = process.env.PORT || 3000


// Routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/genre', genreRouts);
app.use('/api/v1/movies', moviesRouts);
app.use('/api/v1/upload', uploadRouts);


// Static file serving for Vite frontend build
app.use(express.static(path.join(__dirname, "../frontend/dist")));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
});


app.listen(PORT, () => console.log(`server is running on port ${PORT}`));