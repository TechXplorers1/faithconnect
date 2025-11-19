'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
    Sidebar, 
    SidebarHeader, 
    SidebarContent, 
    SidebarMenu, 
    SidebarMenuItem, 
    SidebarMenuButton, 
    SidebarFooter 
} from "@/components/ui/sidebar";
import { Logo } from "@/components/logo";
import { 
    LayoutDashboard, 
    Video, 
    Calendar, 
    HandHeart,
    Mail,
    LogOut,
    Radio,
} from "lucide-react";
import { Separator } from "../ui/separator";

const adminNavItems = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/sermons', label: 'Sermons', icon: Video },
    { href: '/admin/events', label: 'Events', icon: Calendar },
    { href: '/admin/donations', label: 'Donations', icon: HandHeart },
    { href: '/admin/live-stream', label: 'Live Stream', icon: Radio },
    { href: '/admin/newsletter', label: 'Newsletter', icon: Mail },
];

export function AdminSidebar() {
    const pathname = usePathname();

    return (
        <Sidebar>
            <SidebarHeader>
                <Logo />
            </SidebarHeader>
            <Separator />
            <SidebarContent>
                <SidebarMenu>
                    {adminNavItems.map((item) => (
                        <SidebarMenuItem key={item.href}>
                             <Link href={item.href}>
                                <SidebarMenuButton
                                    isActive={pathname.startsWith(item.href)}
                                    tooltip={item.label}
                                >
                                    <item.icon />
                                    <span>{item.label}</span>
                                </SidebarMenuButton>
                            </Link>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
            <Separator />
            <SidebarFooter>
                 <SidebarMenu>
                    <SidebarMenuItem>
                        <Link href="/">
                            <SidebarMenuButton tooltip="Log Out">
                                <LogOut />
                                <span>Log Out</span>
                            </SidebarMenuButton>
                        </Link>
                    </SidebarMenuItem>
                 </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
