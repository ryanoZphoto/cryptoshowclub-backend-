#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}Setting up development environment...${NC}"

# Install global dependencies
echo -e "${GREEN}Installing global dependencies...${NC}"
npm install -g pm2 typescript ts-node nodemon

# Setup frontend
echo -e "${GREEN}Setting up frontend...${NC}"
cd frontend
npm install
cp .env.example .env
echo "REACT_APP_API_URL=http://localhost:5000" >> .env
cd ..

# Setup backend
echo -e "${GREEN}Setting up backend...${NC}"
cd backend
npm install
cp .env.example .env
echo "PORT=5000" >> .env
echo "MONGODB_URI=mongodb://localhost:27017/cryptoshow" >> .env
cd ..

# Setup git hooks
echo -e "${GREEN}Setting up git hooks...${NC}"
npm install husky --save-dev
npx husky install
npx husky add .husky/pre-commit "npm run lint && npm run test"

# Create development database
echo -e "${GREEN}Setting up development database...${NC}"
mkdir -p data/db

# Create development scripts
echo -e "${GREEN}Creating development scripts...${NC}"
cat > dev-start.sh << 'EOF'
#!/bin/bash
# Start frontend
cd frontend && npm start &
# Start backend
cd backend && npm run dev &
wait
EOF

chmod +x dev-start.sh

# Create README updates
echo -e "${GREEN}Updating documentation...${NC}"
cat >> README.md << 'EOF'

## Development Setup

1. Run ./setup-dev-environment.sh to set up your development environment
2. Run ./dev-start.sh to start both frontend and backend servers
3. Access the application at http://localhost:3000

## Development Workflow

1. Create a new branch for your feature: git checkout -b feature/your-feature-name
2. Make your changes and commit them: git commit -m "feat: your changes"
3. Push to your branch: git push origin feature/your-feature-name
4. Create a Pull Request on GitHub

## Deployment

1. Merge your PR to main branch
2. Run ./build.sh to create production build
3. Run ./deploy.sh to deploy to production

EOF

echo -e "${BLUE}Development environment setup complete!${NC}"
echo -e "${BLUE}Run ./dev-start.sh to start development servers${NC}" 