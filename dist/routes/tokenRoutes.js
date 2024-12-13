"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenRouter = void 0;
const express_1 = require("express");
const tokenController_1 = require("@controllers/tokenController");
const validation_1 = require("@middleware/validation");
exports.tokenRouter = (0, express_1.Router)();
exports.tokenRouter.post('/', validation_1.validateTokenData, tokenController_1.createToken);
exports.tokenRouter.get('/active', tokenController_1.getActiveTokens);
//# sourceMappingURL=tokenRoutes.js.map