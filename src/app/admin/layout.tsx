import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
        <div className="flex min-h-screen bg-muted/40">
            <AdminSidebar />
            <div className="flex-1 flex flex-col bg-background">
                {children}
            </div>
        </div>
    </SidebarProvider>
  );
}