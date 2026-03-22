import Note from "../models/Note.js"

export async function getAllNotes(req, res) {
  try{
    const notes = await Note.find()
    res.status(200).json(notes)
  }catch(error){
    console.error("Error in getallNotes controller",error);
    res.status(500).json({ message : "Internal server error"});
  }
}

export async function createNotes(req, res) {
  try{
    const { title,content } = req.body;
    const newNote = new Note({title,content});

    await newNote.save();
    res.status(201).json({message : "Notecreated successfully"});
  } catch(error) {
    console.error("Error in createNotes controller",error);
    res.status(500).json({ message : "Internal server error"});
  }
}

export function updateNotes(req, res) {
  res.status(200).send(" ")
}

export function deleteNotes(req, res) {
  res.status(200).send(" ")
}


//mongodb+srv://manager:<root>@cluster0.wu5ozmb.mongodb.net/?appName=Cluster0