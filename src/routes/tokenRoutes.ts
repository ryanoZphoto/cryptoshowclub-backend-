import { Router } from 'express';
import { tokenController } from '../controllers/tokenController';

const router = Router();

// Test email route
router.post('/test-email', tokenController.testEmail);

// Token submission routes
router.post('/submit', tokenController.submitToken);
router.post('/validate', tokenController.validateToken);
router.get('/featured', tokenController.getFeaturedTokens);

// Token details route
router.get('/:tokenId', tokenController.getTokenDetails);

export { router as tokenRouter }; 