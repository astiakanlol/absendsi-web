"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  LogIn, LogOut, RefreshCw, ArrowLeftRight, Clock, FileText, User, ChevronRight, MapPin,
} from "lucide-react";
import { getTodayAttendance, getEmployee, addAttendance } from "@/lib/storage";
import { getSession } from "@/lib/auth";
import type { AttendanceRecord } from "@/lib/types";
import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";

export default function HomePage() {
  const [today, setToday] = useState<AttendanceRecord[]>([]);
  const [displayName, setDisplayName] = useState("PAK MIRO");
  const [now, setNow] = useState(new Date());
  const [loading, setLoading] = useState<"IN" | "OUT" | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    setToday(getTodayAttendance());
    const session = getSession();
    const emp = getEmployee();
    setDisplayName(session?.displayName || emp.name || "PAK MIRO");
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const lastIn = today.find((r) => r.type === "IN");
  const lastOut = today.find((r) => r.type === "OUT");
  const isCheckedIn = !!lastIn && (!lastOut || new Date(lastIn.timestamp) > new Date(lastOut.timestamp));

  const handleAttend = (type: "IN" | "OUT") => {
    setLoading(type);
    setTimeout(() => {
      addAttendance(type);
      setToday(getTodayAttendance());
      setLoading(null);
      setToast(type === "IN" ? "✓ Check-In berhasil" : "✓ Check-Out berhasil");
      setTimeout(() => setToast(null), 2500);
    }, 600);
  };

  const menuItems = [
    { href: "/koreksi", label: "Koreksi Absensi", icon: RefreshCw, color: "bg-amber-50 text-amber-600" },
    { href: "/tukar-shift", label: "Tukar Shift", icon: ArrowLeftRight, color: "bg-violet-50 text-violet-600" },
    { href: "/lembur", label: "Pengajuan Lembur", icon: Clock, color: "bg-orange-50 text-orange-600" },
    { href: "/slip-gaji", label: "Slip Gaji", icon: FileText, color: "bg-emerald-50 text-emerald-600" },
    { href: "/data-pekerja", label: "Data Pekerja", icon: User, color: "bg-kai-50 text-kai-600" },
  ];

  return (
    <div className="min-h-screen">
      <header className="bg-gradient-to-br from-kai-700 to-kai-900 text-white px-5 pt-8 pb-16 rounded-b-3xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-kai-200 text-sm">Selamat datang,</p>
            <h1 className="text-xl font-bold tracking-tight">{displayName}</h1>
          </div>
          <div className="w-11 h-11 rounded-full bg-white/20 flex items-center justify-center text-lg font-bold">
            {displayName.charAt(0)}
          </div>
        </div>
        <div className="bg-white/10 backdrop-blur rounded-2xl p-4 flex items-center justify-between">
          <div>
            <p className="text-kai-100 text-xs uppercase tracking-wider">Waktu sekarang</p>
            <p className="text-3xl font-bold tabular-nums tracking-tight">{format(now, "HH:mm:ss")}</p>
            <p className="text-kai-200 text-sm mt-0.5">{format(now, "EEEE, d MMMM yyyy", { locale: localeId })}</p>
          </div>
          <div className="text-right">
            <p className="text-kai-100 text-xs">Status hari ini</p>
            <p className={`text-sm font-semibold mt-1 ${isCheckedIn ? "text-emerald-300" : "text-amber-200"}`}>
              {isCheckedIn ? "● Sedang bekerja" : "○ Belum absen"}
            </p>
          </div>
        </div>
      </header>

      <div className="px-4 -mt-8 relative z-10">
        <div className="grid grid-cols-2 gap-3">
          <button onClick={() => handleAttend("IN")} disabled={!!loading}
            className="card-hover bg-white rounded-2xl shadow-card p-5 flex flex-col items-center gap-3 border border-gray-100 active:scale-[0.97]">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center">
              {loading === "IN" ? (
                <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
              ) : (
                <LogIn className="text-emerald-600" size={28} />
              )}
            </div>
            <div className="text-center">
              <p className="font-bold text-gray-900">Masuk</p>
              <p className="text-xs text-gray-500 mt-0.5">{lastIn ? format(new Date(lastIn.timestamp), "HH:mm") : "Belum absen"}</p>
            </div>
          </button>
          <button onClick={() => handleAttend("OUT")} disabled={!!loading}
            className="card-hover bg-white rounded-2xl shadow-card p-5 flex flex-col items-center gap-3 border border-gray-100 active:scale-[0.97]">
            <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center">
              {loading === "OUT" ? (
                <div className="w-6 h-6 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
              ) : (
                <LogOut className="text-red-600" size={28} />
              )}
            </div>
            <div className="text-center">
              <p className="font-bold text-gray-900">Keluar</p>
              <p className="text-xs text-gray-500 mt-0.5">{lastOut ? format(new Date(lastOut.timestamp), "HH:mm") : "Belum absen"}</p>
            </div>
          </button>
        </div>
      </div>

      <div className="px-4 mt-6">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 px-1">Menu Cepat</h2>
        <div className="bg-white rounded-2xl shadow-soft border border-gray-100 overflow-hidden">
          {menuItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href}
                className={`flex items-center gap-4 px-4 py-3.5 active:bg-gray-50 transition-colors ${i < menuItems.length - 1 ? "border-b border-gray-50" : ""}`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.color}`}><Icon size={20} /></div>
                <span className="flex-1 font-medium text-gray-800">{item.label}</span>
                <ChevronRight size={18} className="text-gray-300" />
              </Link>
            );
          })}
        </div>
      </div>

      {today.length > 0 && (
        <div className="px-4 mt-6 mb-4">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 px-1">Riwayat Hari Ini</h2>
          <div className="space-y-2">
            {today.slice(0, 5).map((r) => (
              <div key={r.id} className="bg-white rounded-xl px-4 py-3 flex items-center gap-3 shadow-soft border border-gray-100">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center ${r.type === "IN" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"}`}>
                  {r.type === "IN" ? <LogIn size={16} /> : <LogOut size={16} />}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{r.type === "IN" ? "Check-In" : "Check-Out"}</p>
                  <p className="text-xs text-gray-500 flex items-center gap-1"><MapPin size={10} /> {r.location || "—"}</p>
                </div>
                <p className="text-sm font-semibold tabular-nums text-gray-700">{format(new Date(r.timestamp), "HH:mm")}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] bg-gray-900 text-white text-sm font-medium px-5 py-2.5 rounded-full shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}
