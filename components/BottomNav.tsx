"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Clock,
  Users,
  FileText,
  MoreHorizontal,
} from "lucide-react";
import clsx from "clsx";

const items = [
  { href: "/", label: "Beranda", icon: Home },
  { href: "/absensi", label: "Absensi", icon: Clock },
  { href: "/data-pekerja", label: "Profil", icon: Users },
  { href: "/slip-gaji", label: "Gaji", icon: FileText },
  { href: "/lebih", label: "Lainnya", icon: MoreHorizontal },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 safe-bottom">
      <div className="mx-auto max-w-lg flex items-center justify-around h-16 px-1">
        {items.map((item) => {
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "flex flex-col items-center justify-center flex-1 h-full gap-0.5 transition-colors",
                active ? "text-kai-700" : "text-gray-400 hover:text-gray-600"
              )}
            >
              <Icon
                size={22}
                strokeWidth={active ? 2.4 : 1.8}
                className={active ? "text-kai-700" : ""}
              />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
