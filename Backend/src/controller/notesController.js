import Note from "../models/Note.js";

export async function getAllNotes(req, res) {
  try {
    const notes = (await Note.find()).sort({ createdAt: -1});
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error in getallNotes controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getNoteById(req,res) {
  try{
    const noteById = await Note.findById(req.params.id);
    if (!noteById) return res.status(404).json({ message: "Note not found" });

    res.status(200).json(noteById);
  } catch (error) {
    console.error("Error in getallNotes controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function createNotes(req, res) {
  try {
    const { title, content } = req.body;
    const note = new Note({ title, content });

    const saveNote = await note.save();
    res.status(201).json(saveNote);
  } catch (error) {
    console.error("Error in createNotes controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function updateNotes(req, res) {
  try {
    const { title, content } = req.body;
    const updateNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      {
        new: true,
      },
    );

    if (!updateNote) return res.status(404).json({ message: "Note not found" });

    res.status(200).json(updateNote);
  } catch (error) {
    console.error("Error in updateNotes controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function deleteNotes(req, res) {
  try {
    const deleteNote = await Note.findByIdAndDelete(req.params.id);
    if (!deleteNote) return res.status(404).json({ message: "Note not found" });
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("Error in delteNotes controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
