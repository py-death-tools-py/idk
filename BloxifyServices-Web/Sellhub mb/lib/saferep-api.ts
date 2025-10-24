// SafeRep API configuration and utilities

export interface SafeRepVouch {
  id: string;
  message: string;
  stars: number;
  timestamp: string;
  vouchNumber: number;
  proofUrl?: string;
}

export interface SafeRepApiResponse {
  vouches: SafeRepVouch[];
  pagination: {
    total: number;
    filtered: number;
    limit: number | null;
    offset: number;
  };
  stats: {
    totalVouches: number;
    averageStars: number;
  };
}

export interface SafeRepStatsResponse {
  totalVouches: number;
  averageStars: number;
  starCounts: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
  recentActivity: {
    last30Days: number;
    averagePerDay: number;
  };
}

export class SafeRepAPI {
  private baseUrl: string;
  private apiKey: string;

  constructor(baseUrl: string, apiKey: string) {
    // Handle both HTTP and HTTPS, and remove trailing slash
    this.baseUrl = baseUrl.replace(/\/$/, '');
    this.apiKey = apiKey;
  }

  private async makeRequest<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
    // Use proxy endpoint instead of direct API call
    const proxyEndpoint = endpoint.replace('/api/v1/vouches', '/api/proxy/vouches');
    const url = new URL(proxyEndpoint, window.location.origin);
    
    // Add query parameters if provided
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value) url.searchParams.append(key, value);
      });
    }

    console.log('Making request to:', url.toString());

    const response = await fetch(url.toString(), {
      headers: {
        'x-api-key': this.apiKey,
        'Content-Type': 'application/json',
      },
    });

    console.log('Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error response:', errorText);
      throw new Error(`SafeRep API Error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    return response.json();
  }

  /**
   * Fetch all vouches with optional filtering
   */
  async getVouches(options?: {
    limit?: number;
    offset?: number;
    stars?: number;
  }): Promise<SafeRepApiResponse> {
    const params: Record<string, string> = {};
    
    if (options?.limit) params.limit = options.limit.toString();
    if (options?.offset) params.offset = options.offset.toString();
    if (options?.stars) params.stars = options.stars.toString();

    return this.makeRequest<SafeRepApiResponse>('/api/v1/vouches', params);
  }

  /**
   * Fetch vouch statistics
   */
  async getStats(): Promise<SafeRepStatsResponse> {
    return this.makeRequest<SafeRepStatsResponse>('/api/v1/vouches/stats');
  }

  /**
   * Fetch recent vouches (last 30 days)
   */
  async getRecentVouches(limit: number = 50): Promise<SafeRepApiResponse> {
    return this.getVouches({ limit });
  }

  /**
   * Fetch vouches by star rating
   */
  async getVouchesByRating(stars: number, limit?: number): Promise<SafeRepApiResponse> {
    return this.getVouches({ stars, limit });
  }
}

// Utility function to format dates
export function formatVouchDate(isoString: string): string {
  const date = new Date(isoString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) {
    return "Today";
  } else if (diffDays === 2) {
    return "Yesterday";
  } else if (diffDays <= 7) {
    return `${diffDays - 1} days ago`;
  } else if (diffDays <= 30) {
    return `${Math.ceil(diffDays / 7)} weeks ago`;
  } else {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }
}

// Default export for easy importing
export default SafeRepAPI;