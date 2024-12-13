"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = require("./app");
dotenv_1.default.config();
const port = process.env.PORT || 3001;
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/sol-showcase';
// Connect to MongoDB
mongoose_1.default.connect(mongoURI)
    .then(() => {
    console.log('Connected to MongoDB');
    // Start server only after successful database connection
    app_1.app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
})
    .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
});
app_1.app.use((0, cors_1.default)());
app_1.app.use(express_1.default.json());
app_1.app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
});
//# sourceMappingURL=index.js.map