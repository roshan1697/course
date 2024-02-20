"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.Admin = exports.Course = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const courseSchema = new mongoose_1.default.Schema({
    title: String,
    description: String,
    price: Number,
    imagelink: String,
    published: Boolean
});
const adminSchema = new mongoose_1.default.Schema({
    username: String,
    password: String,
    role: String
});
const userSchema = new mongoose_1.default.Schema({
    username: String,
    password: String,
    role: String,
    purchasedCourses: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Course' }]
});
exports.Course = mongoose_1.default.model('Course', courseSchema);
exports.Admin = mongoose_1.default.model('Admin', adminSchema);
exports.User = mongoose_1.default.model('User', userSchema);
