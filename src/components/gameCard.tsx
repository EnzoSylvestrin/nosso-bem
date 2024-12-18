import { HTMLAttributes } from "react";
import { MagicCard } from "./magic-card"
import { CardColors } from "@/app/page";

export type CardTypes = "HOT" | "INDIVIDUAL" | "COUPLE";

type GameCardProps = HTMLAttributes<HTMLDivElement> & {
    type: CardTypes
    title: string
    image?: string
}

export const GameCard = ({
    type,
    title,
    // image
    ...props
}: GameCardProps) => {
    return (
        <MagicCard
            className="flex w-full cursor-pointer flex-col items-center justify-center overflow-hidden px-20 py-40 shadow-2xl transition-all duration-300 hover:scale-[1.03]"
            size={300}
            borderColor={CardColors[type]}
            {...props}
        >
            <p className="z-10 whitespace-nowrap text-4xl font-medium text-gray-800 dark:text-gray-200">
                {title}
            </p>
        </MagicCard>
    )
}