import { NextResponse, NextRequest } from 'next/server'
const nodemailer = require('nodemailer');

// Handles POST requests to /api

export async function POST(request:NextRequest) {
    const username = process.env.NEXT_PUBLIC_BURNER_USERNAME;
    const myEmail = process.env.NEXT_PUBLIC_PERSONAL_EMAIL;
    const { SMTP_EMAIL, SMTP_PASSWORD, SMTP_HOST, SMTP_PORT, SMTP_PROTOCOLE } = process.env;

    const formData = await request.formData()
    const email = formData.get('email');
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: true,
        auth: {
            user: SMTP_EMAIL,
            pass: "bjda wnbf nvcq msue"
        },
    });

    try {
        const testResult = await transporter.verify();
        console.log(testResult);
    } catch (e) {
        console.error(e);
    }

    try {

        const mail = await transporter.sendMail({
            from: SMTP_EMAIL,
            to: "j.matha@wesoft.fr",
            replyTo: email,
            subject: `Inscription à la newsletter, de: ${email}  `,
            html: `
            <p>Email : ${email} </p>
            `,
        })

        return NextResponse.json({ message: "L'email a été envoyé avec succès" })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ status: 500, message: "L'email n'a pas pu être envoyé" })
    }
}


// import {NextRequest, NextResponse} from 'next/server';
//
// export async function POST(request: NextRequest) {
//     const { PIPEDRIVE_API_KEY, PIPEDRIVE_API_URL, PERSON_ID } = process.env;
//
//     if (request.method === 'POST') {
//         const { email } = await request.json();
//         const data = {
//             title: email,
//             person_id: parseInt(PERSON_ID!)
//         };
//
//         try {
//             const response = await fetch(`${PIPEDRIVE_API_URL}?api_token=${PIPEDRIVE_API_KEY}`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Accept': 'application/json'
//                 },
//                 body: JSON.stringify(data)
//             });
//
//             // Log the response status and text for debugging
//             console.log('Response status:', response.status);
//             console.log('Response status text:', response.statusText);
//
//             if (!response.ok) {
//                 // Log the response body for debugging
//                 const errorBody = await response.text();
//                 console.log('Error body:', errorBody);
//
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }
//
//             const result = await response.json();
//             return NextResponse.json({ message: 'Success', data: result }, { status: 200 });
//         } catch (error) {
//             console.error('Error:', error);
//             return NextResponse.json({ message: 'Failed to subscribe', error: error }, { status: 500 });
//         }
//     } else {
//         return NextResponse.json({ message: `Method ${request.method} Not Allowed` }, { status: 405 });
//     }
// }
