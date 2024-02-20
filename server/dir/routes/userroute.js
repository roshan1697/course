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
    const user = yield coursemodal_js_1.User.findOne({ username: req.headers['user'] });
    if (user) {
        res.json({
            username: user.username,
            role: user.role
        });
    }
    res.status(403).json({ username: null });
}));
router.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield coursemodal_js_1.User.findOne({ username });
    if (user) {
        res.status(403).json({ message: 'user already exists' });
    }
    const newUser = new coursemodal_js_1.User({ username, password, role: 'user' });
    yield newUser.save();
    const token = jsonwebtoken_1.default.sign({ username, role: 'user' }, config_js_1.SECRET, { expiresIn: '1h' });
    res.json({ message: 'user created successfully', token });
}));
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield coursemodal_js_1.User.findOne({ username, password });
    if (user) {
        const token = jsonwebtoken_1.default.sign({ user, role: 'user' }, config_js_1.SECRET, { expiresIn: '1h' });
        res.json({ message: 'logged in successfully', token });
    }
    res.status(403).json({ message: ' Invalid username or password' });
}));
router.get('/courses', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const course = yield coursemodal_js_1.Course.find({ published: true });
    res.json({ course });
}));
router.post('/courses/:courseId', jsonwt_js_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const course = yield coursemodal_js_1.Course.findById(req.params.courseId);
    if (course) {
        const user = yield coursemodal_js_1.User.findOne({ username: req.headers['user'] });
        if (user) {
            user.purchasedCourses.push(course);
            yield user.save();
            res.json({ message: 'course purchased successfully' });
        }
        res.status(403).json({ message: ' user not found' });
    }
    res.status(404).json({ message: 'course not found' });
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
router.get('/purchasedcourses', jsonwt_js_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield coursemodal_js_1.User.findOne({ username: req.headers['user'] }).populate('purchasedCourses');
    if (user) {
        res.json({ purchasedCourses: user.purchasedCourses || [] });
    }
    res.status(403).json({ message: ' user not found' });
}));
exports.default = router;
