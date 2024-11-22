export interface UpdateByType {
  id: number;
  createdAt: string;
  updatedAt: string;
  email: string;
  role: string;
  freelancerId: number;
}
export interface statusType {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  description: string;
  text: string;
}
export type historyDataTypes = {
  id: number;
  createdAt: string;
  updatedAt: string;
  freelancerId: number;
  status: statusType;
  updatedBy: UpdateByType;
};
