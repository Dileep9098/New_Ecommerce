// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(), tailwindcss(),],
// })


// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'

// export default defineConfig({
//   plugins: [react(), tailwindcss()],

//   css: {
//     transformer: "postcss", // 🔥 FORCE disable LightningCSS
//   },

//   build: {
//     cssMinify: "esbuild", // 🔥 IMPORTANT (override lightningcss)
//   }
// })


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],

  css: {
    lightningcss: {
      errorRecovery: true, // 🔥 THIS IS MAIN FIX
    },
  },

  build: {
    cssMinify: "lightningcss",
  }
})
