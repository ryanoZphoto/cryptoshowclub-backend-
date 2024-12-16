module.exports = {
  apps: [
    {
      name: 'cryptoshow-backend',
      script: './backend/dist/index.js',
      env_production: {
        NODE_ENV: 'production',
        PORT: 3001
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
}; 