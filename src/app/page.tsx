'use client'
 
import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

import { CardTypes, GameCard } from '@/components/gameCard'
import Particles from '@/components/particles'

import { ny } from '@/lib/utils'
import { useConfig } from '@/context/ConfigProvider'
import { OpenAiLogo } from '@phosphor-icons/react'

export const CardColors = {
    HOT: "#fb9a58",
    INDIVIDUAL: "#98b6d8",
    COUPLE: "#ea8684"
}
 
const Home = () => {
    const { config, setConfig } = useConfig()
    const [color, setColor] = useState('#ffffff')

    const [cardSelected, setCardSelected] = useState<CardTypes | null>(null);
    const [bgAnimation, setBgAnimation] = useState<CardTypes | ''>('');
    const [isCollapsing, setIsCollapsing] = useState(false);

    const [aiActive, setAiActive] = useState(false)
    
    useEffect(() => {
        setColor(config.theme === 'dark' ? '#ffffff' : '#000000')
    }, [config.theme])

    const HandleChangeTheme = () => {
        setConfig({
            theme: config.theme === 'dark' ? 'light' : 'dark'
        });
    }

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
        <div 
            className={ny(
                "bg-background relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden md:shadow-xl",
                config.theme === 'dark' && 'dark',
            )}
        >
            <div className='absolute top-2 right-2 p-2 flex items-center justify-center rounded-full bg-black dark:bg-white z-[1000]' onClick={HandleChangeTheme}>
                {config.theme === 'light' ? (
                    <Moon size={24} color='#fff' />
                ): (
                    <Sun size={24} color='#000' />
                )}
            </div>
            <div className='absolute bottom-2 right-2 p-2 flex items-center justify-center rounded-full bg-black dark:bg-white z-[1000]' onClick={() => setAiActive(!aiActive)}>
                <OpenAiLogo size={24} color={aiActive ? '#0bb121' : config.theme === 'light' ? '#fff' : '#000'} />
            </div>
            <div className="flex z-[999] w-[80%] items-center justify-center flex-col gap-6 lg:h-[60%] lg:flex-row">
                {(cardSelected === null || cardSelected === 'HOT') && (
                    <GameCard
                        type='HOT'
                        onClick={() => HandleCardClick('HOT')}
                        isFlipped={cardSelected === 'HOT'}
                        isCentered={cardSelected === 'HOT'}
                    />
                )}
                {(cardSelected === null || cardSelected === 'INDIVIDUAL') && (
                    <GameCard
                        type='INDIVIDUAL'
                        onClick={() => HandleCardClick('INDIVIDUAL')}
                        isFlipped={cardSelected === 'INDIVIDUAL'}
                        isCentered={cardSelected === 'INDIVIDUAL'}
                    />
                )}
                {(cardSelected === null || cardSelected === 'COUPLE') && (
                    <GameCard
                        type='COUPLE'
                        onClick={() => HandleCardClick('COUPLE')}
                        isFlipped={cardSelected === 'COUPLE'}
                        isCentered={cardSelected === 'COUPLE'}
                    />
                )}
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
            <Particles
                className="absolute inset-0 z-[900]"
                quantity={100}
                ease={80}
                color={color}
                refresh
            />
        </div>
    )
}
 
export default Home