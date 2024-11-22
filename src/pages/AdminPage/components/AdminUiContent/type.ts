interface tableHeaderItem {
  title: string;
  dataIndex: string;
  key: string;
}

export const tableHeader: tableHeaderItem[] = [
  { title: 'UzText', dataIndex: 'uzText', key: 'enText' },
  { title: 'RuText', dataIndex: 'ruText', key: 'ruText' },
  { title: 'EnText', dataIndex: 'enText', key: 'enText' },
];

export interface ActionModalDataType {
  type: string;
  modalType: string;
  data?: any;
}

interface Item {
  key: string;
  textEn: string;
  textRu?: string;
  textUz?: string;
  isDeleted: number;
  // Add more properties as needed
}

export interface translationDataType {
  currentItemCount: number;
  items: Item[];
  itemsPerPage: number;
  pageIndex: number;
  totalItems: number;
  totalPages: number;
}

export interface QueryParams {
  key: string;
  PageIndex: number;
  PageSize: number;
  IsDeleted: boolean | ""
}
