'use client'
 
import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

import Particles from '@/components/particles'
import { MagicContainer } from '@/components/magic-card'
import { Moon, Sun } from 'lucide-react'
import { CardTypes, GameCard } from '@/components/gameCard'
import { ny } from '@/lib/utils'

export const CardColors = {
    HOT: "hsl(0, 100%, 50%)",
    INDIVIDUAL: "hsl(216.18556701030928, 81.5126050420168%, 53.333333333333336%)",
    COUPLE: "hsl(287.79661016949154, 76.62337662337661%, 54.70588235294118%)"
}
 
const Home = () => {
    const { theme, setTheme } = useTheme()
    const [color, setColor] = useState('#ffffff')

    const [cardSelected, setCardSelected] = useState<CardTypes | null>(null);
    const [bgAnimation, setBgAnimation] = useState<CardTypes | ''>('');
    
    useEffect(() => {
        setColor(theme === 'dark' ? '#ffffff' : '#000000')
    }, [theme])

    const HandleChangeTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
    }

    const HandleCardClick = (type: CardTypes) => {
        setCardSelected(type)
        setBgAnimation(type)
        setTimeout(() => setBgAnimation(''), 1000)
    }
 
    return (
        <div 
            className={ny(
                "bg-background relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden border md:shadow-xl",
                theme === 'dark' && 'dark'
            )}
        >
            <div className='absolute top-2 right-2 p-2 flex items-center justify-center rounded-full bg-black dark:bg-white z-[1000]' onClick={HandleChangeTheme}>
                {theme === 'light' ? (
                    <Moon size={24} color='#fff' />
                ): (
                    <Sun size={24} color='#000' />
                )}
            </div>
            <MagicContainer className="flex z-[999] w-[80%] flex-col gap-6 lg:h-[60%] lg:flex-row">
                <GameCard
                    type='HOT'
                    title="Picante"
                    onClick={() => HandleCardClick('HOT')}
                />
                <GameCard
                    type='INDIVIDUAL'
                    title="Individual"
                    onClick={() => HandleCardClick('INDIVIDUAL')}
                />
                <GameCard
                    type='COUPLE'
                    title="Casal"
                    onClick={() => HandleCardClick('COUPLE')}
                />
            </MagicContainer>
            {bgAnimation && (
                <div
                    className="absolute inset-0 z-[-1] bg-animation"
                    style={{ backgroundColor: CardColors[bgAnimation] }}
                />
            )}
            {   
                !cardSelected &&
                <Particles
                    className="absolute inset-0"
                    quantity={100}
                    ease={80}
                    color={color}
                    refresh
                />
            }
        </div>
    )
}
 
export default Home