import { NextApiRequest, NextApiResponse } from "next";
import cors from "cors";

type Headers = {
  [key: string]: string;
};

// Initialize CORS middleware
const corsMiddleware = cors({
  origin: "https://status-sphere.vercel.app",
  methods: ["GET"],
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  corsMiddleware(req, res, async () => {
    const headers: Headers = {
      "Content-Type": "application/json",
    };

    // Checking if the endpoint is the Bright Data API endpoint
    if (
      req.query.endpoint === "https://api.brightdata.com/network_status/all"
    ) {
      const apiKey = "a9d20539-46d4-4bbe-b847-a06328d25c08";
      headers["Authorization"] = `Bearer ${apiKey}`;
    }

    const requestOptions = {
      method: "GET",
      headers: headers,
    };

    try {
      const response = await fetch(
        req.query.endpoint as string,
        requestOptions
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return res.status(response.status).send(data);
    } catch (error) {
      console.error(`Error fetching status from ${req.query.endpoint}:`, error);
      return res.status(500).send({ error: "Internal server error" });
    }
  });
}

export const config = {
  api: {
    externalResolver: true,
  },
};
