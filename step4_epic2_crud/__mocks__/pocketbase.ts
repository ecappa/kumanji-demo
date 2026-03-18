/**
 * Mock PocketBase pour Jest
 * Évite l'import ESM qui cause des erreurs dans l'environnement de test
 */

export class ClientResponseError extends Error {
  url: string;
  status: number;
  response: Record<string, unknown>;
  isAbort: boolean;
  originalError: unknown;

  constructor(errData?: unknown) {
    super('ClientResponseError');
    this.url = '';
    this.status = 0;
    this.response = {};
    this.isAbort = false;
    this.originalError = null;

    if (errData !== null && typeof errData === 'object') {
      const data = errData as Record<string, unknown>;
      this.url = (typeof data.url === 'string') ? data.url : '';
      this.status = (typeof data.status === 'number') ? data.status : 0;
      this.response = (typeof data.response === 'object' && data.response !== null) 
        ? data.response as Record<string, unknown> 
        : {};
    }
  }
}

class MockRecordService {
  getFullList = jest.fn().mockResolvedValue([]);
  getOne = jest.fn().mockResolvedValue({});
  create = jest.fn().mockResolvedValue({});
  update = jest.fn().mockResolvedValue({});
  delete = jest.fn().mockResolvedValue(true);
}

class PocketBase {
  baseUrl: string;
  authStore = {
    token: '',
    record: null,
    isValid: false,
    save: jest.fn(),
    clear: jest.fn(),
    onChange: jest.fn(),
  };

  constructor(baseUrl = 'http://127.0.0.1:8090') {
    this.baseUrl = baseUrl;
  }

  autoCancellation(_enable: boolean) {
    return this;
  }

  collection(_name: string) {
    return new MockRecordService();
  }
}

export default PocketBase;
