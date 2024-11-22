export interface User {
  id?: string;
  name: string;
  slug?: string;
  email?: string;
  password?: number;
  phone?: number;
  address?: number;
  description?: string;
  price?: number;
  role?: {
    id: string;
    name: string;
  } 
}