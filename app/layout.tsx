import type { Metadata } from "next";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { ModelProvider } from "@/contexts/model-context";
import "./globals.css";

export const metadata: Metadata = {
  title: "UI AI",
  description: "By GUTS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="antialiased">
        <ModelProvider>
          <SidebarProvider defaultOpen>
            <AppSidebar />
            <main className="w-full">{children}</main>
          </SidebarProvider>
        </ModelProvider>
      </body>
    </html>
  );
}
