"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const tokenRoutes_1 = require("@routes/tokenRoutes");
exports.app = (0, express_1.default)();
// Middleware
exports.app.use((0, cors_1.default)());
exports.app.use(express_1.default.json());
// Health check
exports.app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
});
// Routes
exports.app.use('/api/tokens', tokenRoutes_1.tokenRouter);
//# sourceMappingURL=app.js.map