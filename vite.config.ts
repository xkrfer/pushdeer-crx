import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from "path"
import copy from 'rollup-plugin-copy'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {
    ElementPlusResolver
} from 'unplugin-vue-components/resolvers'

const resolve = (dest = './') => {
    return path.resolve(__dirname, dest)
}


const root = (dest = '') => {
    return resolve(`./src${dest}`)
}


// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        Components({
            resolvers: [
                ElementPlusResolver(),
            ]
        }),
        AutoImport({
            resolvers: [ElementPlusResolver()],
        })],
    resolve: {
        alias: {
            '@': root()
        }
    },
    root: root("/edge"),
    build: {
        emptyOutDir: true,
        rollupOptions: {
            input: {
                popup: root("/edge/popup/popup.html"),
                options: root("/edge/options/options.html"),
                background: root("/edge/background/background.ts"),
                content: root("/edge/content/content-script.ts")
            },
            output: {
                dir: "dist",
                entryFileNames: "[name]/[name].js"
            },
            plugins: [
                copy({
                    targets: [
                        {
                            src: [root("/logo.png"), root("/manifest.json")],
                            dest: resolve('./dist')
                        }
                    ]
                })
            ]
        }
    }
})
