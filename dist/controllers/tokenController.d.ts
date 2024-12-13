import { Request, Response } from 'express';
interface TokenCreateRequest {
    name: string;
    symbol: string;
    contractAddress: string;
    price: number;
    marketCap: number;
    volume24h: number;
    holderCount: number;
    listingTier: number;
}
export declare const createToken: (req: Request<unknown, unknown, TokenCreateRequest>, res: Response) => Promise<void>;
export declare const getActiveTokens: (_req: Request, res: Response) => Promise<void>;
export {};
