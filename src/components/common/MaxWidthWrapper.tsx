import type { ReactNode } from "react";
import { cn } from "../../lib/utils";

const MaxWidthWrapper = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <div
      className={cn(
        "max-w-screen-2xl px-3 md:px-8 lg:px-12 xl:px-16 mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};
export default MaxWidthWrapper;
