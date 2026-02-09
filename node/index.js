// [START client-credentials.config]
const SHOP = process.env.SHOPIFY_SHOP;
const CLIENT_ID = process.env.SHOPIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SHOPIFY_CLIENT_SECRET;

if (!SHOP || !CLIENT_ID || !CLIENT_SECRET) {
  throw new Error(
    'Set SHOPIFY_SHOP, SHOPIFY_CLIENT_ID, and SHOPIFY_CLIENT_SECRET.'
  );
}
// [END client-credentials.config]

// [START client-credentials.get-token]
let token = null;
let tokenExpiresAt = 0;

async function getToken() {
  // ... token code ...
}
// [END client-credentials.get-token]

// [START client-credentials.query-products]
async function graphql(query, variables = {}) {
  // ... graphql code ...
}
// [END client-credentials.query-products]
