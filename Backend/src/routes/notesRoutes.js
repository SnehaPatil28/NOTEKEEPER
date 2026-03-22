import express from 'express';
import { getAllNotes, createNotes,updateNotes,deleteNotes,getNoteById} from '../controller/notesController.js';

const route = express.Router();

route.get("/", getAllNotes);
route.get("/:id", getNoteById);
route.post("/", createNotes);
route.put("/:id", updateNotes);
route.delete("/:id", deleteNotes);

export default route;
