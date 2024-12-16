# SOL Showcase Platform

A premium showcase platform for Solana tokens, featuring an exclusive listing system with premium and standard tiers.

## Features

- Exclusive 8-token showcase system
- Premium and Standard listing tiers
- Real-time token statistics
- Solana wallet integration
- Email notifications for new listings
- Responsive design for all devices

## Tech Stack

### Frontend
- React with TypeScript
- Chakra UI for components
- Solana Web3.js for wallet integration
- React Router for navigation
- Axios for API requests

### Backend
- Node.js with Express
- TypeScript for type safety
- MongoDB for data storage
- SendGrid for email notifications
- JWT for authentication

## Prerequisites

- Node.js 16+
- MongoDB 5+
- SendGrid API Key
- Solana Wallet (Phantom recommended)

## Development Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/sol-showcase.git
cd sol-showcase
```

2. Install dependencies:
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Set up environment variables:

Backend (.env.development):
```env
PORT=3001
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/sol-showcase
SENDGRID_API_KEY=your_sendgrid_key
ADMIN_EMAIL=admin@cryptoshowclub.com
FROM_EMAIL=admin@cryptoshowclub.com
NODE_TLS_REJECT_UNAUTHORIZED=0
ALLOWED_ORIGINS=http://localhost:3000
```

Frontend (.env.development):
```env
REACT_APP_API_URL=http://localhost:3001
REACT_APP_MAX_TOKENS=8
REACT_APP_MAX_PREMIUM_TOKENS=4
REACT_APP_MAX_STANDARD_TOKENS=4
REACT_APP_NETWORK=devnet
```

4. Start the development servers:

Backend:
```bash
cd backend
npm run dev
```

Frontend:
```bash
cd frontend
npm start
```

## Production Deployment

1. Set up environment variables:

Backend (.env.production):
```env
PORT=3001
NODE_ENV=production
MONGODB_URI=your_mongodb_uri
SENDGRID_API_KEY=your_sendgrid_key
ADMIN_EMAIL=admin@cryptoshowclub.com
FROM_EMAIL=admin@cryptoshowclub.com
NODE_TLS_REJECT_UNAUTHORIZED=1
ALLOWED_ORIGINS=https://cryptoshowclub.com,https://www.cryptoshowclub.com
```

Frontend (.env.production):
```env
REACT_APP_API_URL=https://api.cryptoshowclub.com
REACT_APP_MAX_TOKENS=8
REACT_APP_MAX_PREMIUM_TOKENS=4
REACT_APP_MAX_STANDARD_TOKENS=4
REACT_APP_NETWORK=mainnet-beta
```

2. Build the applications:

Backend:
```bash
cd backend
npm run build
```

Frontend:
```bash
cd frontend
npm run build
```

3. Deploy using PM2:

```bash
# Install PM2 globally
npm install -g pm2

# Start backend
cd backend
pm2 start npm --name "sol-showcase-api" -- start

# Serve frontend build with nginx or your preferred web server
```

## API Documentation

### Token Endpoints

#### Submit Token
```http
POST /api/tokens/submit
```

Request body:
```json
{
  "name": "Token Name",
  "symbol": "TKN",
  "contractAddress": "solana_contract_address",
  "price": 1.23,
  "marketCap": 1000000,
  "volume24h": 500000,
  "holderCount": 1000,
  "listingTier": 1
}
```

#### Get Featured Tokens
```http
GET /api/tokens/featured
```

Response:
```json
{
  "premium": [...],
  "standard": [...],
  "total": 8
}
```

#### Get Token Details
```http
GET /api/tokens/:tokenId
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email admin@cryptoshowclub.com or open an issue in the repository. 