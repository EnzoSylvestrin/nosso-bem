'use client'
 
import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

import { CardTypes, GameCard } from '@/components/gameCard'
import Particles from '@/components/particles'

import { ny } from '@/lib/utils'
import { useConfig } from '@/context/ConfigProvider'
import { OpenAiLogo } from '@phosphor-icons/react'
import { UserButton } from '@clerk/nextjs'

export const CardColors = {
    HOT: "#fb9a58",
    INDIVIDUAL: "#98b6d8",
    COUPLE: "#ea8684"
}
 
const Home = () => {
    const { config, setConfig } = useConfig();
    const [color, setColor] = useState('#ffffff');

    const [cardSelected, setCardSelected] = useState<CardTypes | null>(null);
    const [bgAnimation, setBgAnimation] = useState<CardTypes | ''>('');
    const [isCollapsing, setIsCollapsing] = useState(false);

    const [updateKey, setUpdateKey] = useState(0); // used to force the re-render of the UserButton component

    useEffect(() => {
        setColor(config.theme === 'dark' ? '#ffffff' : '#000000')
    }, [config.theme])

    const HandleChangeTheme = () => {
        setConfig(({
            theme: config.theme === 'dark' ? 'light' : 'dark'
        }));

        setUpdateKey(prevKey => prevKey + 1);
    }

    const HandleChangeAiUse = () => {
        setConfig({
            useAi: !config.useAi
        })

        setUpdateKey(prevKey => prevKey + 1);
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

    const ThemeIcon = config.theme === 'light' ? <Moon size={14} color='#000' /> : <Sun size={14} color='#000' />
    const AiIcon = <OpenAiLogo size={15} color={config.useAi ? '#0bb121' : '#000'} />
 
    return (
        <div 
            className={ny(
                "bg-background relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden md:shadow-xl",
                config.theme === 'dark' && 'dark',
            )}
        >
            <div key={updateKey} className='absolute top-2 left-2 flex items-center justify-center z-[1000]'>
                <UserButton appearance={{
                    elements: {
                        userButtonAvatarBox: {
                            width: '34px',
                            height: '34px',
                        }
                    },
                }}>
                    <UserButton.MenuItems>
                        <UserButton.Action label='Theme' labelIcon={ThemeIcon} onClick={HandleChangeTheme} />
                    </UserButton.MenuItems> 
                    <UserButton.MenuItems>
                        <UserButton.Action label='AI' labelIcon={AiIcon} onClick={HandleChangeAiUse} />
                    </UserButton.MenuItems>
                </UserButton>
            </div>
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
            <Particles
                className="absolute inset-0 z-[900]"
                quantity={300}
                ease={80}
                color={color}
                refresh
            />
        </div>
    )
}
 
export default Home