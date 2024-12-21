'use client'
 
import { useState } from 'react'

import { Dice2, Dice1, Dice3, Dice4, Dice5, Dice6 } from 'lucide-react'

import { useConfig } from '@/context/ConfigProvider'
import { CardColors } from '@/constants'

import { CardTypes, GameCard } from '@/components/gameCard'

import { QuestionType } from '@prisma/client'

import { ny } from '@/lib/utils'

const Home = () => {
    const { config } = useConfig();

    const [diceNumber, setDiceNumber] = useState(1);
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

    const HandleRandomCardClick = () => {
        const randomCard = Math.floor(Math.random() * 3);
        const randomDice = Math.floor(Math.random() * 6);
        setDiceNumber(randomDice);
        const type = Object.keys(QuestionType)[randomCard] as CardTypes;
        HandleCardClick(type);
    }

    const DiceIcon = diceNumber === 1 ? Dice1 : diceNumber === 2 ? Dice2 : diceNumber === 3 ? Dice3 : diceNumber === 4 ? Dice4 : diceNumber === 5 ? Dice5 : Dice6;
 
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
            {
                cardSelected === null &&
                <div className='absolute bottom-2 right-2 rounded-full flex items-center justify-center z-[1000] p-3 bg-black dark:bg-white' onClick={HandleRandomCardClick}>
                    <DiceIcon size={24} color={config.theme === 'light' ? '#fff' : '#000'} />
                </div>
            }
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