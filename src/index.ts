import mongoose from 'mongoose';
import app from './app';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || '';

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    
    // Start server after DB connection
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error details:', error);
    process.exit(1);
  });
 