// import { defineConfig } from 'vite';
// import laravel from 'laravel-vite-plugin';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//     plugins: [
//         laravel({
//              input: ['resources/css/app.css', 'resources/js/app.jsx'],
//             refresh: true,
//         }),
//         react(),
//     ],
//      build: {
//         outDir: 'public/build',
//         emptyOutDir: true,
//     },
// });

import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    base: '/paduraksa/build/', // <-- semua asset mengarah ke subfolder ptsp/build
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.jsx'], // sesuaikan dengan entry point
            refresh: true,
        }),
        react(),
    ],
    build: {
        outDir: 'public/paduraksa/build', // folder tujuan build
        emptyOutDir: true,
        rollupOptions: {
            output: {
                assetFileNames: 'assets/[name]-[hash][extname]',
                chunkFileNames: 'assets/[name]-[hash].js',
                entryFileNames: 'assets/[name]-[hash].js',
            }
        }
    }
});
