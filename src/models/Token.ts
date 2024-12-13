import mongoose, { Document, Schema } from 'mongoose';

export interface IToken extends Document {
  name: string;
  symbol: string;
  contractAddress: string;
  price: number;
  priceChange24h: number;
  marketCap: number;
  volume24h: number;
  holderCount: number;
  listingTier: number;
  listingExpiry: Date;
  createdAt: Date;
  updatedAt: Date;
}

const tokenSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Token name is required'],
    minlength: [2, 'Token name must be at least 2 characters'],
    maxlength: [50, 'Token name cannot exceed 50 characters']
  },
  symbol: {
    type: String,
    required: [true, 'Token symbol is required'],
    minlength: [1, 'Token symbol must be at least 1 character'],
    maxlength: [10, 'Token symbol cannot exceed 10 characters'],
    uppercase: true
  },
  contractAddress: {
    type: String,
    required: [true, 'Contract address is required'],
    unique: true,
    validate: {
      validator: function(v: string) {
        return /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(v);
      },
      message: 'Invalid Solana contract address format'
    }
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price must be positive']
  },
  priceChange24h: {
    type: Number,
    default: 0
  },
  marketCap: {
    type: Number,
    required: [true, 'Market cap is required'],
    min: [0, 'Market cap must be positive']
  },
  volume24h: {
    type: Number,
    required: [true, 'Volume is required'],
    min: [0, 'Volume must be positive']
  },
  holderCount: {
    type: Number,
    required: [true, 'Holder count is required'],
    min: [0, 'Holder count must be positive']
  },
  listingTier: {
    type: Number,
    required: [true, 'Listing tier is required'],
    enum: {
      values: [1, 2, 3],
      message: 'Listing tier must be 1, 2, or 3'
    }
  },
  listingExpiry: {
    type: Date
  }
}, {
  timestamps: true
});

// Pre-validate middleware to set listingExpiry based on tier
tokenSchema.pre('validate', function(next) {
  if (!this.listingExpiry || this.isModified('listingTier')) {
    const now = new Date();
    const expiryHours = this.listingTier === 1 ? 36 : 
                       this.listingTier === 2 ? 24 : 12;
    this.listingExpiry = new Date(now.getTime() + expiryHours * 60 * 60 * 1000);
  }
  next();
});

export default mongoose.model<IToken>('Token', tokenSchema); 