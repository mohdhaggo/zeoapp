import { defineAuth } from '@aws-amplify/backend';

export const auth = defineAuth({
  loginWith: {
    email: true,
  },
  userAttributes: {
    email: {
      required: true,
      mutable: false,
    },
  },
  // Enable custom email sender for OTP
  triggers: {
    customEmailSender: 'customEmailSender',
  },
});