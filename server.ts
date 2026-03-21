import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { PrismaClient } from "@prisma/client";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let prisma: PrismaClient | null = null;

function getPrisma() {
  if (!prisma) {
    if (!process.env.DATABASE_URL) {
      console.warn("DATABASE_URL is not set. Database features will be disabled. Set it in the Secrets panel.");
      return null;
    }
    prisma = new PrismaClient();
  }
  return prisma;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Seed initial blog posts if empty
  const db = getPrisma();
  if (db) {
    try {
      const blogCount = await db.blogPost.count();
      if (blogCount === 0) {
        await db.blogPost.createMany({
          data: [
            {
              title: "My Journey into Web Development",
              description: "How I started my coding journey and fell in love with building for the web.",
              date: "2026-03-15",
              content: "It all started with a simple HTML file...",
              slug: "journey-into-web-dev"
            },
            {
              title: "Learning Python as a Developer",
              description: "Why Python is a must-learn language for every modern developer.",
              date: "2026-03-10",
              content: "Python's simplicity and power make it incredible...",
              slug: "learning-python"
            },
            {
              title: "Understanding Data Structures",
              description: "The foundation of efficient software development.",
              date: "2026-03-05",
              content: "Data structures are the building blocks of algorithms...",
              slug: "understanding-data-structures"
            },
            {
              title: "Exploring Artificial Intelligence",
              description: "My experience working with LLMs and building AI-powered tools.",
              date: "2026-03-01",
              content: "AI is changing the way we build software...",
              slug: "exploring-ai"
            }
          ]
        });
      }
    } catch (error) {
      console.error("Failed to seed database:", error);
    }
  }

  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Blog API
  app.get("/api/blog", async (req, res) => {
    const db = getPrisma();
    if (!db) {
      // Fallback mock data if DB is not configured
      return res.json([
        {
          id: "mock-1",
          title: "Setup Required: Database Not Connected",
          description: "Please set your DATABASE_URL in the Secrets panel to enable the blog system.",
          date: "Action Required",
          slug: "setup-required"
        }
      ]);
    }
    try {
      const posts = await db.blogPost.findMany({
        orderBy: { createdAt: 'desc' }
      });
      res.json(posts);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      res.status(500).json({ error: "Failed to fetch blog posts" });
    }
  });

  // Contact API
  app.post("/api/contact", async (req, res) => {
    const db = getPrisma();
    if (!db) {
      return res.status(503).json({ error: "Database not configured. Please set DATABASE_URL in Secrets." });
    }
    try {
      const { name, email, message } = req.body;
      const contact = await db.contactMessage.create({
        data: { name, email, message }
      });
      console.log("Contact form submission saved:", contact);
      res.json({ success: true, message: "Message received and saved!" });
    } catch (error) {
      console.error("Error saving contact message:", error);
      res.status(500).json({ error: "Failed to save message" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
