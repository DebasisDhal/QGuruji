export interface ITokenModel {
  patientName: string;
  phone: string;
  doctorId: number;
  tokenNo: number;
  generatedAt: string;
  hospitalId: string;
  status: string;
  validUntil: string;
}


export interface Patient {
  id: string;
  tokenNo: number;
  status: string;
  phone: string;
  doctorId: string;
  patientName: string;
  validUntil: string;   // or Date
  hospitalId: string;
  generatedAt: number;
}