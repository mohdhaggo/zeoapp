import type { Handler } from 'aws-lambda';

export const handler: Handler = async (event) => {
  console.log('Event received:', JSON.stringify(event, null, 2));
  
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({ 
      success: true, 
      message: 'Contact form submitted successfully' 
    }),
  };
};