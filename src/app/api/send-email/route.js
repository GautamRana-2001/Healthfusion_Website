import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const body = await request.json();

    // Parse form data
    const name = String(body?.name || "").trim();
    const email = String(body?.email || "").trim();
    const phone = String(body?.phone || "").trim();
    const treatment = String(body?.treatment || "").trim();
    const message = String(body?.message || "").trim();
    const date = String(body?.date || "").trim();

    // Validate required fields
    if (!name || !email || !phone || !treatment) {
      return Response.json(
        { success: false, message: "Please fill in all required fields" },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json(
        { success: false, message: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    // Get email credentials from environment variables
    const user = process.env.EMAIL_USER;
    const pass = process.env.EMAIL_PASS;

    if (!user || !pass) {
      return Response.json(
        { success: false, message: "Email service configuration error" },
        { status: 500 }
      );
    }

    // Optimized Gmail transporter with secure configuration
    // Note: Use Google App Password, not Gmail password (Enable 2-Step Verification)
    const transporter = nodemailer.createTransporter({
      service: "gmail",
      auth: { 
        user, 
        pass 
      },
      secure: true,
      tls: {
        rejectUnauthorized: false
      }
    });

    // Professional HTML email template for admin
    const adminHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Appointment Request - HealthFusion Clinic</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f5f5f5; }
          .container { max-width: 600px; margin: 0 auto; background-color: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
          .header { background-color: #0077C8; color: white; padding: 30px; text-align: center; }
          .header h1 { margin: 0; font-size: 24px; font-weight: 300; }
          .content { padding: 40px 30px; }
          .info-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          .info-table td { padding: 12px; border-bottom: 1px solid #eee; }
          .info-table td:first-child { font-weight: bold; color: #333; width: 40%; }
          .message-box { background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0; }
          .footer { background-color: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Appointment Request</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px;">HealthFusion Clinic</p>
          </div>
          
          <div class="content">
            <table class="info-table">
              <tr>
                <td>Patient Name:</td>
                <td>${name}</td>
              </tr>
              <tr>
                <td>Email Address:</td>
                <td>${email}</td>
              </tr>
              <tr>
                <td>Phone Number:</td>
                <td>${phone}</td>
              </tr>
              <tr>
                <td>Selected Treatment:</td>
                <td>${treatment}</td>
              </tr>
              ${date ? `
              <tr>
                <td>Preferred Date:</td>
                <td>${date}</td>
              </tr>
              ` : ''}
            </table>
            
            ${message ? `
            <div class="message-box">
              <h3 style="margin-top: 0; color: #0077C8;">Patient Message:</h3>
              <p style="margin: 10px 0; line-height: 1.6;">${message}</p>
            </div>
            ` : ''}
          </div>
          
          <div class="footer">
            <p>This appointment request was submitted from the HealthFusion Clinic website.</p>
            <p style="margin-top: 10px;">Please respond to the patient as soon as possible.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Simple confirmation email for user
    const userHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Appointment Received - HealthFusion Clinic</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f5f5f5; }
          .container { max-width: 500px; margin: 0 auto; background-color: white; border-radius: 8px; padding: 40px; text-align: center; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
          .header { color: #0077C8; margin-bottom: 20px; }
          .message { color: #333; line-height: 1.6; margin: 20px 0; }
          .footer { color: #666; font-size: 14px; margin-top: 30px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0; font-size: 24px;">Thank You!</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px;">HealthFusion Clinic</p>
          </div>
          
          <div class="message">
            <p>Thank you for contacting HealthFusion Clinic.</p>
            <p>We have received your appointment request for <strong>${treatment}</strong>.</p>
            <p>Our team will contact you shortly to confirm your appointment.</p>
          </div>
          
          <div class="footer">
            <p>If you have any questions, please call us at: <a href="tel:9270216369" style="color: #0077C8;">92702 16369</a></p>
            <p style="margin-top: 10px;">© 2024 HealthFusion Clinic. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send email to admin
    const adminMailOptions = {
      from: user,
      to: "healthfusion.live@gmail.com",
      subject: `New Appointment Request - ${name} (${treatment})`,
      html: adminHtml,
    };

    // Send confirmation email to user
    const userMailOptions = {
      from: user,
      to: email,
      subject: "Appointment Received - HealthFusion Clinic",
      html: userHtml,
    };

    // Send both emails
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);

    return Response.json(
      { 
        success: true, 
        message: "Appointment request sent successfully! We'll contact you soon." 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Email send error:", error);
    return Response.json(
      { 
        success: false, 
        message: "Failed to send appointment request. Please try again." 
      },
      { status: 500 }
    );
  }
}
