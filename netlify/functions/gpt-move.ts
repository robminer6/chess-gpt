import { Handler } from "@netlify/functions";
import fetch from "node-fetch";

// Netlify function handler
export const handler: Handler = async (event) => {
    try {
        const apiKey = process.env.OPENAI_API_KEY;

        if (!apiKey) {
            return {
                statusCode: 500,
                body: JSON.stringify({ error: "Missing OpenAI API key" }),
            };
        }

        const requestBody = JSON.parse(event.body || "{}");

        // Make a request to OpenAI's API
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify(requestBody), // Pass the body from the front-end
        });

        const data = await response.json();

        // Return the result back to the front-end
        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    } catch (error) {
        console.error("Error in openai-move function:", error);

        // Return error response
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Something went wrong" }),
        };
    }
};
