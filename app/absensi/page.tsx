"use client";

import { useEffect, useState } from "react";
import { getAttendance } from "@/lib/storage";
import type { AttendanceRecord } from "@/lib/types";
import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";
import { LogIn, LogOut, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AbsensiPage() {
  const [records, setRecords] = useState<AttendanceRecord[]>([]);

  useEffect(() => {
    setRecords(getAttendance());
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-20">
        <div className="flex items-center gap-3 px-4 h-14">
          <Link href="/" className="p-1 -ml-1 text-gray-600">
            <ArrowLeft size={22} />
          </Link>
          <h1 className="font-bold text-lg">Riwayat Absensi</h1>
        </div>
      </header>

      <div className="p-4 space-y-2">
        {records.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p>Belum ada data absensi</p>
          </div>
        ) : (
          records.map((r) => (
            <div
              key={r.id}
              className="bg-white rounded-xl px-4 py-3.5 flex items-center gap-3 shadow-soft border border-gray-100"
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  r.type === "IN" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                }`}
              >
                {r.type === "IN" ? <LogIn size={18} /> : <LogOut size={18} />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm">
                  {r.type === "IN" ? "Check-In" : "Check-Out"}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {format(new Date(r.timestamp), "EEEE, d MMM yyyy", { locale: localeId })}
                </p>
              </div>
              <p className="text-sm font-bold tabular-nums text-gray-800">
                {format(new Date(r.timestamp), "HH:mm")}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
