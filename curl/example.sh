#!/bin/bash

// [START client-credentials.config]
# Configuration - replace with your values
SHOP="your-store"
CLIENT_ID="your-client-id"
CLIENT_SECRET="your-client-secret"
// [END client-credentials.config]

# [START client-credentials.get-token]
# Get access token (requires jq)
ACCESS_TOKEN=$(curl -s -X POST \
  "https://${SHOP}.myshopify.com/admin/oauth/access_token" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=client_credentials" \
  -d "client_id=${CLIENT_ID}" \
  -d "client_secret=${CLIENT_SECRET}" | jq -r '.access_token')
# [END client-credentials.get-token]

echo "Got access token: ${ACCESS_TOKEN:0:10}..."

# [START client-credentials.query-products]
# Query products using the access token
curl -s -X POST \
  "https://${SHOP}.myshopify.com/admin/api/2025-01/graphql.json" \
  -H "Content-Type: application/json" \
  -H "X-Shopify-Access-Token: $ACCESS_TOKEN" \
  -d '{"query":"{ products(first: 1) { edges { node { id title handle } } } }"}'
# [END client-credentials.query-products]
