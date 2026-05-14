import type { CustomEmailSenderTriggerHandler } from 'aws-lambda/trigger/cognito-user-pool-trigger';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

const sesClient = new SESClient({ region: process.env.AWS_REGION });
const FROM_EMAIL = process.env.FROM_EMAIL || 'noreply@zeoshields.com';

export const handler: CustomEmailSenderTriggerHandler = async (event) => {
  console.log('Custom email sender trigger:', event);
  
  const { code, userAttributes } = event.request;
  const email = userAttributes?.email;
  const verificationCode = code || '';
  
  // Only handle verification codes
  if (event.triggerSource === 'CustomEmailSender_SignUp' || 
      event.triggerSource === 'CustomEmailSender_ResendCode' ||
      event.triggerSource === 'CustomEmailSender_ForgotPassword') {
    
    const htmlBody = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 500px; margin: 0 auto; padding: 20px; }
          .header { background: #E50914; color: white; padding: 20px; text-align: center; }
          .otp-code { font-size: 32px; font-weight: bold; color: #E50914; text-align: center; padding: 20px; letter-spacing: 5px; }
          .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>Zeo Shields Admin Login</h2>
          </div>
          <div class="otp-code">${verificationCode}</div>
          <p style="text-align: center;">This verification code is valid for 10 minutes.</p>
          <div class="footer">
            <p>If you didn't request this code, please ignore this email.</p>
          </div>
        </div>
      </body>
      </html>
    `;
    
    if (!email) {
      console.warn('No email address available in Cognito user attributes. Skipping SES send.');
      return event;
    }

    const params = {
      Source: FROM_EMAIL,
      Destination: { ToAddresses: [email] },
      Message: {
        Subject: { Data: '🔐 Zeo Shields Admin Verification Code' },
        Body: { Html: { Data: htmlBody } }
      }
    };
    
    try {
      await sesClient.send(new SendEmailCommand(params));
      console.log(`Verification code sent to ${email}`);
    } catch (error) {
      console.error('Failed to send email:', error);
    }
  }
  
  return event;
};