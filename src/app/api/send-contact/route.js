import {NextResponse} from "next/server";
const nodemailer = require("nodemailer");

function escapeHtml(value) {
    return String(value || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

export async function POST(request) {
    const {SMTP_EMAIL, SMTP_PASSWORD} = process.env;
    const formData = await request.formData();
    const name = formData.get("name");
    const firstname = formData.get("firstname");
    const company = formData.get("company");
    const email = formData.get("email");
    const tel = formData.get("tel");
    const object = formData.get("object");
    const message = formData.get("message");
    const safeName = escapeHtml(name);
    const safeFirstname = escapeHtml(firstname);
    const safeCompany = escapeHtml(company);
    const safeEmail = escapeHtml(email);
    const safeTel = escapeHtml(tel);
    const safeObject = escapeHtml(object);
    const safeMessage = escapeHtml(message);

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
            subject: `Demande en provenance d'edilogic.fr, de : ${safeFirstname} ${safeName}`,
            html: `
            <h1>${safeObject}</h1>
            <p>Nom : ${safeFirstname} ${safeName}</p>
            <p>Entreprise : ${safeCompany}</p>
            <p>Email : ${safeEmail}</p>
            <p>Telephone : ${safeTel}</p>
            <p>Message : ${safeMessage}</p>
            `,
            disableFileAccess: true,
            disableUrlAccess: true,
        });

        return NextResponse.json({message: "L'email a ete envoye avec succes"});
    } catch (error) {
        console.error(error);
        return NextResponse.json({message: "L'email n'a pas pu etre envoye"}, {status: 500});
    }
}
