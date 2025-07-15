import { defineConfig } from 'vite';
import { resolve } from 'path';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
    build: {
        outDir: 'dist',
        rollupOptions: {
            input: {
                content: resolve(__dirname, 'src/content.ts'),
                background: resolve(__dirname, 'src/background.ts')
            },
            output: {
                entryFileNames: '[name].js',
                chunkFileNames: '[name].js',
                assetFileNames: '[name].[ext]'
            }
        }
    },
    optimizeDeps: {
        exclude: ['vite-plugin-static-copy'] // 排除插件的预优化
    },
    plugins: [
        viteStaticCopy({
            targets: [
                { src: 'src/manifest.json', dest: '.' }
            ]
        })
    ]
});