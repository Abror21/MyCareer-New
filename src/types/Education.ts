import { Dayjs } from "dayjs";

export type Education = {
  id: number;
  name: string;
  degree: string;
  programme: string;
  location: string;
  dateFrom: Date | Dayjs;
  dateTo?: Date | Dayjs;
  createdAt: string;
  updatedAt: string;
  verified: boolean;
};
