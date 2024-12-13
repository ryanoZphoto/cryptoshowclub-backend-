import mongoose from 'mongoose';
import TokenModel from './models/Token';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI is not defined');
}

async function addSampleTokens() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI as string);
    console.log('Connected to MongoDB');

    // Clear existing tokens
    console.log('Clearing existing tokens...');
    await TokenModel.deleteMany({});
    console.log('Existing tokens cleared');

    // Add sample tokens
    const sampleTokens = [
      {
        name: "Sol Coin",
        symbol: "SOL",
        contractAddress: "HN7cABqLq46Es1jh92dQQisAq662SmxELLLsHHe4YWrH",
        price: 245.67,
        marketCap: 1000000,
        volume24h: 500000,
        holderCount: 1000,
        listingTier: 1
      },
      {
        name: "Luna Token",
        symbol: "LUNA",
        contractAddress: "2tWC4JAdL4AxEFJySziYJfsAnW2MHKRo98vbAPiRDSk8",
        price: 123.45,
        marketCap: 750000,
        volume24h: 250000,
        holderCount: 800,
        listingTier: 2
      },
      {
        name: "Star Chain",
        symbol: "STAR",
        contractAddress: "6uJkR6Ea5QUgJptbhF5PjYWHeCFV6zcRGTaTwofk9TtN",
        price: 56.78,
        marketCap: 500000,
        volume24h: 100000,
        holderCount: 500,
        listingTier: 3
      }
    ];

    console.log('Adding sample tokens...');
    const result = await TokenModel.insertMany(sampleTokens);
    console.log('Sample tokens added successfully:', result);

    // Verify tokens were added
    const count = await TokenModel.countDocuments();
    console.log(`Total tokens in database: ${count}`);

    const activeTokens = await TokenModel.find({ listingExpiry: { $gt: new Date() } });
    console.log('Active tokens:', activeTokens);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

addSampleTokens(); 