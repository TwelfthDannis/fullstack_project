import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        manifest: true,
        emptyOutDir: "true",
        outDir: "../../main/resources/static",
        rollupOptions: {
            input: "/index.html",
        }
    },
})