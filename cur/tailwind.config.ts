import { join } from 'path'
import type { Config } from 'tailwindcss'
import { skeleton } from '@skeletonlabs/tw-plugin'

module.exports = {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}', join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')],
	mode: 'jit',
	theme: {
		extend: {
			fontFamily: {
				'inter': ['Inter', 'sans-serif'],
				'ibm': ['IBM Plex Mono' , 'sans-serif'],
				'roboto': ['Roboto Mono', 'sans-serif'],
				'ubuntu': ['Ubuntu Mono', 'sans-serif'],
			},
			animation: {
				fadeIn: 'fadeIn 1s ease-in-out',
			},
			keyframes: {
				fadeIn: {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' },
				},
			},
		},
	},
	plugins: [
		skeleton({
			themes: {
				preset: [
					{
						name: 'skeleton',
						enhancements: true,
					},
				],
			},
		}),
	],
} satisfies Config;
