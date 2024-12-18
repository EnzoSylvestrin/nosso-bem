'use client'
 
import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

import Particles from '@/components/particles'
import { MagicContainer } from '@/components/magic-card'
import { Moon, Sun } from 'lucide-react'
import { GameCard } from '@/components/gameCard'
 
const Home = () => {
    const { theme, setTheme } = useTheme()
    const [color, setColor] = useState('#ffffff')
    
    useEffect(() => {
        setColor(theme === 'dark' ? '#ffffff' : '#000000')
    }, [theme])

    const HandleChangeTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
    }
 
    return (
        <div className={`bg-background relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden border md:shadow-xl ${theme === 'dark' ? 'dark' : ''}`}>
            <div className='absolute top-2 right-2 p-2 flex items-center justify-center rounded-full bg-black dark:bg-white z-[1000]' onClick={HandleChangeTheme}>
                {theme === 'light' ? (
                    <Moon size={24} color='#fff' />
                ): (
                    <Sun size={24} color='#000' />
                )}
            </div>
            <MagicContainer className="flex z-[999] w-[80%] flex-col gap-4 lg:h-[60%] lg:flex-row">
                <GameCard
                    type='HOT'
                    title="Picante"
                />
                <GameCard
                    type='INDIVIDUAL'
                    title="Individual"
                />
                <GameCard
                    type='COUPLE'
                    title="Casal"
                />
            </MagicContainer>
            <Particles
                className="absolute inset-0"
                quantity={100}
                ease={80}
                color={color}
                refresh
            />
        </div>
    )
}
 
export default Home