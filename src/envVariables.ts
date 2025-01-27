import dotenv from 'dotenv';

// Load environment variables from .env file

dotenv.config();

const sendingEmail:string = process.env.SENDER_EMAIL || '';
const appPassword:string = process.env.APP_PASSWORD || '';
const service:string = process.env.SERVICE || 'gmail'; 

export default{ 
    sendingEmail,
    appPassword,
    service
};