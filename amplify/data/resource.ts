import { defineData } from '@aws-amplify/backend';

const schema = `
  type Warranty @model {
    id: ID!
    warrantyNumber: String!
    customerName: String
    email: String
    phone: String
    productName: String!
    purchaseDate: String
    status: String!
    registrationDate: String
  }

  type ContactSubmission @model {
    id: ID!
    name: String!
    email: String!
    phone: String
    region: String!
    interest: String!
    message: String!
    status: String!
    createdAt: String
  }
`;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'apiKey',
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});