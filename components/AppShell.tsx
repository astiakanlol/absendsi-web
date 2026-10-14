"use client";

import { usePathname } from "next/navigation";
import BottomNav from "@/components/BottomNav";
import AuthGate from "@/components/AuthGate";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLogin = pathname === "/login";

  return (
    <AuthGate>
      <div
        className={`mx-auto max-w-lg min-h-screen bg-gray-50 relative ${
          isLogin ? "" : "pb-20"
        }`}
      >
        {children}
        {!isLogin && <BottomNav />}
      </div>
    </AuthGate>
  );
}
