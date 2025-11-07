"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Brain, Check, ChevronsUpDown } from "lucide-react";
import { useModel } from "@/contexts/model-context";

const ModelsSwitcher = () => {
  const { currentModel, setCurrentModel, availableModels } = useModel();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-[#121212] hover:bg-[#282b33] !ring-0 !py-7"
            >
              <div className="bg-[#121212] flex aspect-square size-10 items-center justify-center rounded-lg">
                <Brain className="text-white size-6" />
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-semibold">Models</span>
                <span className="text-sm">{currentModel}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width)"
            align="start"
          >
            {availableModels.length === 0 ? (
              <DropdownMenuItem disabled>No models available</DropdownMenuItem>
            ) : (
              availableModels.map((model) => (
                <DropdownMenuItem
                  key={model}
                  onSelect={() => setCurrentModel(model)}
                >
                  {model}{" "}
                  {model === currentModel && <Check className="ml-auto" />}
                </DropdownMenuItem>
              ))
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export { ModelsSwitcher };
