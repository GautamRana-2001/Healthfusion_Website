import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const body = await request.json();

    const name = String(body?.name || "").trim();
    const email = String(body?.email || "").trim();
    const mobile = String(body?.mobile || "").replace(/\D/g, "");
    const treatment = String(body?.treatment || "").trim();
    const date = String(body?.date || "").trim();
    const notes = String(body?.notes || "").trim();

    // Validation
    if (!name || !email || !mobile || !treatment || !date) {
      return Response.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json({ error: "Invalid email." }, { status: 400 });
    }

    if (mobile.length !== 10) {
      return Response.json(
        { error: "Mobile must be exactly 10 digits." },
        { status: 400 }
      );
    }

    // Date validation
    const selected = new Date(date);
    selected.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (Number.isNaN(selected.getTime())) {
      return Response.json({ error: "Invalid date." }, { status: 400 });
    }

    if (selected < today) {
      return Response.json(
        { error: "Date cannot be in the past." },
        { status: 400 }
      );
    }

    // Environment variables
    const user = process.env.EMAIL_USER;
    const pass = process.env.EMAIL_PASS;

    if (!user || !pass) {
      return Response.json(
        {
          error:
            "Email service is not configured. Set EMAIL_USER and EMAIL_PASS in environment variables.",
        },
        { status: 500 }
      );
    }

    // Optimized transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
      pool: true,
      maxConnections: 1,
      maxMessages: 100,
      rateLimit: 14,
    });

    const to = "healthfusion33@gmail.com";
    const subject = `New Appointment Request: ${name} (${treatment})`;

    // Professional HTML Email Template
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Appointment Request</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8f9fa;
          }
          .header {
            background: linear-gradient(135deg, #0077C8 0%, #00A651 100%);
            color: white;
            padding: 30px;
            text-align: center;
            border-radius: 10px 10px 0 0;
          }
          .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 600;
          }
          .content {
            background: white;
            padding: 30px;
            border-radius: 0 0 10px 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          }
          .field {
            margin-bottom: 20px;
            padding: 15px;
            background: #f8f9fa;
            border-radius: 8px;
            border-left: 4px solid #0077C8;
          }
          .field-label {
            font-weight: 600;
            color: #0077C8;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 5px;
          }
          .field-value {
            font-size: 16px;
            color: #333;
            margin: 0;
          }
          .footer {
            text-align: center;
            margin-top: 30px;
            padding: 20px;
            color: #666;
            font-size: 12px;
          }
          .urgent {
            border-left-color: #dc3545;
            background: #fff5f5;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>New Appointment Request</h1>
          <p>Healthfusion Multispeciality Clinic</p>
        </div>
        
        <div class="content">
          <div class="field">
            <div class="field-label">Patient Name</div>
            <div class="field-value">${name}</div>
          </div>
          
          <div class="field">
            <div class="field-label">Email Address</div>
            <div class="field-value">${email}</div>
          </div>
          
          <div class="field">
            <div class="field-label">Mobile Number</div>
            <div class="field-value">${mobile}</div>
          </div>
          
          <div class="field urgent">
            <div class="field-label">Treatment Requested</div>
            <div class="field-value">${treatment}</div>
          </div>
          
          <div class="field">
            <div class="field-label">Preferred Date</div>
            <div class="field-value">${new Date(date).toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</div>
          </div>
          
          ${notes ? `
          <div class="field">
            <div class="field-label">Additional Notes</div>
            <div class="field-value">${notes.replace(/\n/g, '<br>')}</div>
          </div>
          ` : ''}
          
          <div style="text-align: center; margin-top: 30px;">
            <p style="margin: 0; color: #666; font-size: 14px;">
              Please contact the patient as soon as possible to confirm the appointment.
            </p>
          </div>
        </div>
        
        <div class="footer">
          <p>This email was sent from Healthfusion Multispeciality Clinic Website</p>
          <p>Patient replied-to: ${email}</p>
        </div>
      </body>
      </html>
    `;

    // Plain text fallback
    const text = `
NEW APPOINTMENT REQUEST
======================

Patient Details:
- Name: ${name}
- Email: ${email}
- Mobile: ${mobile}
- Treatment: ${treatment}
- Preferred Date: ${new Date(date).toLocaleDateString('en-US', { 
  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
})}
${notes ? `- Notes: ${notes}` : ''}

Please contact the patient as soon as possible to confirm the appointment.
Reply-to: ${email}
    `.trim();

    // Send email
    await transporter.sendMail({
      from: `Healthfusion Website <${user}>`,
      to,
      replyTo: email,
      subject,
      html,
      text,
    });

    return Response.json({ ok: true });
  } catch (error) {
    console.error("Email sending error:", error);
    return Response.json(
      { error: "Failed to send email. Please try again." },
      { status: 500 }
    );
  }
}
