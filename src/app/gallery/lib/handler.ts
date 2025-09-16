// pages/api/gallery-config.js
import Cors from "nextjs-cors";
import axios from "axios";

export default async function handler(req: any, res: any) {
  await Cors(req, res, {
    methods: ["GET", "HEAD", "OPTIONS"],
    origin: ["https://lacarmela-madrid.vercel.app", "http://localhost:3000"],
    optionsSuccessStatus: 200,
  });

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const response = await axios.get(
      "https://s3.proexweb.com/lacarmelamadrid/gallery-config.json",
      {
        timeout: 10000,
      }
    );

    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate");
    return res.status(200).json(response.data);
  } catch (error: any) {
    console.error("Error fetching gallery config:", error.message);
    return res.status(500).json({
      error: "Failed to fetch gallery config",
      message: error.message,
    });
  }
}
