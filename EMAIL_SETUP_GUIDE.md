  # Email System Setup Guide - HealthFusion Clinic

## 📧 Overview
Optimized Nodemailer system with Gmail 2-Step Verification support for HealthFusion Clinic appointment system.

## 🔐 Step 1: Gmail 2-Step Verification Setup

### Enable 2-Step Verification:
1. Go to [Google Account Settings](https://myaccount.google.com/security)
2. Enable **2-Step Verification**
3. Follow the setup process

### Generate App Password:
1. Go to [App Passwords](https://myaccount.google.com/apppasswords)
2. Select **Mail** app
3. Enter device name: "HealthFusion Clinic"
4. Copy the generated 16-character password
5. **Important**: Use this App Password, NOT your Gmail password

## ⚙️ Step 2: Environment Configuration

Update `.env.local` file:
```env
EMAIL_USER=healthfusion.live@gmail.com
EMAIL_PASS=YOUR_GENERATED_APP_PASSWORD_HERE
```

## 📨 Step 3: API Route Features

### New Endpoint: `/api/send-email`

#### Features:
- ✅ Secure Gmail SMTP with TLS
- ✅ Professional HTML email templates
- ✅ Dual email sending (admin + user confirmation)
- ✅ Input validation and sanitization
- ✅ Error handling with proper responses
- ✅ Production-ready (Vercel compatible)

#### Accepted Fields:
```json
{
  "name": "Patient Name",
  "email": "patient@email.com",
  "phone": "9270216369",
  "treatment": "Treatment Name",
  "date": "2024-01-15",
  "message": "Optional message"
}
```

## 🎨 Step 4: Email Templates

### Admin Email:
- **Subject**: `New Appointment Request - Patient Name (Treatment)`
- **Design**: Professional clinical theme
- **Colors**: White + Blue (#0077C8)
- **Layout**: Table-based patient details
- **Includes**: All form fields + message

### User Confirmation:
- **Subject**: `Appointment Received - HealthFusion Clinic`
- **Design**: Clean, centered layout
- **Content**: Thank you message + next steps
- **Contact**: Clinic phone number included

## 🔧 Step 5: Frontend Integration

### Form Updates:
- ✅ Connected to `/api/send-email` endpoint
- ✅ Field mapping: `mobile` → `phone`, `notes` → `message`
- ✅ 10-second timeout with AbortController
- ✅ Loading states and error handling
- ✅ Success message display

### API Response Format:
```json
// Success
{ "success": true, "message": "Appointment request sent successfully!" }

// Error
{ "success": false, "message": "Error description" }
```

## 🚀 Step 6: Production Deployment

### Vercel Environment Variables:
1. Go to Vercel Dashboard → Project Settings
2. Add Environment Variables:
   - `EMAIL_USER=healthfusion.live@gmail.com`
   - `EMAIL_PASS=your_app_password`
3. Redeploy application

### Security Notes:
- ✅ No hardcoded credentials in code
- ✅ Uses environment variables
- ✅ App Password (not Gmail password)
- ✅ HTTPS secure connection
- ✅ Input sanitization

## 🐛 Step 7: Troubleshooting

### Common Issues:

#### "Email service configuration error":
- Check `.env.local` file exists
- Verify environment variables are set
- Restart development server

#### "Invalid login":
- Ensure 2-Step Verification is enabled
- Use App Password (not regular password)
- Check email spelling: `healthfusion.live@gmail.com`

#### "Email not sending":
- Verify Gmail SMTP settings
- Check App Password is correct
- Test with different recipient

#### Form submission issues:
- Check browser console for errors
- Verify API endpoint is reachable
- Test with valid form data

## 📊 Step 8: Performance Features

### Optimizations:
- ✅ Async/await for non-blocking UI
- ✅ Connection pooling with Nodemailer
- ✅ Input validation before API call
- ✅ Timeout protection (10 seconds)
- ✅ Clean error messages
- ✅ Production logging

### Monitoring:
- Console errors logged for debugging
- Success/failure responses tracked
- User-friendly error messages

## 🔄 Step 9: Testing

### Test Checklist:
1. **Environment**: `.env.local` configured correctly
2. **API**: `/api/send-email` responds to POST
3. **Form**: All fields submit properly
4. **Emails**: Both admin and user receive emails
5. **Design**: Email templates render correctly
6. **Mobile**: Responsive on all devices

### Test Data:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9270216369",
  "treatment": "Skin Consultation",
  "date": "2024-01-15",
  "message": "Need consultation for acne treatment"
}
```

## ✅ Step 10: Final Verification

### Ready When:
- [ ] Gmail 2-Step Verification enabled
- [ ] App Password generated and configured
- [ ] Environment variables set
- [ ] Form submits to `/api/send-email`
- [ ] Admin receives appointment emails
- [ ] User receives confirmation emails
- [ ] No console errors
- [ ] Works on mobile and desktop

---

**🎉 Your HealthFusion Clinic email system is now production-ready!**

For support, check the console logs or email configuration.
