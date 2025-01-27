import nodemailer from 'nodemailer';

import envVar from './envVariables';

const transporter = nodemailer.createTransport({
    service: envVar.service,
    auth: {
        user: envVar.sendingEmail,
        pass:envVar.appPassword
    }
})


export function sendEmail (email: string, token: string) {

    const confirmationUrl = `http://localhost:3000/confirm-email?token=${token}`;

    const mailOptions = {
        from: envVar.sendingEmail,
        to: email,
        subject: 'Email Confirmation',
        html: `
            <h1>Welcome!</h1>
            <p>Please confirm your email address by clicking the link below:</p>
            <a href="${confirmationUrl}">Confirm Email</a>
        `
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            throw new Error(error.message);
        } else {
            console.log('Email sent:'+ info.response);
        }
    })
}