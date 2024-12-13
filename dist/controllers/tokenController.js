"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getActiveTokens = exports.createToken = void 0;
const Token_1 = __importDefault(require("@models/Token"));
const createToken = async (req, res) => {
    try {
        const tokenData = req.body;
        // Calculate listing expiry based on tier
        const now = new Date();
        const expiryHours = tokenData.listingTier === 1 ? 36 :
            tokenData.listingTier === 2 ? 24 : 12;
        const listingExpiry = new Date(now.getTime() + expiryHours * 60 * 60 * 1000);
        const token = new Token_1.default({
            ...tokenData,
            listingExpiry,
            symbol: tokenData.symbol.toUpperCase()
        });
        const savedToken = await token.save();
        res.status(201).json(savedToken.toObject());
    }
    catch (error) {
        if (error instanceof Error) {
            const mongoError = error;
            if (mongoError.code === 11000) {
                res.status(400).json({
                    error: 'Token with this contract address already exists'
                });
            }
            else {
                res.status(500).json({
                    error: 'Error creating token listing',
                    message: mongoError.message
                });
            }
        }
        else {
            res.status(500).json({
                error: 'An unknown error occurred'
            });
        }
    }
};
exports.createToken = createToken;
const getActiveTokens = async (_req, res) => {
    try {
        const tokens = await Token_1.default.find({
            listingExpiry: { $gt: new Date() }
        })
            .sort({ listingTier: 1, createdAt: -1 })
            .limit(8)
            .lean()
            .exec();
        res.json(tokens);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                error: 'Error fetching token listings',
                message: error.message
            });
        }
        else {
            res.status(500).json({
                error: 'An unknown error occurred'
            });
        }
    }
};
exports.getActiveTokens = getActiveTokens;
//# sourceMappingURL=tokenController.js.map