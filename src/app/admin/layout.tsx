import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SermonProvider } from "@/context/sermon-context";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SermonProvider>
      <SidebarProvider>
          <div className="flex min-h-screen">
              <AdminSidebar />
              <div className="flex-1">
                  {children}
              </div>
          </div>
      </SidebarProvider>
    </SermonProvider>
  );
}
