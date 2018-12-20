import { createTransport } from 'nodemailer';
import { mailUser, mailPass } from './secrets';

export const transporter = createTransport({
    service: 'gmail',
    auth: {
        user: mailUser,
        pass: mailPass
    }
});