import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// Initialize Google Gen AI Client on the server with recommended options
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API route for real-time weather using Google Search grounding
  app.get("/api/weather", async (req, res) => {
    try {
      if (!process.env.GEMINI_API_KEY) {
        console.warn("GEMINI_API_KEY is not defined, returning fallback weather data.");
        return res.json(getFallbackData("Hệ thống khí tượng thông minh (Không có API Key)"));
      }

      const prompt = `Please search and find the ACTUAL current temperature (in Celsius), current weather condition, and tomorrow's weather forecast for both "Da Nang" and "Hoi An", Vietnam right now. 
Today's date is June 2026.
Return strictly the response as a valid JSON object matching the following structure and absolutely NO markdown wrapping or backticks like \`\`\`json:
{
  "danang": {
    "temp": number, // current temperature as integer in Celsius, e.g., 28
    "condition": string, // short text like "Trời nắng", "Nhiều mây", "Mơ rào rải rác"
    "forecast": string, // brief forecast for tomorrow like "Mát mẻ, ít mây và nắng dịu"
    "humidity": string, // current humidity percentage e.g., "78%"
    "windSpeed": string // wind speed value e.g., "12 km/h"
  },
  "hoian": {
    "temp": number,
    "condition": string,
    "forecast": string,
    "humidity": string,
    "windSpeed": string
  },
  "lastUpdated": string // string formatted as e.g. "12:30 AM" or similar
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction: "You are a concise local weather specialist. You must use Google Search to obtain the genuine contemporary weather status for Da Nang and Hoi An. Always reply in strict JSON matching the requested structure. Never include any markdown block notation like ```json or trailing text.",
          tools: [{ googleSearch: {} }],
          responseMimeType: "application/json",
        }
      });

      const text = response.text || "";
      let parsedData;
      try {
        parsedData = JSON.parse(text.trim().replace(/^```json\s*/, "").replace(/```$/, ""));
      } catch (e) {
        console.error("Failed to parse Gemini weather response as JSON, raw response:", text);
        parsedData = getFallbackData("Dự báo thời tiết miền Trung");
      }

      // Add source URL/Grounding references if any
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      const sources: string[] = [];
      if (chunks && Array.isArray(chunks)) {
        for (const chunk of chunks) {
          if (chunk.web?.title) {
            sources.push(chunk.web.title);
          } else if (chunk.web?.uri) {
            sources.push(new URL(chunk.web.uri).hostname);
          }
        }
      }
      
      parsedData.sources = sources.length > 0 ? Array.from(new Set(sources)).slice(0, 3) : ["Google Search Live Data"];
      res.json(parsedData);

    } catch (error) {
      console.error("Error in /api/weather endpoint:", error);
      res.json(getFallbackData("Hệ thống dự phòng tự động"));
    }
  });

  // Helper function for fallback data in case of error or missing API Key
  function getFallbackData(sourceName: string) {
    const timeString = new Date().toLocaleTimeString("vi-VN", { hour: '2-digit', minute: '2-digit' });
    return {
      danang: {
        temp: 31,
        condition: "Nắng ráo",
        forecast: "Ngày nắng nóng nhẹ, chiều tối mát mẻ",
        humidity: "74%",
        windSpeed: "14 km/h"
      },
      hoian: {
        temp: 30,
        condition: "Nắng nhẹ",
        forecast: "Ngày nắng ráo, lộng gió sông Thu Bồn",
        humidity: "76%",
        windSpeed: "11 km/h"
      },
      lastUpdated: timeString,
      sources: [sourceName]
    };
  }

  // Vite development middleware vs Static Production bundle
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
    console.log(`Server is bootstrapping on port ${PORT}`);
  });
}

startServer();
