export type InvoiceData = {
  id: number;
  createdAt: string;
  updatedAt: string;
  invoiceNumber: string;
  invoiceStatus: string;
  mcRequisite: {
    id: number;
    createdAt: string;
    updatedAt: string;
    companyName: string;
    addressLine1: string;
    addressLine2: string;
    account: string;
    mfo: string;
    bankINN: string;
    companyINN: string;
    oked: string;
    bankName: string;
  };
  internName: string;
  internSurname: string;
  internTelephone: string;
  address: {
    id: number;
    createdAt: string;
    updatedAt: string;
    regionId: number;
    region: {
      id: number;
      createdAt: string;
      updatedAt: string;
      name: string;
      countryId: number;
      country: {
        id: number;
        createdAt: string;
        updatedAt: string;
        name: string;
      };
    };
    otherRegion: boolean;
    countryId: number;
    country: {
      id: number;
      createdAt: string;
      updatedAt: string;
      name: string;
    };
    street: string;
  };
  invoiceDate: string;
  dueDate: string;
  description: string;
  subTotal: number;
  discount: number;
  tax: number;
  total: number;
  paymentDetail: string;
  notes: string;
};
