export type AttendanceType = "IN" | "OUT";
export type CorrectionStatus = "pending" | "approved" | "rejected";
export type ShiftSwapStatus = "pending" | "approved" | "rejected";
export type OvertimeStatus = "pending" | "approved" | "rejected";

export interface AttendanceRecord {
  id: string;
  type: AttendanceType;
  timestamp: string;
  note?: string;
  location?: string;
}

export interface CorrectionRequest {
  id: string;
  date: string;
  originalType: AttendanceType;
  requestedType: AttendanceType;
  reason: string;
  status: CorrectionStatus;
  createdAt: string;
}

export interface ShiftSwapRequest {
  id: string;
  fromDate: string;
  toDate: string;
  fromShift: string;
  toShift: string;
  partnerName: string;
  reason: string;
  status: ShiftSwapStatus;
  createdAt: string;
}

export interface OvertimeRequest {
  id: string;
  date: string;
  hours: number;
  reason: string;
  status: OvertimeStatus;
  createdAt: string;
}

export interface Employee {
  id: string;
  name: string;
  nik: string;
  position: string;
  department: string;
  joinDate: string;
  phone: string;
  email: string;
  photo?: string;
}

export interface Payslip {
  id: string;
  period: string;
  basicSalary: number;
  overtimePay: number;
  allowance: number;
  deduction: number;
  netSalary: number;
  status: "draft" | "published";
}
