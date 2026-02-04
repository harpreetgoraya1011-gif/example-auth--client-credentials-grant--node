#!/bin/bash

# Configuration - replace with your values
SHOP="your-store"
CLIENT_ID="your-client-id"
CLIENT_SECRET="your-client-secret"

# [START client-credentials.get-token]
# Get access token (requires jq)
ACCESS_TOKEN=$(curl -s -X POST \
  "https://${SHOP}.myshopify.com/admin/oauth/access_token" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=client_credentials" \
  -d "client_id=${CLIENT_ID}" \
  -d "client_secret=${CLIENT_SECRET}" | jq -r '.access_token')

echo "Got access token: ${ACCESS_TOKEN:0:10}..."
# [END client-credentials.get-token]

# [START client-credentials.query-products]
# Query products
curl -s -X POST \
  "https://${SHOP}.myshopify.com/admin/api/2025-01/graphql.json" \
  -H "Content-Type: application/json" \
  -H "X-Shopify-Access-Token: $ACCESS_TOKEN" \
  -d '{"query":"{ products(first: 1) { edges { node { id title handle } } } }"}'
# [END client-credentials.query-products]
