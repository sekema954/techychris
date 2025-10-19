import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cn } from "../../../libs/utils";
import { faClipboard } from "@fortawesome/free-solid-svg-icons";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div className={cn("grid gap-4 p-4", className)}>
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
  id: string;
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  slug?: string | React.ReactNode;
  thumbnail?: string | any; 
}) => {
  return (
    <div
      key={id}
      className={cn(
        "bg-[#1e1e2f] flex flex-col justify-between rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-transform hover:scale-[1.02] h-[26rem]",
        className
      )}
    >
      {/* Thumbnail section with fallback */}
      <div className="w-full h-48 bg-black overflow-hidden">
        <img
          src={thumbnail}
          alt={title?.toString() || "Card thumbnail"}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 px-4 py-3 flex-grow">
        <FontAwesomeIcon
          icon={faClipboard}
          className="text-purple-400 text-lg self-start"
        />

        <h3 className="text-white text-lg font-semibold line-clamp-2">
          {title}
        </h3>

        <p className="text-sm text-gray-400 line-clamp-3">{description}</p>

        {/* Slug */}
        {slug && (
          <div className="pt-2">
            {typeof slug === "string" ? (
              <a
                href={slug}
                className="text-blue-400 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Read more →
              </a>
            ) : (
              slug
            )}
          </div>
        )}
      </div>
    </div>
  );
};
