"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_memory_server_1 = require("mongodb-memory-server");
const mongoose_1 = __importDefault(require("mongoose"));
let mongoServer;
beforeAll(async () => {
    mongoServer = await mongodb_memory_server_1.MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose_1.default.connect(mongoUri);
});
afterAll(async () => {
    if (mongoose_1.default.connection.db) {
        await mongoose_1.default.connection.db.dropDatabase();
    }
    await mongoose_1.default.disconnect();
    await mongoServer.stop();
});
afterEach(async () => {
    if (mongoose_1.default.connection.db) {
        const collections = await mongoose_1.default.connection.db.collections();
        for (const collection of collections) {
            await collection.deleteMany({});
        }
    }
});
//# sourceMappingURL=setup.js.map