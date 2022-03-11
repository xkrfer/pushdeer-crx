import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from "path"
import copy from 'rollup-plugin-copy'
import Components from 'unplugin-vue-components/vite'
import {
    AntDesignVueResolver,
    VantResolver,
} from 'unplugin-vue-components/resolvers'

const resolve = (dest = './') => {
    return path.resolve(__dirname, dest)
}


const root = (dest = '') => {
    return resolve(`./src${dest}`)
}


// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), Components({
        resolvers: [
            AntDesignVueResolver(),
            VantResolver()
        ]
    })],
    resolve: {
        alias: {
            '@': root()
        }
    },
    root: root("/edge"),
    build: {
        emptyOutDir: true,
        minify: false,
        rollupOptions: {
            input: {
                popup: root("/edge/popup/popup.html"),
                options: root("/edge/options/options.html"),
                background: root("/edge/background/background.ts")
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
