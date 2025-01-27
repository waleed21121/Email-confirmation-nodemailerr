"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = sendEmail;
const nodemailer_1 = __importDefault(require("nodemailer"));
const envVariables_1 = __importDefault(require("./envVariables"));
const transporter = nodemailer_1.default.createTransport({
    service: envVariables_1.default.service,
    auth: {
        user: envVariables_1.default.sendingEmail,
        pass: envVariables_1.default.appPassword
    }
});
function sendEmail(email, token) {
    const confirmationUrl = `http://localhost:3000/confirm-email?token=${token}`;
    const mailOptions = {
        from: envVariables_1.default.sendingEmail,
        to: email,
        subject: 'Email Confirmation',
        html: `
            <h1>Welcome!</h1>
            <p>Please confirm your email address by clicking the link below:</p>
            <a href="${confirmationUrl}">Confirm Email</a>
        `
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            throw new Error(error.message);
        }
        else {
            console.log('Email sent:' + info.response);
        }
    });
}
