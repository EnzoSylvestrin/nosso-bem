import { HTMLAttributes, useEffect, useRef, useState } from "react";
import { CardColors } from "@/app/page";

export type CardTypes = "HOT" | "INDIVIDUAL" | "COUPLE";

type GameCardProps = HTMLAttributes<HTMLDivElement> & {
    type: CardTypes;
    isFlipped?: boolean;
    image?: string;
    isCentered?: boolean;
};

export const GameCard = ({
    type,
    isFlipped = false,
    isCentered = false,
    ...props
}: GameCardProps) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [translateX, setTranslateX] = useState(0);

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


    const backgroundStyle =
        type === "COUPLE" && !isFlipped
            ? {
                backgroundImage: "url('/couple.gif')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }
            : isFlipped ? {
                backgroundImage: `url('/fundo-card-${type.toLowerCase()}.png')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            } : {};

    return (
        <div
            ref={cardRef}
            className={`relative flex w-full max-w-[400px] cursor-pointer transform-gpu transition-transform duration-700`}
            style={{
                transform: `translateX(${translateX}px)`,
                perspective: "1000px",
            }}
        >
            <div
                className={`relative w-full h-full transition-transform duration-700 min-h-[600px] p-20 bg-white dark:bg-gray-800 border-2 border-solid rounded-xl shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    isFlipped ? "rotate-y-180" : ""
                }`}
                style={{
                    transformStyle: "preserve-3d",
                    borderColor: CardColors[type],
                    ...backgroundStyle,
                }}
                {...props}
            >
                <div
                    className={`absolute inset-0 flex items-center justify-center`}
                    style={{
                        backfaceVisibility: "hidden",
                    }}
                />

                <div
                    className={`absolute inset-0 flex items-center justify-center rotate-y-180`}
                    style={{
                        backfaceVisibility: "hidden",
                    }}
                >
                    <p className="z-10 text-2xl font-medium text-gray-800">
                        Verso do Card
                    </p>
                </div>
            </div>
        </div>
    );
};
