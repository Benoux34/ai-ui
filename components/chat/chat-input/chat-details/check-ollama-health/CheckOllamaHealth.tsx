"use client";

import { cn } from "@/lib/utils";
import { checkOllamaHealth } from "@/services/backend";
import { Activity, Zap } from "lucide-react";
import { useEffect, useState } from "react";

const CheckOllamaHealth = () => {
  const [isChecking, setIsChecking] = useState<boolean>(true);
  const [isHealthy, setIsHealthy] = useState<boolean | null>(null);

  useEffect(() => {
    const checkHealth = async () => {
      setIsChecking(true);

      const healthy = await checkOllamaHealth();

      setIsHealthy(healthy);
      setIsChecking(false);
    };

    checkHealth();

    const interval = setInterval(checkHealth, 120000);

    return () => clearInterval(interval);
  }, []);

  const getStatusConfig = () => {
    if (isChecking) {
      return {
        bg: "bg-yellow-600/10",
        border: "border-yellow-400/20",
        text: "text-yellow-400",
        label: "Checking...",
        icon: Activity,
        animate: "animate-pulse",
      };
    }

    if (isHealthy === true) {
      return {
        bg: "bg-green-600/10",
        border: "border-green-400/20",
        text: "text-green-400",
        label: "Ready",
        icon: Zap,
        animate: "animate-pulse",
      };
    }

    return {
      bg: "bg-red-600/10",
      border: "border-red-400/20",
      text: "text-red-400",
      label: "Offline",
      icon: Activity,
      animate: "",
    };
  };

  const status = getStatusConfig();
  const Icon = status.icon;

  return (
    <div
      className={cn(
        "flex items-center gap-1.5 px-2 py-1 rounded-md border transition-all duration-300",
        status.bg,
        status.border,
        status.text
      )}
    >
      <Icon className={cn("h-3 w-3", status.animate)} />
      <span className="font-medium text-xs">{status.label}</span>
    </div>
  );
};

export { CheckOllamaHealth };
