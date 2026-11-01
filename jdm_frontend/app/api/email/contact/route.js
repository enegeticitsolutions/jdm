import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    const data = await req.json();
    
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: process.env.SMTP_PORT || 587,
      secure: process.env.SMTP_PORT === '465',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.EMAIL_TO || 'info@jdmgroups.com',
      subject: `New Contact Query from ${data.name}`,
      text: `
New Contact Query Received:

Name: ${data.name}
Phone: ${data.phone}
Email: ${data.email}
Message:
${data.message}
      `
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });

  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json({ error: 'Error sending email' }, { status: 500 });
  }
}
