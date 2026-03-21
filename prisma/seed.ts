import { PrismaClient } from '@prisma/client';
import "dotenv/config";

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.project.deleteMany();
  await prisma.blogPost.deleteMany();
  await prisma.contactMessage.deleteMany();

  // Seed Projects
  await prisma.project.createMany({
    data: [
      {
        title: "MananCodes Portfolio",
        description: "Personal interactive developer portfolio showcasing projects, coding journey, and blog.",
        techStack: ["Next.js", "GSAP", "Prisma", "Tailwind"],
        imageUrl: "https://picsum.photos/seed/portfolio/800/600",
        githubLink: "https://github.com",
        liveLink: "https://manancodes.com",
      },
      {
        title: "AI Voice / Chat Agent",
        description: "AI-powered voice and chatbot agent capable of conversation and automated responses.",
        techStack: ["React", "Node.js", "Gemini API", "Web Speech API"],
        imageUrl: "https://picsum.photos/seed/ai-agent/800/600",
        githubLink: "https://github.com",
        liveLink: "https://demo.com",
      },
    ],
  });

  // Seed Blog Posts
  await prisma.blogPost.createMany({
    data: [
      {
        title: "My Journey into Web Development",
        content: "It all started with a simple HTML file...",
        description: "How I started my coding journey and fell in love with building for the web.",
        slug: "journey-into-web-dev",
        date: "2024-01-15",
      },
      {
        title: "Learning Python as a Developer",
        content: "Python's simplicity is its greatest strength...",
        description: "Why Python is a must-learn language for every modern developer.",
        slug: "learning-python",
        date: "2024-02-10",
      },
      {
        title: "Understanding Data Structures",
        content: "Arrays, Linked Lists, Trees, and more...",
        description: "The foundation of efficient software development.",
        slug: "understanding-data-structures",
        date: "2024-03-05",
      },
      {
        title: "Exploring Artificial Intelligence",
        content: "The future is here with LLMs and Generative AI...",
        description: "My experience working with LLMs and building AI-powered tools.",
        slug: "exploring-ai",
        date: "2024-03-20",
      },
    ],
  });

  console.log("Seed data created successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
