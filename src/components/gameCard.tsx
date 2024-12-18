import { MagicCard } from "./magic-card"

type GameCardProps = {
    type: "HOT" | "INDIVIDUAL" | "COUPLE"
    title: string
    image?: string
}

export const GameCard = ({
    type,
    title,
    // image
}: GameCardProps) => {
    const colors = {
        HOT: "hsl(0, 100%, 50%)",
        INDIVIDUAL: "hsl(216.18556701030928, 81.5126050420168%, 53.333333333333336%)",
        COUPLE: "hsl(287.79661016949154, 76.62337662337661%, 54.70588235294118%)"
    }

    return (
        <MagicCard
            className="flex w-full cursor-pointer flex-col items-center justify-center overflow-hidden p-20 shadow-2xl transition-all duration-300 hover:scale-[1.03]"
            size={300}
            borderColor={colors[type]}
        >
            <p className="z-10 whitespace-nowrap text-4xl font-medium text-gray-800 dark:text-gray-200">
                {title}
            </p>
        </MagicCard>
    )
}