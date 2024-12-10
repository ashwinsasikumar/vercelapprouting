import { streamText, convertToCoreMessages, generateText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";


const google = createGoogleGenerativeAI({
    apiKey: "AIzaSyBJ7w_R-z_hm8nAkkWvN5BKjmB47P8VMcQ",
});

export const maxDuration = 30;
export async function POST(req) {
    const { messages } = await req.json();
    const result = streamText({
        model: google("gemini-1.5-flash"),
        messages: convertToCoreMessages(messages),
        system: "You are a chatbot and you are supposed to have knowledge limited only to pet care",
    });


    return result.toDataStreamResponse();
}