import React from "react";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

const responsiveContainerVariants = cva("shadow-lg rounded-md p-5", {
  variants: {
    container: {
      default: "bg-themeforeground",
    },
  },
  defaultVariants: {
    // Add more variants if needed
    container: "default",
  },
});

const MyResponsiveContainer = React.forwardRef(
  ({ className, size, children, ...props }, ref) => {
    return (
      <div
        className={cn(responsiveContainerVariants({ size }), className)}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);
MyResponsiveContainer.displayName = "MyResponsiveContainer";

export default MyResponsiveContainer;
