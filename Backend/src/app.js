import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connect } from "mongoose";
import { connectDb } from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

connectDb();

// middleware
app.use(express.json());

app.use("/api/notes", notesRoutes);

app.listen(PORT, () => {
  console.log("Server started on PORT : 5001");
});
