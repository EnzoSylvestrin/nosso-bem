'use server';

import prisma from "@/lib/prisma";

import { QuestionSource, QuestionType } from "@prisma/client";
import axios from "axios";
import { z } from "zod";

const machineQuestionSchema = z.object({
    type: z.nativeEnum(QuestionType),
});

type getMachineQuestionProps = {
    type: QuestionType,
}

async function generateQuestionWithChatGPT(type: QuestionType): Promise<string> {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
        throw new Error("OpenAI API Key is not set in environment variables.");
    }

    try {
        const prompt = `Generate a creative question for a ${type} type game.`;
        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-4o-mini",
                messages: [
                    { role: "system", content: "You are a creative assistant for generating game questions." },
                    { role: "user", content: prompt },
                ],
                max_tokens: 100,
            },
            {
                headers: {
                    "Authorization": `Bearer ${apiKey}`,
                    "Content-Type": "application/json",
                },
            }
        );
    
        if (response.data.choices && response.data.choices.length > 0) {
            return response.data.choices[0].message.content.trim();
        } else {
            throw new Error("Failed to generate question from ChatGPT.");
        }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error("Error calling OpenAI API:", error.response?.data || error.message);
        throw new Error("Failed to fetch question from OpenAI.");
    }
}

export async function getMachineQuestion({
    ...props
}: getMachineQuestionProps) {
    const { type } = machineQuestionSchema.parse({ ...props });

    const generatedTitle = await generateQuestionWithChatGPT(type);

    const question = await prisma.question.create({
        data: {
            title: generatedTitle,
            type: type,
            source: QuestionSource.MACHINE,
        },
    });

    return question;
}