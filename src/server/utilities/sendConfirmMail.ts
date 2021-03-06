import { transporter } from '../config/nodemailer';
import { mailName } from '../config/secrets';
import { IPollDocument } from '../models/Poll';
export function sendConfirmMail(userEmail: string, poll: IPollDocument, userType: string, token: string): void {
    let mailOptions = {
        from: mailName,
        to: userEmail,
        subject: 'Error - Something went wrong',
        html: '<p>Something went horribly wrong, please contact us.<p>'
    };
    const rootURL = process.env.ROOT_URL || "http://localhost:3000"
    switch (userType) {
        case 'createNewPoll':
            mailOptions = {
                from: mailName,
                to: userEmail,
                subject: `Your new Poll "${poll.title}" has been created!`,
                html: `<p>Click <a href="${rootURL}/poll/${poll.refId}?token=${token}">here</a> to get to your poll </p>` // plain text body
            };
            break;
        case 'becomeNewParticipant':
            mailOptions = {
                from: mailName,
                to: userEmail,
                subject: `You became a participant of "${poll.title}"!`,
                html: `<p>Click <a href="${rootURL}/poll/${poll.refId}?token=${token}">here</a> to get to the poll </p>` // plain text body
            };
            break;
        case 'resendExistingParticipant':
            mailOptions = {
                from: mailName,
                to: userEmail,
                subject: `Your access link for "${poll.title}"!`,
                html: `<p>Click <a href="${rootURL}/poll/${poll.refId}?token=${token}">here</a> to get to the poll </p>` // plain text body
            };
            break;
        case 'resendCreator':
            mailOptions = {
                from: mailName,
                to: userEmail,
                subject: `Your access link for "${poll.title}"!`,
                html: `<p>Click <a href="${rootURL}/poll/${poll.refId}?token=${token}">here</a> to get to the poll </p>` // plain text body
            };
            break;
        default:
            break;
    }
    //TODO: Change console logs to log to logfile
    transporter.sendMail(mailOptions, (err, info) => {
        if (err)
            console.log(err);
        else
            console.log(info);
    });
}
