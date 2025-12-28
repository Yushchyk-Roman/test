import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// const REPO_NAME = 'test';

export default defineConfig({
  // base: `/${REPO_NAME}/`,
  
  plugins: [react()],
  base: '/test/',
})
