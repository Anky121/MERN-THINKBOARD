import Note from "../../backend/src/models/Note.js";
import { connectDB } from "../../backend/src/config/db.js";

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  await connectDB();

  if (req.method === "GET") {
    try {
      const notes = await Note.find().sort({ createdAt: -1 });
      res.status(200).json(notes);
    } catch (error) {
      console.error("Error in getAllNotes", error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else if (req.method === "POST") {
    try {
      const { title, content } = req.body;
      const note = new Note({ title, content });
      const savedNote = await note.save();
      res.status(201).json(savedNote);
    } catch (error) {
      console.error("Error in createNote", error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
