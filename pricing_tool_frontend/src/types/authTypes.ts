interface User {
  username: string;
  email: string;
  role?: string;
  custom_role?: string | null;
}

interface AuthResponse {
  success: boolean;
  error?: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<AuthResponse>;
  register: (
    username: string,
    email: string,
    password: string,
    role: string
  ) => Promise<AuthResponse>;
  logout: () => void;
}

interface ApiError {
  response?: {
    data?: {
      error?: string;
      detail?: string;
      details?: {
        [key: string]: string[];
      };
    };
  };
}

export type { ApiError, AuthResponse, AuthState, User };
