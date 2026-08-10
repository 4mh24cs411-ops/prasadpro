import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true, // Listens on all network interfaces (localhost & 0.0.0.0)
    open: false
  }
});
