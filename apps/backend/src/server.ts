import express from "express";
import bodyParser from "body-parser";
import { Client } from "@notionhq/client";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const notion = new Client({ auth: process.env.NOTION_API_KEY });

app.use(bodyParser.json());

// Example RSVP route
app.post("/rsvp", async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "Name and Email are required" });
  }

  try {
    await notion.pages.create({
      parent: { database_id: process.env.NOTION_DATABASE_ID },
      properties: {
        Name: { title: [{ text: { content: name } }] },
        Email: { rich_text: [{ text: { content: email } }] },
      },
    });
    res.status(200).json({ message: "RSVP saved!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to save RSVP", error });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
