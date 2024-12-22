'use server';

import prisma from "@/lib/prisma";

import { z } from "zod";

const deleteQuestionSchema = z.object({
    questionId: z.number(),
})

type DeleteQuestionProps = {
    questionId: number;
}

export const DeleteQuestion = async ({
    ...props
}: DeleteQuestionProps) => {
    const { questionId } = deleteQuestionSchema.parse(props);

    await prisma.question.delete({
        where: {
            id: questionId
        }
    })
}