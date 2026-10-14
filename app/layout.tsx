import type { Metadata, Viewport } from "next";
import "./globals.css";
import BottomNav from "@/components/BottomNav";

export const metadata: Metadata = {
  title: "ABSENDSI — Geprekin",
  description: "Aplikasi Absensi Geprekin. Masuk, Keluar, Koreksi, Tukar Shift, Lembur & Slip Gaji.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "ABSENDSI",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#1444e1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="min-h-screen">
        <div className="mx-auto max-w-lg min-h-screen bg-gray-50 relative pb-20">
          {children}
          <BottomNav />
        </div>
      </body>
    </html>
  );
}
