import { generateObject } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { z } from 'zod';
const google = createGoogleGenerativeAI({
    apiKey: "AIzaSyBJ7w_R-z_hm8nAkkWvN5BKjmB47P8VMcQ",
});
const productSchema = z.object({
    productTitle: z.string(),
    breakdownSteps: z.array(z.object({
        ingridients: z.string(),
        harmfullchemicals: z.string(),
        healthissue: z.string().optional(),
        suggestion: z.string().optional(),
    })),
});

export async function handleGenerateProduct(userInput) {
    try {

        console.log("User product:", userInput);
        const prompt = `
    Generate information about the following product: 
    "${userInput}"
    The information should include:
    - The product title
    - A breakdown of steps, with each step consisting of:
      1. A title (Step name)
      2. A description or explanation of the task
      3. (Optional) Links or resources to help.
    `;
        const generatedProductInformation = await generateObject({
            model: google("gemini-1.5-flash"),
            schema: productSchema,
            prompt: prompt,
            system: "you are a chatbot,only answer question when input is a product used by people,generate answer only for the products which are consumed by people if it is other than that tell i am only here to answer questions based on consumer products.",
        });
        return generatedProductInformation.object;

    } catch (error) {
        console.error("Error generating product information:", error);
        return {
            productTitle: "Error: Could not generate a product information.",
            breakdownSteps: [],
        };
    }
}