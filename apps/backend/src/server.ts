import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { Client } from "@notionhq/client";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const notion = new Client({ auth: process.env.NOTION_API_KEY });

app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());

// Your existing routes
app.get("/ping", (req, res) => {
  res.send("ping");
});

app.get("/api/notion-events", async (req, res) => {
  try {
    const databaseId =
      process.env.NOTION_DATABASE_ID || "104f3a11-dfb4-80ed-9237-def93f7b3695";
    const response = await notion.databases.query({
      database_id: databaseId,
    });

    // Send the results back to the client
    res.json(response.results);
  } catch (error) {
    console.error("Error fetching events from Notion:", error);
    res.status(500).json({ error: "Failed to fetch events from Notion" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
