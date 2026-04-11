import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import notesRoutes from "./routes/notesRoutes.js";
import { connectDb } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// middleware
app.use(express.json());

app.use(rateLimiter);

app.use(
  cors({
    origin : "http://localhost:5173",
  })
);

app.use("/api/notes", notesRoutes);

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on PORT : 5001");
  });
});
