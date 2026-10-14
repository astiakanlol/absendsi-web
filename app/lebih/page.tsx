"use client";

import Link from "next/link";
import {
  RefreshCw,
  ArrowLeftRight,
  Clock,
  FileText,
  User,
  Info,
  ChevronRight,
} from "lucide-react";

const menus = [
  { href: "/koreksi", label: "Koreksi Absensi", desc: "Ajukan perbaikan data absen", icon: RefreshCw, color: "bg-amber-50 text-amber-600" },
  { href: "/tukar-shift", label: "Tukar Shift", desc: "Tukar jadwal dengan rekan", icon: ArrowLeftRight, color: "bg-violet-50 text-violet-600" },
  { href: "/lembur", label: "Pengajuan Lembur", desc: "Catat jam lembur", icon: Clock, color: "bg-orange-50 text-orange-600" },
  { href: "/slip-gaji", label: "Slip Gaji", desc: "Lihat rincian gaji", icon: FileText, color: "bg-emerald-50 text-emerald-600" },
  { href: "/data-pekerja", label: "Data Pekerja", desc: "Profil & data pribadi", icon: User, color: "bg-kai-50 text-kai-600" },
];

export default function LebihPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-20">
        <div className="flex items-center px-4 h-14">
          <h1 className="font-bold text-lg">Lainnya</h1>
        </div>
      </header>

      <div className="p-4">
        <div className="bg-white rounded-2xl shadow-soft border border-gray-100 overflow-hidden">
          {menus.map((m, i) => {
            const Icon = m.icon;
            return (
              <Link
                key={m.href}
                href={m.href}
                className={`flex items-center gap-4 px-4 py-3.5 active:bg-gray-50 ${
                  i < menus.length - 1 ? "border-b border-gray-50" : ""
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${m.color}`}>
                  <Icon size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-800 text-sm">{m.label}</p>
                  <p className="text-xs text-gray-400">{m.desc}</p>
                </div>
                <ChevronRight size={18} className="text-gray-300" />
              </Link>
            );
          })}
        </div>

        <div className="mt-6 bg-white rounded-2xl shadow-soft border border-gray-100 p-4 flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-gray-100 text-gray-500 flex items-center justify-center shrink-0">
            <Info size={18} />
          </div>
          <div>
            <p className="font-medium text-sm text-gray-800">ABSENDSI v1.0</p>
            <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
              Simulasi aplikasi absensi untuk brand Geprekin.
              Data disimpan lokal di browser (localStorage).
              Dibuat dengan standar QIORI — modern, clean, anti-bug.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
