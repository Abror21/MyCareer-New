export type Language = {
  id: number;
  createdAt: string;
  updatedAt: string;
  level: string;
  language: {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
};
