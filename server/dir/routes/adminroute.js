"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const coursemodal_js_1 = require("../modal/coursemodal.js");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_js_1 = require("../config.js");
const jsonwt_js_1 = __importDefault(require("../middleware/jsonwt.js"));
const router = express_1.default.Router();
router.get('/me', jsonwt_js_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const admin = yield coursemodal_js_1.Admin.findOne({ username: req.user.username });
    if (admin) {
        res.json({
            username: admin.username,
            role: admin.role
        });
    }
}));
router.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const admin = yield coursemodal_js_1.Admin.findOne({ username });
    if (admin) {
        res.status(403).json({ message: 'Admin already exists' });
    }
    const newAdmin = new coursemodal_js_1.Admin({ username: username, password: password, role: 'admin' });
    yield newAdmin.save();
    const token = jsonwebtoken_1.default.sign({ username, role: 'admin' }, config_js_1.SECRET, { expiresIn: '1h' });
    res.json({ message: 'Admin created successfully', token });
}));
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.headers;
    const admin = yield coursemodal_js_1.Admin.findOne({ username, password });
    if (admin) {
        const token = jsonwebtoken_1.default.sign({ username, role: 'admin' }, config_js_1.SECRET, { expiresIn: '1h' });
        res.json({ message: 'Logged in successfully', token });
    }
    res.status(403).json({ message: 'Invalid username or password' });
}));
router.post('/course', jsonwt_js_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const course = new coursemodal_js_1.Course(req.body);
    yield course.save();
    res.json({ message: 'Course created successfully' });
}));
router.put('/courses/:courseId', jsonwt_js_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const course = yield coursemodal_js_1.Course.findByIdAndUpdate(req.params.courseId, req.body, { new: true });
    if (course) {
        res.json({ message: 'Course updated successfully' });
    }
    else {
        res.status(404).json({ message: 'Course not found' });
    }
}));
router.get('/courses/course/:courseId', jsonwt_js_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const course = yield coursemodal_js_1.Course.findById(req.params.courseId);
    if (course) {
        res.json({ course });
    }
    else {
        res.status(404).json({ message: 'Course not found' });
    }
}));
router.get('/courses', jsonwt_js_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const courses = yield coursemodal_js_1.Course.find({});
    res.json({ courses });
}));
exports.default = router;
