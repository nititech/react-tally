import { defineConfig } from 'vite';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import dts from 'vite-plugin-dts';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
	plugins: [dts({ rollupTypes: true })],
	build: {
		lib: {
			entry: {
				index: resolve(__dirname, 'src/index.ts'),
			},
			name: 'ReactTally',
		},
		rollupOptions: {
			external: ['react', 'react-dom', 'react/jsx-runtime'],
			output: {
				globals: {
					'react-dom': 'ReactDom',
					react: 'React',
					'react/jsx-runtime': 'ReactJsxRuntime',
				},
			},
		},
		minify: false,
	},
});
