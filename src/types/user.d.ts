export interface User {
  id?: string;
  name: string;
  slug?: string;
  email?: string | null;
  password?: string | null;
  phone?: string | null;
  address?: string | null;
  description?: string | null;
  role?: {
    id: string;
    name: string;
  } 
}