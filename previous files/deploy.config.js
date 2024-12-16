module.exports = {
  apps: [
    {
      name: 'sol-showcase-frontend',
      script: 'serve',
      env: {
        PM2_SERVE_PATH: './frontend/dist',
        PM2_SERVE_PORT: 3000,
        PM2_SERVE_SPA: 'true',
        NODE_ENV: 'production',
      },
    },
    {
      name: 'sol-showcase-backend',
      script: './backend/dist/index.js',
      env: {
        NODE_ENV: 'production',
        PORT: 3001,
      },
    },
  ],
}; 