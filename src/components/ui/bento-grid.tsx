// components/ui/bento-grid.tsx
import { cn } from "../../../libs/utils";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto grid grid-cols-1 gap-4 md:auto-rows-[24rem] md:grid-cols-3",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  id,
  className,
  title,
  description,
  slug,
  thumbnail,

}: {
  id:number | string;
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  slug?: React.ReactNode;
  thumbnail?: React.ReactNode;
}) => {
  return (
    <div
      key={id}
      className={cn(
        "group/bento shadow-input row-span-1 flex flex-col justify-between rounded-xl border border-neutral-200 bg-white p-4 transition duration-200 hover:shadow-xl dark:border-white/[0.2] dark:bg-black dark:shadow-none",
        className
      )}
    >
      {thumbnail && <div className="mb-3">{thumbnail}</div>}

      <div className="transition duration-200 group-hover/bento:translate-x-2">
        <div className="mt-2 mb-2 font-sans font-bold text-neutral-800 dark:text-neutral-200">
          {title}
        </div>
        <div className="font-sans text-sm text-neutral-600 dark:text-neutral-300">
          {description}
        </div>
        {slug && <div className="mt-3">{slug}</div>}
      </div>
    </div>
  );
};
