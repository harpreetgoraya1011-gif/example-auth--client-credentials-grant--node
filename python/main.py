import requests

# Configuration - replace with your values
SHOP = 'your-store'
CLIENT_ID = 'your-client-id'
CLIENT_SECRET = 'your-client-secret'

# [START client-credentials.get-token]
def get_token(shop, client_id, client_secret):
    response = requests.post(
        f"https://{shop}.myshopify.com/admin/oauth/access_token",
        headers={"Content-Type": "application/x-www-form-urlencoded"},
        data={
            "grant_type": "client_credentials",
            "client_id": client_id,
            "client_secret": client_secret,
        },
        timeout=30,
    )
    response.raise_for_status()
    return response.json()["access_token"]
# [END client-credentials.get-token]

# [START client-credentials.query-products]
def query_products(shop, token):
    response = requests.post(
        f"https://{shop}.myshopify.com/admin/api/2025-01/graphql.json",
        headers={
            "Content-Type": "application/json",
            "X-Shopify-Access-Token": token,
        },
        json={"query": "{ products(first: 1) { edges { node { id title handle } } } }"},
        timeout=30,
    )
    response.raise_for_status()
    return response.json()
# [END client-credentials.query-products]

# [START client-credentials.main]
if __name__ == "__main__":
    token = get_token(SHOP, CLIENT_ID, CLIENT_SECRET)
    print(f"Got access token: {token[:10]}...")

    products = query_products(SHOP, token)
    print(f"Products: {products}")
# [END client-credentials.main]
