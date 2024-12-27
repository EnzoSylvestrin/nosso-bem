import { HTMLAttributes, MouseEvent, useEffect, useRef, useState } from "react";

import { CardColors } from "@/constants";

import { useConfig } from "@/context/ConfigProvider";

import { Skeleton } from "./ui/skeleton";

import { QuestionMark, Trash } from "@phosphor-icons/react";

import { Question } from "@prisma/client";

import { getHumanQuestion } from "./serverless/getHumanQuestion";
import { getMachineQuestion } from "./serverless/getMachineQuestion";

import Image from "next/image";

import { ny } from "@/lib/utils";
import { toast } from "sonner";
import { DeleteQuestion } from "./serverless/deleteQuestion";

export type CardTypes = "HOT" | "INDIVIDUAL" | "COUPLE";

type GameCardProps = HTMLAttributes<HTMLDivElement> & {
    type: CardTypes;
    isFlipped?: boolean;
    isCentered?: boolean;
    ref: React.Ref<HTMLDivElement>;
};

type UserData = {
    image: string;
    name: string;
}

export const GameCard = ({
    type,
    isFlipped = false,
    isCentered = false,
    onClick,
    ref,
    ...props
}: GameCardProps) => {
    const { config } = useConfig();

    const [usedQuestionIds, setUsedQuestionIds] = useState<number[]>([]);

    const cardRef = useRef<HTMLDivElement>(null);

    const [question, setQuestion] = useState<Question | null>(null);

    const [translateX, setTranslateX] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isCentered && cardRef.current) {
            const cardRect = cardRef.current.getBoundingClientRect();
            const screenWidth = window.innerWidth;
            const centerX = screenWidth / 2;

            const offsetX = centerX - (cardRect.left + cardRect.width / 2);
            setTranslateX(offsetX);
        } else {
            setTranslateX(0);
        }
    }, [isCentered]);

    const backgroundStyle = !isFlipped
        ? {
            backgroundImage: `url('/${type.toLowerCase()}.gif')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }
        : {
            backgroundImage: `url('/fundo-card-${type.toLowerCase()}.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          };

    const HandleCardClick = async (e: MouseEvent<HTMLDivElement>) => {
        if (!onClick) return;
        
        onClick(e);

        setIsLoading(true);

        if (isFlipped) {
            setQuestion(null);

            return;
        }

        SelectQuestion();
    }

    const SelectQuestion = async () => {
        try {
            if (config.useAi) {
                const question = await getMachineQuestion({
                    type,
                });

                setQuestion(question);

                return;
            }

            const question = await getHumanQuestion({
                type,
                excludeIds: usedQuestionIds,
            });
            
            if (question) setUsedQuestionIds([...usedQuestionIds, question.id]);
            
            setQuestion(question);
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        catch (error: any) {
            toast.error(error.message);
        }
        finally {
            setIsLoading(false);
        }
    }

    const HandleDeleteCard = async (e: MouseEvent<HTMLDivElement>) => {
        if (!question) return;

        e.stopPropagation();

        setIsLoading(true);

        try {
            await DeleteQuestion({
                questionId: question.id,
            });

            setQuestion(null);

            toast.success("Questão deletada com sucesso!");

            SelectQuestion();
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        catch (error: any) {
            toast.error(error.message);
        }
    }

    return (
        <div
            ref={cardRef}
            className={ny("relative flex w-full min-w-[320px] max-w-[320px] min-h-[300px] h-full cursor-pointer transition-transform duration-700 sm:min-w-[400px] sm:max-w-[400px] sm:min-h-[600px]",
                props.className,
            )}
            style={{
                transform: `translateX(${translateX}px)`,
            }}
        >
            <div
                style={{
                    borderColor: CardColors[type],
                    transformStyle: "preserve-3d",
                    ...backgroundStyle,
                }}
                onClick={HandleCardClick}
                {...props}
                ref={ref}
                className={`relative w-full h-full transition-transform duration-700 p-20 bg-white dark:bg-gray-800 border-4 border-solid rounded-xl shadow-lg min-h-[600px] ${
                    isFlipped ? "rotate-y-180" : ""
                }`}
            >
                {!isLoading && question && isFlipped &&
                    <div className="flex absolute items-center justify-between top-1 left-2 cursor-pointer z-[1001] bg-white p-2 rounded-full" onClick={HandleDeleteCard}>
                        <Trash size={24} color="#da4040"/>
                    </div>
                }
                <div
                    className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 ${
                        isFlipped ? "opacity-0" : "opacity-100"
                    }`}
                    style={{
                        backfaceVisibility: "hidden",
                    }}
                />

                <div
                    className={ny("absolute inset-0 flex items-center justify-center rotate-y-180",
                        isFlipped ? "opacity-100" : "opacity-0"
                    )}
                    style={{
                        backfaceVisibility: "hidden",
                    }}
                >
                    {isLoading ? (
                        <div className="flex items-center justify-center flex-col gap-4 px-4 py-2">
                            <Skeleton className="w-24 h-24 rounded-full mb-1" />
                            <div className="flex items-center justify-center flex-col gap-4">
                                <Skeleton className="w-40 h-12" />
                                <div className="flex flex-col gap-1">
                                    <Skeleton className="w-64 h-8" />
                                    <Skeleton className="w-64 h-8" />
                                </div>
                            </div>
                        </div>
                    ) : !question ? (
                        <div className="flex items-center justify-center flex-col gap-4 px-4 py-2">
                            <div className="w-24 h-24 flex rounded-full mb-4 items-center justify-center bg-white/60">
                                <QuestionMark size={60} color={CardColors[type]} />
                            </div>
                            <div className="flex items-center justify-center flex-col gap-5">
                                <p 
                                    className="text-center text-3xl"
                                    style={{
                                        color: CardColors[type],
                                    }}
                                >
                                    Nenhuma questão encontrada!
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center flex-col gap-4 px-4 py-2">
                            <div className="max-w-24 max-h-24 flex rounded-full mb-1 items-center justify-center bg-green-600/60">
                                {question.source === 'MACHINE' ? (
                                    <Image width={96} height={96} src="/openai-logo.svg" alt="OpenAI" className="w-8 h-8" />
                                ) : (
                                    <Image width={96} height={96} src={(question.userData as UserData).image} alt={(question.userData as UserData).name} className="rounded-full max-h-24" />
                                )}
                            </div>
                            <div className="flex items-center justify-center flex-col gap-5">
                                <p
                                    className="text-center text-3xl font-mono"
                                    style={{
                                        color: CardColors[type],
                                    }}
                                >
                                    {question.title}
                                </p>
                                {
                                    question.description && (
                                        <div className="flex flex-wrap break-words font-sans px-12 font-bold text-gray-900">
                                            <p className="text-center text-lg">{question.description}</p>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
