export interface ICandidateDetails {
  id: number;
  name: string;
  department: string;
  joining_date: string;
  convertedDate?: Date;
  experience?: number;
}

export interface IDistinctDeprtments {
  departmentName: string[];
  count: number;
}
