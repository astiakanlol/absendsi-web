"use client";

import type {
  AttendanceRecord,
  CorrectionRequest,
  ShiftSwapRequest,
  OvertimeRequest,
  Employee,
  Payslip,
} from "./types";

const KEYS = {
  attendance: "absendsi_attendance",
  corrections: "absendsi_corrections",
  shifts: "absendsi_shifts",
  overtime: "absendsi_overtime",
  employee: "absendsi_employee",
  payslips: "absendsi_payslips",
};

function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function getAttendance(): AttendanceRecord[] {
  if (typeof window === "undefined") return [];
  return safeParse(localStorage.getItem(KEYS.attendance), []);
}

export function addAttendance(type: "IN" | "OUT", note?: string): AttendanceRecord {
  const list = getAttendance();
  const record: AttendanceRecord = {
    id: uid(),
    type,
    timestamp: new Date().toISOString(),
    note,
    location: "Lokasi GPS (simulasi)",
  };
  list.unshift(record);
  localStorage.setItem(KEYS.attendance, JSON.stringify(list));
  return record;
}

export function getTodayAttendance(): AttendanceRecord[] {
  const today = new Date().toDateString();
  return getAttendance().filter(
    (r) => new Date(r.timestamp).toDateString() === today
  );
}

export function getCorrections(): CorrectionRequest[] {
  if (typeof window === "undefined") return [];
  return safeParse(localStorage.getItem(KEYS.corrections), []);
}

export function addCorrection(
  data: Omit<CorrectionRequest, "id" | "status" | "createdAt">
): CorrectionRequest {
  const list = getCorrections();
  const item: CorrectionRequest = {
    ...data,
    id: uid(),
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  list.unshift(item);
  localStorage.setItem(KEYS.corrections, JSON.stringify(list));
  return item;
}

export function getShiftSwaps(): ShiftSwapRequest[] {
  if (typeof window === "undefined") return [];
  return safeParse(localStorage.getItem(KEYS.shifts), []);
}

export function addShiftSwap(
  data: Omit<ShiftSwapRequest, "id" | "status" | "createdAt">
): ShiftSwapRequest {
  const list = getShiftSwaps();
  const item: ShiftSwapRequest = {
    ...data,
    id: uid(),
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  list.unshift(item);
  localStorage.setItem(KEYS.shifts, JSON.stringify(list));
  return item;
}

export function getOvertime(): OvertimeRequest[] {
  if (typeof window === "undefined") return [];
  return safeParse(localStorage.getItem(KEYS.overtime), []);
}

export function addOvertime(
  data: Omit<OvertimeRequest, "id" | "status" | "createdAt">
): OvertimeRequest {
  const list = getOvertime();
  const item: OvertimeRequest = {
    ...data,
    id: uid(),
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  list.unshift(item);
  localStorage.setItem(KEYS.overtime, JSON.stringify(list));
  return item;
}

const DEFAULT_EMPLOYEE: Employee = {
  id: "emp-001",
  name: "PAK MIRO",
  nik: "3201234567890001",
  position: "CEO",
  department: "Manajemen",
  joinDate: "2024-01-01",
  phone: "081234567890",
  email: "miro@geprekin.id",
};

export function getEmployee(): Employee {
  if (typeof window === "undefined") return DEFAULT_EMPLOYEE;
  return safeParse(localStorage.getItem(KEYS.employee), DEFAULT_EMPLOYEE);
}

export function saveEmployee(emp: Employee) {
  localStorage.setItem(KEYS.employee, JSON.stringify(emp));
}

const DEFAULT_PAYSLIPS: Payslip[] = [
  {
    id: "ps-2026-09",
    period: "2026-09",
    basicSalary: 3500000,
    overtimePay: 450000,
    allowance: 300000,
    deduction: 150000,
    netSalary: 4100000,
    status: "published",
  },
  {
    id: "ps-2026-08",
    period: "2026-08",
    basicSalary: 3500000,
    overtimePay: 280000,
    allowance: 300000,
    deduction: 120000,
    netSalary: 3960000,
    status: "published",
  },
];

export function getPayslips(): Payslip[] {
  if (typeof window === "undefined") return DEFAULT_PAYSLIPS;
  return safeParse(localStorage.getItem(KEYS.payslips), DEFAULT_PAYSLIPS);
}

export function formatRupiah(n: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(n);
}
