import { defineFunction } from '@aws-amplify/backend';

export const authHandler = defineFunction({
  name: 'auth-handler',
  entry: './handler.ts',
  environment: {
    OTP_EXPIRY_MINUTES: '10',
    FROM_EMAIL: 'noreply@zeoshields.com',
    ALLOWED_ADMINS: 'admin@zeoshields.com,zeoadmin@gmail.com'
  }
});