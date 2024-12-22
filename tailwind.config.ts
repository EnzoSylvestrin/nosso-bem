import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['var(--font-montserrat-mono)'],
                mono: ['var(--font-tannimbus-mono)'],
            },
            colors: {
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))'
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))'
                },
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))'
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))'
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))'
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))'
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))'
                },
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                chart: {
                    '1': 'hsl(var(--chart-1))',
                    '2': 'hsl(var(--chart-2))',
                    '3': 'hsl(var(--chart-3))',
                    '4': 'hsl(var(--chart-4))',
                    '5': 'hsl(var(--chart-5))'
                }
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            },
            animation: {
                expand: 'expand 0.6s ease-out forwards',
                collapse: 'collapse 0.6s ease-out forwards',
            },
            keyframes: {
                expand: {
                    '0%': { transform: 'scale(0)', opacity: '1' },
                    '100%': { transform: 'scale(25)', opacity: '1' },
                },
                collapse: {
                    '0%': { transform: 'scale(50)', opacity: '1' },
                    '100%': { transform: 'scale(0)', opacity: '1' },
                },
                toCenter: {
                    '0%': { transform: 'translate(0, 0)' },
                    '100%': { transform: 'translate(-50%, -50%) scale(1.2)' },
                },
                fromCenter: {
                    '0%': { transform: 'translate(-50%, -50%) scale(1.2)' },
                    '100%': { transform: 'translate(0, 0)' },
                },
            },
            transform: {
                'preserve-3d': 'preserve-3d',
                'backface-hidden': 'hidden',
                toCenter: 'toCenter 0.6s ease-out forwards',
                fromCenter: 'fromCenter 0.6s ease-out forwards',
            }
        }
    },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
