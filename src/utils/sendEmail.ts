import nodemailer from 'nodemailer';

export async function sendMail({subject, body}: {
    subject: string,
    body: string
}) {
    const {SMTP_EMAIL, SMTP_PASSWORD, FROM_EMAIL, EMAIL} = process.env;
    const transport = nodemailer.createTransport({
        service: 'gmail',
        secure: true,
        disableFileAccess: true,
        disableUrlAccess: true,
        auth: {
            user: SMTP_EMAIL,
            pass: SMTP_PASSWORD,
        },
    });
    try {
        const testResult = await transport.verify();
        console.log(testResult);
    } catch (e) {
        console.error(e);
        return;
    }

    try {
        const sendResult = await transport.sendMail({
            from: FROM_EMAIL,
            to: EMAIL,
            subject,
            html: body,
            disableFileAccess: true,
            disableUrlAccess: true,
        })
        console.log(sendResult);
    } catch (e) {
        console.error(e)
    }
}
