"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("@/app");
const Token_1 = __importDefault(require("@models/Token"));
describe('Token API Tests', () => {
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
    describe('POST /api/tokens', () => {
        it('should create a new token listing', async () => {
            const response = await (0, supertest_1.default)(app_1.app)
                .post('/api/tokens')
                .send(validTokenData);
            expect(response.status).toBe(201);
            expect(response.body.name).toBe(validTokenData.name);
            expect(response.body.symbol).toBe(validTokenData.symbol.toUpperCase());
            expect(response.body.listingExpiry).toBeDefined();
        });
        it('should reject invalid token data', async () => {
            const response = await (0, supertest_1.default)(app_1.app)
                .post('/api/tokens')
                .send({});
            expect(response.status).toBe(400);
            expect(response.body.error).toBe('Validation failed');
        });
        it('should reject duplicate contract addresses', async () => {
            await Token_1.default.create(validTokenData);
            const response = await (0, supertest_1.default)(app_1.app)
                .post('/api/tokens')
                .send(validTokenData);
            expect(response.status).toBe(400);
            expect(response.body.error).toBe('Token with this contract address already exists');
        });
    });
    describe('GET /api/tokens/active', () => {
        it('should return active token listings', async () => {
            await Token_1.default.create(validTokenData);
            const response = await (0, supertest_1.default)(app_1.app)
                .get('/api/tokens/active');
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBe(1);
            expect(response.body[0].name).toBe(validTokenData.name);
        });
        it('should not return expired listings', async () => {
            const token = await Token_1.default.create(validTokenData);
            // Manually update the listingExpiry to be in the past
            await Token_1.default.findByIdAndUpdate(token._id, {
                listingExpiry: new Date(Date.now() - 24 * 60 * 60 * 1000) // 1 day ago
            });
            const response = await (0, supertest_1.default)(app_1.app)
                .get('/api/tokens/active');
            expect(response.status).toBe(200);
            expect(response.body.length).toBe(0);
        });
    });
});
//# sourceMappingURL=tokens.test.js.map