"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from .env file
dotenv_1.default.config();
const sendingEmail = process.env.SENDER_EMAIL || '';
const appPassword = process.env.APP_PASSWORD || '';
const service = process.env.SERVICE || 'gmail';
exports.default = {
    sendingEmail,
    appPassword,
    service
};
