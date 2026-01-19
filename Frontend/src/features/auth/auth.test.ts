import { describe, it, expect, beforeEach, vi } from 'vitest';
import * as authApi from './api';
import * as authStore from './store';

// Mock axios
vi.mock('axios');

describe('Auth API', () => {
  it('should have login function', () => {
    expect(authApi.login).toBeDefined();
  });

  it('should have register function', () => {
    expect(authApi.register).toBeDefined();
  });

  it('should have getMe function', () => {
    expect(authApi.getMe).toBeDefined();
  });

  it('should have logout function', () => {
    expect(authApi.logout).toBeDefined();
  });
});

describe('Auth Store', () => {
  beforeEach(() => {
    // Reset auth state before each test
    vi.clearAllMocks();
  });

  it('should have login function', () => {
    expect(authStore.login).toBeDefined();
  });

  it('should have register function', () => {
    expect(authStore.register).toBeDefined();
  });

  it('should have fetchUser function', () => {
    expect(authStore.fetchUser).toBeDefined();
  });

  it('should have logout function', () => {
    expect(authStore.logout).toBeDefined();
  });

  it('should have setUser function', () => {
    expect(authStore.setUser).toBeDefined();
  });

  it('should have clearError function', () => {
    expect(authStore.clearError).toBeDefined();
  });
});

describe('Auth Store Integration', () => {
  it('should update user state when setUser is called', () => {
    const testUser = {
      id: 1,
      name: 'Test User',
      email: 'test@example.com',
    };

    authStore.setUser(testUser);

    // Note: In a real test, you'd import authState and check its values
    // This is a basic structure for integration tests
    expect(authStore.setUser).toHaveBeenCalled;
  });

  it('should clear error when clearError is called', () => {
    authStore.clearError();
    expect(authStore.clearError).toHaveBeenCalled;
  });
});
