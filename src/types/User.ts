import { Page } from './Page';
import { Role } from './Role';

export type User = {
  id: number;
  createdAt?: string;
  updatedAt?: string | null;
  email: string;
  role: Role;
  name?: string | null;
  surname?: string | null;
  pages?: Page[];
};
