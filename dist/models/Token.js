"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const tokenSchema = new mongoose_1.Schema({
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
            validator: function (v) {
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
tokenSchema.pre('validate', function (next) {
    if (!this.listingExpiry || this.isModified('listingTier')) {
        const now = new Date();
        const expiryHours = this.listingTier === 1 ? 36 :
            this.listingTier === 2 ? 24 : 12;
        this.listingExpiry = new Date(now.getTime() + expiryHours * 60 * 60 * 1000);
    }
    next();
});
exports.default = mongoose_1.default.model('Token', tokenSchema);
//# sourceMappingURL=Token.js.map