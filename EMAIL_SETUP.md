# Email System Setup Guide

## Overview
This project uses Nodemailer with Gmail for sending appointment request emails. The system includes:
- Professional HTML email templates
- Optimized performance with connection pooling
- Secure environment variable configuration
- Comprehensive error handling

## Quick Setup

### 1. Environment Variables
Copy the example file:
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### 2. Gmail App Password Setup

**Important**: Use an App Password, not your regular Gmail password.

1. Enable 2-Factor Authentication on your Gmail account
2. Go to: https://myaccount.google.com/apppasswords
3. Select "Mail" for the app
4. Generate a 16-character password
5. Use this password in `EMAIL_PASS`

### 3. Test the System
Start the development server:
```bash
npm run dev
```

Visit: http://localhost:3000/appointment
Fill out the form and test submission.

## Email Template Features

### Professional HTML Design
- Responsive layout for all devices
- Clinic branding with gradient header
- Color-coded urgency indicators
- Clean, medical professional appearance

### Information Included
- Patient name and contact details
- Selected treatment type
- Preferred appointment date
- Additional notes (if provided)
- Reply-to functionality for easy response

### Fallback
- Plain text version for email clients that don't support HTML
- Proper formatting for readability

## Performance Optimizations

### Connection Pooling
```javascript
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user, pass },
  pool: true,              // Reuse connections
  maxConnections: 1,       // Limit concurrent connections
  maxMessages: 100,        // Messages per connection
  rateLimit: 14,           // Messages per second
});
```

### Frontend Optimizations
- 10-second timeout for requests
- AbortController for cancellation
- Proper error handling with user feedback
- Loading states during submission

## Security Features

### Environment Protection
- No hardcoded credentials
- Environment variables for sensitive data
- Production-ready configuration

### Validation
- Server-side validation for all fields
- Email format verification
- Mobile number format checking
- Date validation (no past dates)

### Error Handling
- Generic error messages for security
- Detailed logging for debugging
- Graceful degradation

## API Endpoints

### `/api/send-appointment`
**Method**: POST
**Purpose**: Handles appointment form submissions

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "mobile": "1234567890",
  "treatment": "Dermatology",
  "date": "2024-12-15",
  "notes": "Optional notes"
}
```

**Response**:
```json
{
  "success": true
}
```

## Troubleshooting

### Common Issues

1. **"Email service not configured"**
   - Check `.env.local` file exists
   - Verify EMAIL_USER and EMAIL_PASS are set
   - Restart development server

2. **"Invalid login"**
   - Use Gmail App Password (not regular password)
   - Enable 2-factor authentication
   - Generate new App Password if needed

3. **"Request timeout"**
   - Check internet connection
   - Verify Gmail credentials
   - Check firewall settings

4. **Build errors**
   - Ensure environment variables are set in production
   - Check hosting platform environment settings

### Testing
```bash
# Test API directly
curl -X POST http://localhost:3000/api/send-appointment \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "mobile": "1234567890",
    "treatment": "Dermatology",
    "date": "2024-12-15"
  }'
```

## Production Deployment

### Vercel
1. Go to Project Settings > Environment Variables
2. Add EMAIL_USER and EMAIL_PASS
3. Redeploy

### Netlify
1. Site settings > Build & deploy > Environment
2. Add environment variables
3. Trigger new deploy

### Other Platforms
Set environment variables according to your hosting provider's documentation.

## Monitoring

### Email Delivery
- Check Gmail "Sent" folder
- Monitor spam folder
- Use email testing services for production

### Performance
- Monitor API response times
- Check error logs
- Track submission success rates

## Support

For issues with:
- **Gmail App Password**: https://support.google.com/accounts/answer/185833
- **Nodemailer**: https://nodemailer.com/usage/
- **Next.js API Routes**: https://nextjs.org/docs/api-routes/introduction

---

**Note**: This system is optimized for the Healthfusion Multispeciality Clinic website structure and requires no additional dependencies beyond Nodemailer.
