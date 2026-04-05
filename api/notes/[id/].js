import Note from "../../backend/src/models/Note.js";
import { connectDB } from "../../backend/src/config/db.js";

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  await connectDB();

  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const note = await Note.findById(id);
      if (!note) return res.status(404).json({ message: "Note not found" });
      res.status(200).json(note);
    } catch (error) {
      console.error("Error in getNoteById", error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else if (req.method === "PUT") {
    try {
      const { title, content } = req.body;
      const updatedNote = await Note.findByIdAndUpdate(
        id,
        { title, content },
        { new: true },
      );
      if (!updatedNote)
        return res.status(404).json({ message: "Note not found" });
      res.status(200).json(updatedNote);
    } catch (error) {
      console.error("Error in updateNote", error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else if (req.method === "DELETE") {
    try {
      const deletedNote = await Note.findByIdAndDelete(id);
      if (!deletedNote)
        return res.status(404).json({ message: "Note not found" });
      res.status(200).json(deletedNote);
    } catch (error) {
      console.error("Error in deleteNote", error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
