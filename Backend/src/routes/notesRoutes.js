import express from 'express';
import { getAllNotes, createNotes,updateNotes,deleteNotes } from '../controller/notesController.js';

const route = express.Router();

route.get("/", getAllNotes);
route.post("/", createNotes);
route.put("/", updateNotes);
route.delete("/", deleteNotes);

export default route;
