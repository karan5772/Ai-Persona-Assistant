import express from "express";
import cors from "cors";
import { hc } from "./hitesh_persona.js";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/chat", async (req, res) => {
  const { message, persona } = req.body;

  if (!message || !persona) {
    return res.status(400).json({ reply: "Missing message or persona." });
  }
  try {
    const reply = await hc(message, persona);
    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: "Sorry, something went wrong." });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
