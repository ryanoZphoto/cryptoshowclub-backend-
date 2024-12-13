"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTokenData = void 0;
const validateContractAddress = (address) => {
    // Basic Solana address validation (should be 32-44 characters)
    return /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(address);
};
const validateTokenData = (req, res, next) => {
    const errors = [];
    const { name, symbol, contractAddress, price, marketCap, volume24h, holderCount, listingTier } = req.body;
    // Required field checks
    const requiredFields = {
        name: 'Token name',
        symbol: 'Token symbol',
        contractAddress: 'Contract address',
        price: 'Price',
        marketCap: 'Market cap',
        volume24h: '24h volume',
        holderCount: 'Holder count',
        listingTier: 'Listing tier'
    };
    Object.entries(requiredFields).forEach(([field, label]) => {
        if (req.body[field] === undefined) {
            errors.push({
                field,
                message: `${label} is required`
            });
        }
    });
    // If required fields are missing, return early
    if (errors.length > 0) {
        res.status(400).json({
            error: 'Validation failed',
            errors
        });
        return;
    }
    // String field validations
    if (name && (name.length < 2 || name.length > 50)) {
        errors.push({
            field: 'name',
            message: 'Name must be between 2 and 50 characters'
        });
    }
    if (symbol && (symbol.length < 1 || symbol.length > 10)) {
        errors.push({
            field: 'symbol',
            message: 'Symbol must be between 1 and 10 characters'
        });
    }
    if (contractAddress && !validateContractAddress(contractAddress)) {
        errors.push({
            field: 'contractAddress',
            message: 'Invalid Solana contract address format'
        });
    }
    // Numeric field validations
    const numericFields = {
        price,
        marketCap,
        volume24h,
        holderCount
    };
    Object.entries(numericFields).forEach(([field, value]) => {
        if (typeof value !== 'number' || value < 0) {
            errors.push({
                field,
                message: `${field} must be a positive number`
            });
        }
    });
    // Listing tier validation
    if (listingTier !== undefined && ![1, 2, 3].includes(Number(listingTier))) {
        errors.push({
            field: 'listingTier',
            message: 'Listing tier must be 1, 2, or 3'
        });
    }
    if (errors.length > 0) {
        res.status(400).json({
            error: 'Validation failed',
            errors
        });
        return;
    }
    next();
};
exports.validateTokenData = validateTokenData;
//# sourceMappingURL=validation.js.map