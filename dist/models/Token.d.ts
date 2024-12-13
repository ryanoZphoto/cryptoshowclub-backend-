import mongoose, { Document } from 'mongoose';
export interface IToken extends Document {
    name: string;
    symbol: string;
    contractAddress: string;
    price: number;
    marketCap: number;
    volume24h: number;
    holderCount: number;
    listingTier: number;
    listingExpiry: Date;
    createdAt: Date;
    updatedAt: Date;
}
declare const _default: mongoose.Model<IToken, {}, {}, {}, mongoose.Document<unknown, {}, IToken> & IToken & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
