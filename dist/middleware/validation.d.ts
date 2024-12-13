import { Request, Response, NextFunction } from 'express';
interface TokenRequest {
    name: string;
    symbol: string;
    contractAddress: string;
    price: number;
    marketCap: number;
    volume24h: number;
    holderCount: number;
    listingTier: number;
}
export declare const validateTokenData: (req: Request<unknown, unknown, Partial<TokenRequest>>, res: Response, next: NextFunction) => void;
export {};
