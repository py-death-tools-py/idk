interface SellHubProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  category?: string;
  image?: string;
  features?: string[];
  visible: boolean;
}

interface SellHubCategory {
  id: string;
  name: string;
  description: string;
  products: SellHubProduct[];
}

class SellHubAPI {
  private apiKey: string;
  private baseUrl: string = 'https://api.sellhub.cx/v1';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`SellHub API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async getProducts(): Promise<SellHubProduct[]> {
    try {
      const data = await this.request('/products');
      return data.products || [];
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  }

  async getCategories(): Promise<SellHubCategory[]> {
    try {
      const data = await this.request('/categories');
      return data.categories || [];
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  }

  async getProductsByCategory(categoryId: string): Promise<SellHubProduct[]> {
    try {
      const data = await this.request(`/categories/${categoryId}/products`);
      return data.products || [];
    } catch (error) {
      console.error('Error fetching products by category:', error);
      return [];
    }
  }
}

// Initialize the API instance
const sellHubAPI = new SellHubAPI(process.env.NEXT_PUBLIC_SELLHUB_API_KEY || '');

export { sellHubAPI, type SellHubProduct, type SellHubCategory };