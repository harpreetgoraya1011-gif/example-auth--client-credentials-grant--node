import { URLSearchParams } from 'node:url';

// [START client-credentials.config]
// Configuration - replace with your values
const SHOP = 'your-store';
const CLIENT_ID = 'your-client-id';
const CLIENT_SECRET = 'your-client-secret';
// [END client-credentials.config]

// [START client-credentials.get-token]
async function getToken(shop, clientId, clientSecret) {
  const response = await fetch(
    `https://${shop}.myshopify.com/admin/oauth/access_token`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: clientId,
        client_secret: clientSecret,
      }),
    }
  );
  if (!response.ok) throw new Error(await response.text());
  return (await response.json()).access_token;
}
// [END client-credentials.get-token]

// [START client-credentials.query-products]
async function queryProducts(shop, token) {
  const response = await fetch(
    `https://${shop}.myshopify.com/admin/api/2025-01/graphql.json`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': token,
      },
      body: JSON.stringify({
        query: '{ products(first: 1) { edges { node { id title handle } } } }',
      }),
    }
  );
  if (!response.ok) throw new Error(await response.text());
  return response.json();
}
// [END client-credentials.query-products]

// [START client-credentials.main]
async function main() {
  const token = await getToken(SHOP, CLIENT_ID, CLIENT_SECRET);
  console.log('Got access token:', token.substring(0, 10) + '...');

  const products = await queryProducts(SHOP, token);
  console.log('Products:', JSON.stringify(products, null, 2));
}

main().catch(console.error);
// [END client-credentials.main]
