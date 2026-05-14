import { defineData } from '@aws-amplify/backend';

const schema = `
  type Warranty @model {
    id: ID!
    warrantyNumber: String!
    productName: String!
    manufactureDate: String
    status: String!
    registrationDate: String
    customerName: String
    phone: String
    email: String
    purchaseDate: String
    purchaseCountry: String
    createdAt: String
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
    userAgent: String
    ipAddress: String
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