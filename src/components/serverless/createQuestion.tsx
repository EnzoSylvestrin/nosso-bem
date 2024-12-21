'use server';

import prisma from "@/lib/prisma";

import { QuestionSource, QuestionType } from "@prisma/client";

import { z } from "zod";

const CreateQuestionSchema = z.object({
    type: z.nativeEnum(QuestionType),
    title: z.string({ required_error: "O titulo é obrigatório." }).min(1, {
        message: "O titulo é obrigatório.",
    }),
    description: z.string().optional(),
    userData: z.object({
        image: z.string().optional(),
        name: z.string().optional(),
        email: z.string().optional(),
    })
})

type CreateQuestionProps = {
    type: QuestionType;
    title: string;
    description?: string;
    userData: {
        image?: string;
        name?: string;
        email?: string;
    }
}

export const CreateQuestion = async ({
    ...props
}: CreateQuestionProps) => {
    const values = CreateQuestionSchema.parse(props);

    await prisma.question.create({
        data: {
            source: QuestionSource.HUMAN,
            ...values
        }
    })
}