
// Auth0 specific types
export interface Auth0User {
  sub: string;
  name?: string;
  given_name?: string;
  family_name?: string;
  middle_name?: string;
  nickname?: string;
  preferred_username?: string;
  profile?: string;
  picture?: string;
  website?: string;
  email?: string;
  email_verified?: boolean;
  gender?: string;
  birthdate?: string;
  zoneinfo?: string;
  locale?: string;
  phone_number?: string;
  phone_number_verified?: boolean;
  address?: {
    country?: string;
  };
  updated_at?: string;
  [key: string]: any;
}

export interface AuthContextType {
  user: Auth0User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (options?: any) => void;
  logout: (options?: any) => void;
  signup: (options?: any) => void;
  getAccessTokenSilently: () => Promise<string>;
}
