
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				success: {
					DEFAULT: 'hsl(var(--success))',
					foreground: 'hsl(var(--success-foreground))'
				},
				warning: {
					DEFAULT: 'hsl(var(--warning))',
					foreground: 'hsl(var(--warning-foreground))'
				},
				info: {
					DEFAULT: 'hsl(var(--info))',
					foreground: 'hsl(var(--info-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// AgTech brand palette
				agri: {
					green: {
						50: 'hsl(142, 76%, 95%)',
						100: 'hsl(142, 76%, 90%)',
						200: 'hsl(142, 76%, 80%)',
						300: 'hsl(142, 76%, 70%)',
						400: 'hsl(142, 76%, 60%)',
						500: 'hsl(142, 76%, 50%)',
						600: 'hsl(142, 76%, 40%)',
						700: 'hsl(142, 76%, 30%)',
						800: 'hsl(142, 76%, 20%)',
						900: 'hsl(142, 76%, 10%)',
					},
					earth: {
						50: 'hsl(35, 100%, 95%)',
						100: 'hsl(35, 100%, 90%)',
						200: 'hsl(35, 100%, 84%)',
						300: 'hsl(35, 100%, 74%)',
						400: 'hsl(35, 100%, 64%)',
						500: 'hsl(35, 100%, 54%)',
						600: 'hsl(24, 100%, 50%)',
						700: 'hsl(24, 100%, 40%)',
						800: 'hsl(24, 100%, 30%)',
						900: 'hsl(24, 100%, 20%)',
					},
					tech: {
						50: 'hsl(217, 91%, 95%)',
						100: 'hsl(217, 91%, 90%)',
						200: 'hsl(217, 91%, 80%)',
						300: 'hsl(217, 91%, 70%)',
						400: 'hsl(217, 91%, 60%)',
						500: 'hsl(217, 91%, 50%)',
						600: 'hsl(217, 91%, 40%)',
						700: 'hsl(217, 91%, 30%)',
						800: 'hsl(217, 91%, 20%)',
						900: 'hsl(217, 91%, 10%)',
					}
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.6s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
