import { Suspense } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { SidebarSkeleton } from "./sidebar-skeleton";
import { ModelsSwitcher } from "./models-switcher";

const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader>
        <Suspense fallback={<SidebarSkeleton />}>
          <ModelsSwitcher />
        </Suspense>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Sessions</SidebarGroupLabel>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>RAG</SidebarGroupLabel>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
};

export { AppSidebar };
