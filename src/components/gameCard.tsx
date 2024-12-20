import { HTMLAttributes, useEffect, useRef, useState } from "react";
import { CardColors } from "@/app/page";
import { ny } from "@/lib/utils";

export type CardTypes = "HOT" | "INDIVIDUAL" | "COUPLE";

type GameCardProps = HTMLAttributes<HTMLDivElement> & {
    type: CardTypes;
    isFlipped?: boolean;
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
                {...props}
                className={`relative w-full h-full transition-transform duration-700 p-20 bg-white dark:bg-gray-800 border-2 border-solid rounded-xl shadow-lg min-h-[600px] ${
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
                    className={`absolute inset-0 flex items-center justify-center rotate-y-180 transition-opacity duration-700 ${
                        isFlipped ? "opacity-100" : "opacity-0"
                    }`}
                    style={{
                        backfaceVisibility: "hidden",
                    }}
                >
                    <p className={ny("z-10 text-2xl font-medium text-gray-800", !isFlipped ? 'opacity-0' : 'opacity-100')}>
                        Verso do Card
                    </p>
                </div>
            </div>
        </div>
    );
};
