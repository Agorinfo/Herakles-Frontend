import nodemailer from 'nodemailer';

export async function sendMail({subject, body}: {
    subject: string,
    body: string
}) {
    const {SMTP_EMAIL, SMTP_PASSWORD, FROM_EMAIL, EMAIL, SMTP_HOST,SMTP_PORT,} = process.env;
    const transport = nodemailer.createTransport({
        service: 'gmail',
        secure: true,
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
            html: body
        })
        console.log(sendResult);
    } catch (e) {
        console.error(e)
    }
}