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
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
const crypto_1 = require("crypto");
const mailer_1 = require("./mailer");
const app = (0, express_1.default)();
app.use(express_1.default.static('../public'));
app.use(body_parser_1.default.urlencoded({ extended: true }));
const users_DB = [];
app.get('/', function (req, res) {
    res.sendFile(path_1.default.join(__dirname, '../public/form.html'));
});
app.post('/submit-form', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const token = (0, crypto_1.randomBytes)(16).toString('hex');
    const user = { email, token };
    users_DB.push(user);
    try {
        (0, mailer_1.sendEmail)(email, token);
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Failed to send email');
    }
}));
app.get('/confirm-email', (req, res) => {
    const { token } = req.query;
    const user = users_DB.find((user) => user.token === token);
    if (user) {
        res.status(200).json({ message: `Email confirmed for ${user.email}` });
    }
    else {
        res.status(400).json({ message: 'Invalid or expired token' });
    }
});
app.listen(3000, () => {
    console.log('Server started on port 3000');
});
