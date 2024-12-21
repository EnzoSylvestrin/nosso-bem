'use client';

import { ReactNode, useEffect, useState } from "react"

import { UserButton } from "@clerk/nextjs"

import { usePathname, useRouter } from "next/navigation";

import { OpenAiLogo } from "@phosphor-icons/react"
import { HomeIcon, Moon, Plus, Sun } from "lucide-react"

import { useConfig } from "@/context/ConfigProvider"

import { TabsList, TabsTrigger, Tabs } from "./ui/tabs";
import Particles from "./ui/particles"

import { ny } from "@/lib/utils"

type BaseLayoutProps = {
    children: ReactNode
}

export const BaseLayout = ({
    children
}: BaseLayoutProps) => {
    const router = useRouter();

    const pathname = usePathname();

    const { config, setConfig } = useConfig();
    const [color, setColor] = useState('#ffffff');

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

    const getDefaultTabValue = () => {
        if (pathname === '/') return 'home';
        if (pathname === '/question') return 'question';
        return 'default';
    };

    const handleChangeTab = (tabValue: string) => {
        if (tabValue === 'home') {
            router.push('/');
        } else if (tabValue === 'question') {
            router.push('/question');
        }
    }

    const tabValue = getDefaultTabValue();

    const ThemeIcon = config.theme === 'light' ? <Moon size={14} color='#000' /> : <Sun size={14} color='#000' />
    const AiIcon = <OpenAiLogo size={15} color={config.useAi ? '#0bb121' : '#000'} />

    const HomeIconColor = config.theme === 'light' ? '#fff' : '#000';
    const QuestionIconColor = config.theme === 'light' ? '#fff' : '#000';

    return (
        <div 
            className={ny(
                "px-4 bg-background relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden md:shadow-xl",
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
            <Tabs defaultValue={tabValue}>
                <div className='absolute top-2 right-2 z-[1000]'>
                    <TabsList className="bg-black dark:bg-white">
                        <TabsTrigger value="home" className="data-[state=active]:bg-gray-600 dark:data-[state=active]:bg-gray-300" onClick={() => handleChangeTab('home')}>
                            <HomeIcon size={20} color={HomeIconColor} />
                        </TabsTrigger>
                        <TabsTrigger value="question" className="data-[state=active]:bg-gray-600 dark:data-[state=active]:bg-gray-300" onClick={() => handleChangeTab('question')}>
                            <Plus size={20} color={QuestionIconColor} />
                        </TabsTrigger>
                    </TabsList>
                </div>
            </Tabs>
            {children}
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