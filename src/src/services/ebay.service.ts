import { EBAY_CONFIG, EBAY_ENDPOINTS } from '../config/ebay.config';

class EbayService {
    private accessToken: string | null = null;
    private tokenExpiration: number = 0;

    private async getAccessToken(): Promise<string> {
        if (this.accessToken && Date.now() < this.tokenExpiration) {
            return this.accessToken;
        }

        const credentials = Buffer.from(`${EBAY_CONFIG.appId}:${EBAY_CONFIG.certId}`).toString('base64');
        
        try {
            const response = await fetch(`${EBAY_CONFIG.baseUrl}${EBAY_ENDPOINTS.oauth}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Basic ${credentials}`,
                },
                body: 'grant_type=client_credentials&scope=https://api.ebay.com/oauth/api_scope'
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            this.accessToken = data.access_token;
            this.tokenExpiration = Date.now() + (data.expires_in * 1000);
            return this.accessToken;
        } catch (error) {
            console.error('Error getting eBay access token:', error);
            throw error;
        }
    }

    async searchPokemonCard(searchQuery: string): Promise<any> {
        try {
            const token = await this.getAccessToken();
            
            const searchUrl = new URL(`${EBAY_CONFIG.baseUrl}${EBAY_ENDPOINTS.browse}/item_summary/search`);
            searchUrl.searchParams.append('q', `Pokemon TCG ${searchQuery}`);
            searchUrl.searchParams.append('category_ids', '183454');
            searchUrl.searchParams.append('limit', '5');
            searchUrl.searchParams.append('filter', 'buyingOptions:{FIXED_PRICE}');
            searchUrl.searchParams.append('sort', '-price');
            searchUrl.searchParams.append('fieldgroups', 'FULL');

            console.log('eBay search URL:', searchUrl.toString());

            const response = await fetch(searchUrl.toString(), {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'X-EBAY-C-MARKETPLACE-ID': 'EBAY_US',
                    'X-EBAY-C-ENDUSERCTX': 'contextualLocation=country=US,zip=90210'
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('eBay API error:', errorData);
                throw new Error(`eBay API error: ${response.status} - ${JSON.stringify(errorData)}`);
            }

            const data = await response.json();
            console.log('eBay API response:', data);
            return data;
        } catch (error) {
            console.error('Error searching eBay:', error);
            // Si hay un error con la API, devolvemos un objeto vacío para que la UI pueda manejarlo
            return {
                itemSummaries: []
            };
        }
    }

    getViewItemURL(itemId: string): string {
        return `https://${EBAY_CONFIG.sandbox ? 'sandbox.' : ''}ebay.com/itm/${itemId}`;
    }
}

export const ebayService = new EbayService(); 