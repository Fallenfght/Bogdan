import { defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

export default defineConfig({
root: '.',
base: './',
plugins: [viteSingleFile()],
build: {
	outDir: '../',
	emptyOutDir: false,
	assetsInlineLimit: Infinity,
	rollupOptions: {
	output: {
		inlineDynamicImports: true,
	},
	},
},
})
