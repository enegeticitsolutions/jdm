import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    const formData = await req.formData();
    
    const name = formData.get('name');
    const phone = formData.get('phone');
    const email = formData.get('email');
    const city = formData.get('city');
    const state = formData.get('state');
    const jobTitle = formData.get('jobTitle');
    const department = formData.get('department');
    const resume = formData.get('resume'); // File object

    let attachments = [];
    if (resume && typeof resume.arrayBuffer === 'function') {
      const buffer = Buffer.from(await resume.arrayBuffer());
      attachments.push({
        filename: resume.name,
        content: buffer
      });
    }

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
      subject: `New Job Application: ${jobTitle} - ${name}`,
      text: `
New Job Application Received:

Name: ${name}
Phone: ${phone}
Email: ${email}
City: ${city}
State: ${state}
Job Title: ${jobTitle}
Department: ${department}
      `,
      attachments
    };

    // Send email asynchronously in the background so it doesn't block the UI
    transporter.sendMail(mailOptions).catch(err => console.error('Background email error:', err));
    
    return NextResponse.json({ message: 'Email is sending in background' }, { status: 200 });

  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json({ error: 'Error sending email' }, { status: 500 });
  }
}
