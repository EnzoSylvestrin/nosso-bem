import { HTMLAttributes, MouseEvent, useEffect, useRef, useState } from "react";

import { CardColors } from "@/app/page";

import { useConfig } from "@/context/ConfigProvider";

import { Skeleton } from "./ui/skeleton";

import { ExclamationMark } from "@phosphor-icons/react";

import { Question } from "@prisma/client";

import { getHumanQuestion } from "./serverless/getHumanQuestion";
import { getMachineQuestion } from "./serverless/getMachineQuestion";

import Image from "next/image";

import { ny } from "@/lib/utils";

export type CardTypes = "HOT" | "INDIVIDUAL" | "COUPLE";

type GameCardProps = HTMLAttributes<HTMLDivElement> & {
    type: CardTypes;
    isFlipped?: boolean;
    isCentered?: boolean;
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
    ...props
}: GameCardProps) => {
    const { config } = useConfig();

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

        if (isFlipped) {
            setQuestion(null);

            return;
        }

        setIsLoading(true);
        
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
            });

            setQuestion(question);
        }
        catch (error) {
            console.error(error);
        }
        finally {
            setIsLoading(false);
        }
    }

    return (
        <div
            ref={cardRef}
            className={ny("relative flex w-full min-w-[400px] max-w-[400px] min-h-[600px] h-full cursor-pointer transition-transform duration-700",
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
                className={`relative w-full h-full transition-transform duration-700 p-20 bg-white dark:bg-gray-800 border-4 border-solid rounded-xl shadow-lg min-h-[600px] ${
                    isFlipped ? "rotate-y-180" : ""
                }`}
            >
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
                            <Skeleton className="w-16 h-16 rounded-full mb-4" />
                            <div className="flex items-center justify-center flex-col gap-4">
                                <Skeleton className="w-32 h-6" />
                                <div className="flex flex-col gap-1">
                                    <Skeleton className="w-64 h-6" />
                                    <Skeleton className="w-64 h-6" />
                                </div>
                            </div>
                        </div>
                    ) : !question ? (
                        <div className="flex items-center justify-center flex-col gap-4 px-4 py-2">
                            <div className="w-16 h-16 flex rounded-full mb-4 items-center justify-center bg-red-600/60">
                                <ExclamationMark size={30} color="#dc2626" />
                            </div>
                            <div className="flex items-center justify-center flex-col gap-4">
                                <p className="text-red-600">Nenhuma questão encontrada!</p>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center flex-col gap-4 px-4 py-2 text-gray-900 dark:text-white">
                            <div className="w-16 h-16 flex rounded-full mb-4 items-center justify-center bg-green-600/60">
                                {question.source === 'MACHINE' ? (
                                    <Image width={64} height={64} src="/openai-logo.svg" alt="OpenAI" className="w-8 h-8" />
                                ) : (
                                    <Image width={64} height={64} src={(question.userData as UserData).image} alt={(question.userData as UserData).name} className="rounded-full" />
                                )}
                            </div>
                            <div className="flex items-center justify-center flex-col gap-4">
                                <p>{question.title}</p>
                                {
                                    question.description && (
                                        <div className="flex flex-wrap break-words">
                                            <p>{question.description}</p>
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
