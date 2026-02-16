const BASE_URL = 'http://localhost:9000/api';

class ApiClient {
  async request(endpoint, options = {}) {
    const url = `${BASE_URL}${endpoint}`;

    const {
      method = 'GET',
      headers = {},
      body,
      ...rest
    } = options;

    const finalHeaders = {
      'Accept': 'application/json',
      ...headers,
    };

    let finalBody = body;

    // Only attach Content-Type if we actually send a body
    if (body != null) {
      if (typeof body === 'object' && !(body instanceof FormData)) {
        finalHeaders['Content-Type'] = 'application/json';
        finalBody = JSON.stringify(body);
      }
    }

    try {
      const response = await fetch(url, {
        method,
        headers: finalHeaders,
        body: finalBody,
        ...rest,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `HTTP ${response.status}: ${errorText || response.statusText}`
        );
      }

      // Handle empty responses safely (204, etc.)
      if (response.status === 204) {
        return null;
      }

      return await response.json();
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  // -------------------------
  // GET Requests
  // -------------------------

  async getLanguages() {
    return this.request('/languages', { method: 'GET' });
  }

  async getDocuments(language, type) {
    return this.request(`/languages/${language}/${type}`, {
      method: 'GET',
    });
  }

  async getDocument(language, type, docId) {
    return this.request(
      `/languages/${language}/${type}/${docId}`,
      { method: 'GET' }
    );
  }

  async search(language, query) {
    const encodedQuery = encodeURIComponent(query);
    return this.request(
      `/languages/${language}/search?q=${encodedQuery}`,
      { method: 'GET' }
    );
  }

  // -------------------------
  // Example POST (future use)
  // -------------------------

  async createDocument(language, type, data) {
    return this.request(`/languages/${language}/${type}`, {
      method: 'POST',
      body: data, // will auto JSON.stringify
    });
  }
}

export const api = new ApiClient();
