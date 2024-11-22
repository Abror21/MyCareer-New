export type Page = {
  id: number;
  createdAt?: string;
  updatedAt?: string | null;
  page: {
    id: number;
    key: string;
    path: string;
    createdAt?: string;
    updatedAt?: string | null;
  };
};
