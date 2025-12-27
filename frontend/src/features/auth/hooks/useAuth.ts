import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: number;
    email: string;
    createdAt: string;
  };
  token: string;
}

const getAuthToken = (): string | null => {
  return localStorage.getItem('authToken');
};

const setAuthToken = (token: string): void => {
  localStorage.setItem('authToken', token);
};

const removeAuthToken = (): void => {
  localStorage.removeItem('authToken');
};

const fetchMe = async (): Promise<AuthResponse['user']> => {
  const token = getAuthToken();
  if (!token) {
    throw new Error('Not authenticated');
  }

  const response = await fetch('/api/auth/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    removeAuthToken();
    throw new Error('Authentication failed');
  }

  return response.json();
};

export const useAuth = () => {
  const queryClient = useQueryClient();

  const { data: user, isLoading: isLoadingUser } = useQuery({
    queryKey: ['auth', 'me'],
    queryFn: fetchMe,
    retry: false,
    enabled: !!getAuthToken(),
  });

  const loginMutation = useMutation({
    mutationFn: async (data: LoginRequest): Promise<AuthResponse> => {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Login failed');
      }

      return response.json();
    },
    onSuccess: (data) => {
      setAuthToken(data.token);
      queryClient.setQueryData(['auth', 'me'], data.user);
    },
  });

  const signupMutation = useMutation({
    mutationFn: async (data: SignupRequest): Promise<AuthResponse> => {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Signup failed');
      }

      return response.json();
    },
    onSuccess: (data) => {
      setAuthToken(data.token);
      queryClient.setQueryData(['auth', 'me'], data.user);
    },
  });

  const logout = () => {
    removeAuthToken();
    queryClient.setQueryData(['auth', 'me'], null);
    queryClient.removeQueries({ queryKey: ['auth', 'me'] });
  };

  return {
    user,
    isAuthenticated: !!user,
    isLoading: isLoadingUser,
    login: loginMutation.mutate,
    signup: signupMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    isSigningUp: signupMutation.isPending,
    loginError: loginMutation.error,
    signupError: signupMutation.error,
    logout,
  };
};
