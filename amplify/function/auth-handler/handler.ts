import type { Handler } from 'aws-lambda';

export const handler: Handler = async (event) => {
  console.log('Auth handler invoked:', JSON.stringify(event, null, 2));
  return event;
};