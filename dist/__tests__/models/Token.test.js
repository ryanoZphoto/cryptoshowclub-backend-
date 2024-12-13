"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Token_1 = __importDefault(require("@models/Token"));
describe('Token Model Tests', () => {
    const validTokenData = {
        name: 'Test Token',
        symbol: 'TEST',
        contractAddress: '7RzVGiuVWkvL4VfVHdZfQF2Tri3Db9Jwh2gKBQCYi1h',
        price: 1.23,
        marketCap: 1000000,
        volume24h: 500000,
        holderCount: 1000,
        listingTier: 1
    };
    beforeEach(async () => {
        await Token_1.default.deleteMany({});
    });
    it('should create a token with valid data', async () => {
        const token = await Token_1.default.create(validTokenData);
        expect(token.name).toBe(validTokenData.name);
        expect(token.symbol).toBe(validTokenData.symbol.toUpperCase());
        expect(token.contractAddress).toBe(validTokenData.contractAddress);
        expect(token.listingExpiry).toBeDefined();
    });
    it('should fail to create token without required fields', async () => {
        const invalidToken = new Token_1.default({});
        await expect(invalidToken.validate()).rejects.toThrow();
    });
    it('should enforce listing tier validation', async () => {
        const invalidToken = new Token_1.default({
            ...validTokenData,
            listingTier: 4
        });
        await expect(invalidToken.validate()).rejects.toThrow();
    });
});
//# sourceMappingURL=Token.test.js.map