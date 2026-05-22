import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = 3000;

// Parse JSON bodies
app.use(express.json());

// Initialize GoogleGenAI lazily (safely check for key)
const getGenAI = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("WARNING: GEMINI_API_KEY is not defined. Chatbot features will fail.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

// API Endpoint for Chat proxying - keeps API key secure
app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Missing messages array" });
    }

    const ai = getGenAI();
    if (!ai) {
      return res.status(500).json({ error: "Gemini API key is not configured on the server." });
    }

    // Call the newest Gemini model
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: messages,
    });

    res.json({ text: response.text || "No response text generated." });
  } catch (error: any) {
    console.error("Gemini API error in server:", error);
    res.status(500).json({ error: error?.message || "Internal Server Error in Gemini execution." });
  }
});

async function startServer() {
  // Vite integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
