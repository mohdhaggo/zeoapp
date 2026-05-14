import { defineFunction } from '@aws-amplify/backend';

export const contactHandler = defineFunction({
  name: 'contact-handler',
  entry: './handler.ts',
  environment: {
    RECAPTCHA_SECRET_KEY: '6LeE1uYsAAAAAK99gxa9hhEBxH1UXa6JNIbv3Ifn',
    CONTACT_EMAILS: 'info@zeoshields.com,mohd.haggo@gmail.com,support@zeoshields.com,admin@zeoshields.com,zeoadmin@gmail.com',
  },
});