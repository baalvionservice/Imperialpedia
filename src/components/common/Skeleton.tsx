import React from "react";
import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

/**
 * Standardized Skeleton component for the Imperialpedia Index.
 * Provides a high-fidelity "shimmer" effect for loading states.
 */
export default function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse bg-muted/50 rounded-xl",
        className
      )}
    />
  );
}
