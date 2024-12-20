import prisma from "@/lib/prisma";

import { QuestionType } from "@prisma/client";
import { z } from "zod";

const humanQuestionSchema = z.object({
    type: z.nativeEnum(QuestionType),
    excludeIds: z.array(z.number()).optional(),
});

type getHumanQuestionProps = {
    type: QuestionType,
    excludeIds?: number[],
}

export async function getHumanQuestion({
    ...props
}: getHumanQuestionProps) {
    const { type, excludeIds } = humanQuestionSchema.parse({
        ...props
    });

    const validQuestionIds = await prisma.question.findMany({
        where: {
            type,
            id: {
                notIn: excludeIds,
            },
        },
        select: { id: true },
    });

    if (validQuestionIds.length === 0) {
        return null;
    }

    const randomId = validQuestionIds[Math.floor(Math.random() * validQuestionIds.length)].id;

    const question = await prisma.question.findUnique({
        where: {
            id: randomId,
        },
    });

    return question;
}