import { defineFunction } from '@aws-amplify/backend';

export const customEmailSender = defineFunction({
  name: 'custom-email-sender',
  entry: './handler.ts',
  environment: {
    FROM_EMAIL: 'noreply@zeoshields.com',
  },
});