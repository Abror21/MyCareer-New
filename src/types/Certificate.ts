import { Dayjs } from "dayjs";

export interface Certificate {
  id: number;
  createdAt: string;
  updatedAt: string;
  certificateName: string;
  certificateProgramme: string;
  issuingDate?: Dayjs;
  expiringDate?: Dayjs;
}
