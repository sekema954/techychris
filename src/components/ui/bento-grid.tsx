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
    <div
      className={cn(
        "grid gap-6 p-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-min auto-flow-dense lg:py-10 py-5",
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
        "bg-[#1e1e2f] flex flex-col rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.03] group",
        className
      )}
    >
      {/* Thumbnail with overlay */}
      <div className="relative w-full h-56 overflow-hidden rounded-t-xl p-2">
        <img
          src={thumbnail}
          alt={title?.toString() || "Card thumbnail"}
          className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 px-4 py-3 flex-grow">
        <div className="flex items-center gap-2">
          <FontAwesomeIcon
            icon={faClipboard}
            className="text-purple-400 text-lg"
          />
          <span className="text-gray-400 text-sm">Blog</span>
        </div>

        <h3 className="text-white text-lg sm:text-xl font-semibold line-clamp-2 group-hover:text-purple-400 transition-colors duration-300">
          {title}
        </h3>

        <p className="text-gray-300 text-sm line-clamp-3">{description}</p>

        {/* Read more link */}
        {slug && (
          <div className="pt-2 mt-auto">
            {typeof slug === "string" ? (
              <a
                href={slug}
                className="text-blue-400 hover:underline hover:text-purple-400 transition-colors duration-300 text-sm sm:text-base font-medium"
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
