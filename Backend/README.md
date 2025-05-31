# Email Functionality Setup

This project now includes email functionality for sending invitations to project members. Follow these steps to set it up:

## 1. Update Environment Variables

Edit the `.env` file in the Backend directory and update the following variables:

```
EMAIL_USER="your-email@gmail.com"
EMAIL_PASS="your-app-password"
FRONTEND_URL="http://localhost:3000"
```

Replace:
- `your-email@gmail.com` with your Gmail address
- `your-app-password` with an app-specific password (not your regular Gmail password)

## 2. Creating an App Password for Gmail

For security reasons, Gmail requires you to use an "App Password" instead of your regular password when accessing Gmail from applications:

1. Go to your Google Account settings: https://myaccount.google.com/
2. Select "Security" from the left menu
3. Under "Signing in to Google," select "2-Step Verification" (you must have this enabled)
4. At the bottom of the page, select "App passwords"
5. Select "Mail" as the app and "Other" as the device (name it something like "Project Manager App")
6. Click "Generate" and Google will display a 16-character password
7. Copy this password and use it as your `EMAIL_PASS` in the .env file

## 3. Restart the Server

After updating the environment variables, restart your server for the changes to take effect:

```
npm run dev
```

## Troubleshooting

If you encounter issues with sending emails:

1. Make sure you've entered the correct email and app password
2. Check that 2-Step Verification is enabled for your Google account
3. If using Gmail, ensure "Less secure app access" is turned off (it's deprecated anyway)
4. Check the server logs for any specific error messages

## Note on Email Delivery

Email delivery can sometimes be delayed due to various factors including:
- Email provider's sending limits
- Spam filtering
- Network issues

If an invited user reports not receiving an email, ask them to:
1. Check their spam/junk folder
2. Verify the email address is correct
3. Wait a few minutes as delivery might be delayed
