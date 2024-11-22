export type Region = {
  name: string;
  countryId: number;
  country: {
    name: string;
    regions: {
      name: string;
      id: number;
      createdAt: string;
      updatedAt: string;
      regions: {
        name: string;
        countryId: number;
        id: number;
        createdAt: string;
        updatedAt: string;
      }[];
    };
  };
  id: number;
  createdAt: string;
  updatedAt: string;
};
