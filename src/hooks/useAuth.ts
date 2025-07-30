// useAuth.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { loginUser, logoutUser, registerUser, updateProfile, verifyToken, type AuthUser, type UpdateProfileRequest } from '../lib/api/auth.api';

// Storage utilities
const TOKEN_KEY = 'auth_token';
const WP_TOKEN_KEY = 'wp_token';
const USER_KEY = 'auth_user';


export const storage = {
  setTokens: (token: string, wpToken: string) => {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(WP_TOKEN_KEY, wpToken);
  },

  getToken: () => localStorage.getItem(TOKEN_KEY),

  getWpToken: () => localStorage.getItem(WP_TOKEN_KEY),

  setUser: (user: AuthUser) => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  getUser: (): AuthUser | null => {
    const userData = localStorage.getItem(USER_KEY);
    return userData ? JSON.parse(userData) : null;
  },

  clearAuth: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(WP_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }
};

// Transform customer data to AuthUser
export const transformCustomerToAuthUser = (customer: any, token: string, wpToken: string): AuthUser => {
  return {
    id: customer.id,
    email: customer.email,
    first_name: customer.first_name,
    last_name: customer.last_name,
    role: customer.role,
    username: customer.username,
    billing: customer.billing,
    shipping: customer.shipping,
    is_paying_customer: customer.is_paying_customer,
    avatar_url: customer.avatar_url,
    date_created: customer.date_created,
    date_modified: customer.date_modified,
    token,
    wpToken,
  };
};

// Custom Hook
export const useAuth = () => {
  const queryClient = useQueryClient();

  // Get current user from localStorage or verify token
  const cachedUser = storage.getUser();
  const token = storage.getToken();

  const { data: user, isLoading: isLoadingUser, error: userError } = useQuery({
    queryKey: ['auth-user'],
    queryFn: async () => {
      if (!token) return null;

      // Return cached user immediately
      if (cachedUser) {
        // 🔁 Background verify — don't block rendering
        verifyToken(token)
          .then((verifiedUser) => {
            storage.setUser(verifiedUser);
            queryClient.setQueryData(['auth-user'], verifiedUser);
          })
          .catch(() => {
            storage.clearAuth();
            queryClient.setQueryData(['auth-user'], null);
          });

        return cachedUser;
      }

      // No cached user, verify and return
      try {
        const verifiedUser = await verifyToken(token);
        storage.setUser(verifiedUser);
        return verifiedUser;
      } catch (error) {
        storage.clearAuth();
        return null;
      }
    },
    initialData: cachedUser ?? undefined, // 👈 This keeps you logged in on refresh
    staleTime: 5 * 60 * 1000,
    gcTime: 60 * 60 * 1000, // Longer GC time for stability
    retry: false,
    refetchOnWindowFocus: false,
  });

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      console.log('Login success data:', data);
      const { customer, token, wpToken } = data;

      const authUser = transformCustomerToAuthUser(customer, token, wpToken);

      storage.setTokens(token, wpToken);
      storage.setUser(authUser);

      queryClient.setQueryData(['auth-user'], authUser);
    },
    onError: (error) => {
      console.error('Full login error:', {
        message: error.message,
        stack: error.stack,
        // @ts-ignore
        response: error.response?.data
      });
      storage.clearAuth();
      queryClient.setQueryData(['auth-user'], null);
    },
  });

  // Register mutation
  const registerMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      const { customer, token, wpToken } = data;

      const authUser = transformCustomerToAuthUser(customer, token, wpToken);

      storage.setTokens(token, wpToken);
      storage.setUser(authUser);

      queryClient.setQueryData(['auth-user'], authUser);
    },
    onError: (error) => {
      console.error('Registration error:', error);
      storage.clearAuth();
      queryClient.setQueryData(['auth-user'], null);
    },
  });

  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      const { customer } = data;
      const currentUser = storage.getUser();

      if (currentUser) {
        // Update user with new data while keeping tokens
        const updatedUser = {
          ...currentUser,
          ...customer,
          token: currentUser.token,
          wpToken: currentUser.wpToken,
        };

        storage.setUser(updatedUser);
        queryClient.setQueryData(['auth-user'], updatedUser);
      }
    },
    onError: (error) => {
      console.error('Profile update error:', error);
    },
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      storage.clearAuth();
      queryClient.setQueryData(['auth-user'], null);
      queryClient.clear();
    },
    onError: (error) => {
      console.error('Logout error:', error);
      // Clear auth data even if server logout fails
      storage.clearAuth();
      queryClient.setQueryData(['auth-user'], null);
      queryClient.clear();
    },
  });

  // Logout function
  const logout = () => {
    logoutMutation.mutate();
  };

  // Force logout (without server call)
  const forceLogout = () => {
    storage.clearAuth();
    queryClient.setQueryData(['auth-user'], null);
    queryClient.clear();
  };

  // Update user data
  const updateUser = (updatedUser: Partial<AuthUser>) => {
    if (user) {
      const newUser = { ...user, ...updatedUser };
      storage.setUser(newUser);
      queryClient.setQueryData(['auth-user'], newUser);
    }
  };

  // Update user data locally (for immediate UI updates)
  const updateUserLocal = (updatedUser: Partial<AuthUser>) => {
    if (user) {
      const newUser = { ...user, ...updatedUser };
      storage.setUser(newUser);
      queryClient.setQueryData(['auth-user'], newUser);
    }
  };

  // Update user profile on server
  const updateUserProfile = (updateData: UpdateProfileRequest) => {
    updateProfileMutation.mutate(updateData);
  };

  const updateUserAddress = async (addressData: {
    billing?: any;
    shipping?: any;
  }) => {
    const currentUser = storage.getUser();
    if (!currentUser) throw new Error('No user logged in');

    const updates: any = {};
    if (addressData.billing) updates.billing = addressData.billing;
    if (addressData.shipping) updates.shipping = addressData.shipping;

    const updatedCustomer = await updateProfile(updates);
    const updatedUser = {
      ...currentUser,
      ...updatedCustomer.customer,
    };

    storage.setUser(updatedUser);
    queryClient.setQueryData(['auth-user'], updatedUser);
  };



  // Check if user has specific role
  const hasRole = (role: string) => {
    return user?.role === role;
  };

  // Check if user is paying customer
  const isPayingCustomer = () => {
    return user?.is_paying_customer || false;
  };

  return {
    // User data
    user,
    isAuthenticated: !!user,
    isLoading: isLoadingUser,
    error: userError,

    // Authentication actions
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout,
    forceLogout,

    // Profile update
    updateUser,
    updateUserAddress,
    updateUserProfile,
    updateUserLocal,

    // Loading states
    isLoginLoading: loginMutation.isPending,
    isRegisterLoading: registerMutation.isPending,
    isLogoutLoading: logoutMutation.isPending,
    isUpdateProfileLoading: updateProfileMutation.isPending,

    // Errors
    loginError: loginMutation.error,
    registerError: registerMutation.error,
    logoutError: logoutMutation.error,
    updateProfileError: updateProfileMutation.error,

    // Success states
    isUpdateProfileSuccess: updateProfileMutation.isSuccess,

    // Utility functions
    hasRole,
    isPayingCustomer,


    // Storage utilities
    storage,
  };
};