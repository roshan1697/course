"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_js_1 = require("../config.js");
const authJwt = (req, res, next) => {
    const authheader = req.headers.authorization;
    if (authheader) {
        const token = authheader.split(' ')[1];
        jsonwebtoken_1.default.verify(token, config_js_1.SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            if (!user) {
                return res.sendStatus(403);
            }
            if (typeof user === 'string') {
                return res.sendStatus(403);
            }
            req.headers['user'] = user.username;
            next();
        });
    }
    else {
        res.sendStatus(401);
    }
};
exports.default = authJwt;
