import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';


export default defineConfig({

  plugins: [react()],
  base: '/EsportsDash-GameConfigCreator/',
});

// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   base: '/EsportsDash-GameConfigCreator/',
//   // base: '/',
//   plugins: [react()],
//   build: {
//     rollupOptions: {
//       external: ['bootstrap']
//     }
//   }
// })