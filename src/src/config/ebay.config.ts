export const EBAY_CONFIG = {

    sandbox: false,
    baseUrl: 'https://api.ebay.com'
};

// Endpoints
export const EBAY_ENDPOINTS = {
    oauth: '/identity/v1/oauth2/token',
    browse: '/buy/browse/v1'
};

// Scopes necesarios para la API
export const EBAY_SCOPES = [
    'https://api.ebay.com/oauth/api_scope',
    'https://api.ebay.com/oauth/api_scope/buy.item.feed',
    'https://api.ebay.com/oauth/api_scope/buy.marketing',
    'https://api.ebay.com/oauth/api_scope/buy.item.bulk',
    'https://api.ebay.com/oauth/api_scope/buy.item'
]; 