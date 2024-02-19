"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const userroute_js_1 = __importDefault(require("./routes/userroute.js"));
const adminroute_js_1 = __importDefault(require("./routes/adminroute.js"));
const config_js_1 = require("./config.js");
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173'
}));
app.use('/user', userroute_js_1.default);
app.use('/admin', adminroute_js_1.default);
mongoose_1.default.connect(config_js_1.mongoURL).then(() => {
    console.log('db connected');
});
app.listen(config_js_1.PORT, () => console.log('server running on port ' + config_js_1.PORT));
