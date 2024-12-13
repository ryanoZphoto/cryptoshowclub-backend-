import Token from '@models/Token';

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
    await Token.deleteMany({});
  });

  it('should create a token with valid data', async () => {
    const token = await Token.create(validTokenData);
    expect(token.name).toBe(validTokenData.name);
    expect(token.symbol).toBe(validTokenData.symbol.toUpperCase());
    expect(token.contractAddress).toBe(validTokenData.contractAddress);
    expect(token.listingExpiry).toBeDefined();
  });

  it('should fail to create token without required fields', async () => {
    const invalidToken = new Token({});
    await expect(invalidToken.validate()).rejects.toThrow();
  });

  it('should enforce listing tier validation', async () => {
    const invalidToken = new Token({
      ...validTokenData,
      listingTier: 4
    });
    await expect(invalidToken.validate()).rejects.toThrow();
  });
}); 