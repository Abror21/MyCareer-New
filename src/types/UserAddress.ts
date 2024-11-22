export type UserAddress = {
  id?: number;
  createdAt?: string;
  updatedAt: string;
  regionId: number;
  region: {
    id: number;
    createdAt: string;
    updatedAt: string;
    name: string;
    countryId: number;
    country: null;
  };
  otherRegion: false;
  countryId: number;
  country: {
    id: number;
    createdAt: string;
    updatedAt: string;
    name: string;
  };
  street: string;
};
