'use client'
 
import { useRef, useState } from 'react'

import { Dice2, Dice1, Dice3, Dice4, Dice5, Dice6 } from 'lucide-react'

import { useConfig } from '@/context/ConfigProvider'
import { CardColors } from '@/constants'

import { CardTypes, GameCard } from '@/components/gameCard'

import { QuestionType } from '@prisma/client'

import { ny } from '@/lib/utils'

const Home = () => {
    const HotCard = useRef<HTMLDivElement>(null);
    const IndividualCard = useRef<HTMLDivElement>(null);
    const CoupleCard = useRef<HTMLDivElement>(null);


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

        if (type === 'HOT') {
            HotCard.current?.click();
        }
        else if (type === 'INDIVIDUAL') {
            IndividualCard.current?.click();
        }
        else {
            CoupleCard.current?.click();
        }
    }

    const DiceIcon = diceNumber === 1 ? Dice1 : diceNumber === 2 ? Dice2 : diceNumber === 3 ? Dice3 : diceNumber === 4 ? Dice4 : diceNumber === 5 ? Dice5 : Dice6;
 
    return (
        <>
            <div className="flex z-[999] w-[80%] items-center justify-center flex-col gap-6 py-16 lg:h-[60%] xl:flex-row xl:py-0">
                <GameCard
                    ref={HotCard}
                    type="HOT"
                    onClick={() => HandleCardClick("HOT")}
                    isFlipped={cardSelected === "HOT"}
                    isCentered={cardSelected === "HOT"}
                    className={ny(
                        cardSelected === null || cardSelected === "HOT" ? "xl:opacity-100 xl:visible" : "hidden xl:opacity-0 xl:invisible xl:flex"
                    )}
                />
                <GameCard
                    ref={IndividualCard}
                    type="INDIVIDUAL"
                    onClick={() => HandleCardClick("INDIVIDUAL")}
                    isFlipped={cardSelected === "INDIVIDUAL"}
                    isCentered={cardSelected === "INDIVIDUAL"}
                    className={ny(
                        cardSelected === null || cardSelected === "INDIVIDUAL" ? "xl:opacity-100 xl:visible" : "hidden xl:opacity-0 xl:invisible xl:flex"
                    )}
                />
                <GameCard
                    ref={CoupleCard}
                    type="COUPLE"
                    onClick={() => HandleCardClick("COUPLE")}
                    isFlipped={cardSelected === "COUPLE"}
                    isCentered={cardSelected === "COUPLE"}
                    className={ny(
                        cardSelected === null || cardSelected === "COUPLE" ? "xl:opacity-100 xl:visible" : "hidden xl:opacity-0 xl:invisible xl:flex"
                    )}
                />
            </div>
            {
                cardSelected === null &&
                <div className='absolute bottom-2 right-2 rounded-full flex items-center justify-center z-[1000] cursor-pointer p-3 bg-black dark:bg-white' onClick={HandleRandomCardClick}>
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