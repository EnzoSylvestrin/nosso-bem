'use client'
 
import { ny } from '@/lib/utils'

import { CardTypes, GameCard } from '@/components/gameCard'
import { useState } from 'react'

export const CardColors = {
    HOT: "#fb9a58",
    INDIVIDUAL: "#98b6d8",
    COUPLE: "#ea8684"
}
 
const Home = () => {
    const [cardSelected, setCardSelected] = useState<CardTypes | null>(null);
    const [bgAnimation, setBgAnimation] = useState<CardTypes | ''>('');
    const [isCollapsing, setIsCollapsing] = useState(false);

    const HandleCardClick = (type: CardTypes) => {
        if (isCollapsing) return;

        if (cardSelected === type) {
            setIsCollapsing(true);
            setCardSelected(null);
            setTimeout(() => {
                setBgAnimation('');
                setIsCollapsing(false);
            }, 600);
            return;
        }
        setCardSelected(type);
        setBgAnimation(type);
    }
 
    return (
        <>
            <div className="flex z-[999] w-[80%] items-center justify-center flex-col gap-6 lg:h-[60%] lg:flex-row">
                <GameCard
                    type="HOT"
                    onClick={() => HandleCardClick("HOT")}
                    isFlipped={cardSelected === "HOT"}
                    isCentered={cardSelected === "HOT"}
                    className={ny(
                        cardSelected === null || cardSelected === "HOT" ? "opacity-100 visible" : "opacity-0 invisible"
                    )}
                />
                <GameCard
                    type="INDIVIDUAL"
                    onClick={() => HandleCardClick("INDIVIDUAL")}
                    isFlipped={cardSelected === "INDIVIDUAL"}
                    isCentered={cardSelected === "INDIVIDUAL"}
                    className={ny(
                        cardSelected === null || cardSelected === "INDIVIDUAL" ? "opacity-100 visible" : "opacity-0 invisible"
                    )}
                />
                <GameCard
                    type="COUPLE"
                    onClick={() => HandleCardClick("COUPLE")}
                    isFlipped={cardSelected === "COUPLE"}
                    isCentered={cardSelected === "COUPLE"}
                    className={ny(
                        cardSelected === null || cardSelected === "COUPLE" ? "opacity-100 visible" : "opacity-0 invisible"
                    )}
                />
            </div>
            {bgAnimation && (
                <div
                    className="absolute inset-0 flex items-center justify-center pointer-events-none z-[988]"
                >
                    <div
                        className={`absolute w-[100px] h-[100px] rounded-full ${
                            isCollapsing ? 'animate-collapse' : 'animate-expand'
                        }`}
                        style={{ backgroundColor: CardColors[bgAnimation] }}
                    />
                </div>
            )}
        </>
    )
}
 
export default Home