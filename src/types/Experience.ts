import { Dayjs } from "dayjs";

export type Experience = {
  id: number;
  companyName: string;
  job: string;
  dateFrom: Date | Dayjs;
  dateTo: Date | Dayjs;
  description: string;
  createdAt?: string;
  updatedAt?: string;
};
