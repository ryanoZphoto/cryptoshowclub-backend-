import express from 'express';
import cors from 'cors';
import { tokenRouter } from './routes/tokenRoutes';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/tokens', tokenRouter);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

export default app; 