import {NextRequest, NextResponse} from "next/server";
const nodemailer = require("nodemailer");

function escapeHtml(value: FormDataEntryValue | null) {
    return String(value || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

export async function POST(request: NextRequest) {
    const {SMTP_EMAIL, SMTP_PASSWORD} = process.env;
    const formData = await request.formData();
    const email = formData.get("email");
    const escapedEmail = escapeHtml(email);

    const transporter = nodemailer.createTransport({
        service: "gmail",
        secure: true,
        disableFileAccess: true,
        disableUrlAccess: true,
        auth: {
            user: SMTP_EMAIL,
            pass: SMTP_PASSWORD,
        },
    });

    try {
        await transporter.verify();
        await transporter.sendMail({
            from: SMTP_EMAIL,
            to: "j.matha@wesoft.fr",
            replyTo: String(email || ""),
            subject: `Inscription a la newsletter, de: ${escapedEmail}`,
            html: `<p>Email : ${escapedEmail}</p>`,
            disableFileAccess: true,
            disableUrlAccess: true,
        });

        return NextResponse.json({message: "L'email a ete envoye avec succes"});
    } catch (error) {
        console.error(error);
        return NextResponse.json({message: "L'email n'a pas pu etre envoye"}, {status: 500});
    }
}
