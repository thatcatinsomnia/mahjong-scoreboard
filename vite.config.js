import vue from '@vitejs/plugin-vue'

const path = require('path');

export default {
  plugins: [vue()],
  resolve: {
    alias: {
      '/@': path.resolve(__dirname, './src')
    }
  },
  server: {
    port: 3333,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
        logLevel: 'debug'
      }
    }  
  } 
}