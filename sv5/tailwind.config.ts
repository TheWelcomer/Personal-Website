import type { Config } from 'tailwindcss';
import { fileURLToPath } from 'url';
import { resolve } from 'path';

// For ESM compatibility
const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default {
	// Content paths
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		// Use resolve for Skeleton paths
		resolve(__dirname, 'node_modules/@skeletonlabs/skeleton-svelte/dist/**/*.{html,js,svelte,ts}')
	],

	// Dark mode configuration
	darkMode: ['class', '[data-theme="dark"]'],

	theme: {
		extend: {
			fontFamily: {
				'inter': ['Inter', 'sans-serif'],
				'ibm': ['IBM Plex Mono', 'monospace'],
				'ibm-bold': ['IBM Plex Mono Bold', 'monospace'],
				'roboto': ['Roboto Mono', 'monospace'],
				'ubuntu': ['Ubuntu Mono', 'monospace'], // Note: Changed from 'Ubuntu Sans Mono' to match CSS
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
			maxHeight: {
				'86.2vh': '86.2vh',
			},
			colors: {
				'maroon': '#9d2235',
			},
		}
	},

	// V4 Plugins array - add Skeleton plugin if you're using it
	plugins: [
		// If you have a Skeleton plugin, add it here
		// For example: import('@skeletonlabs/tailwind-plugin')
	],
} satisfies Config;