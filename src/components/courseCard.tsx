import placeholder from '../assets/images/placeholder.jpg'
export interface CoursesProp {
  title: string;
  instructor: string;
  sypnosis: string;
  ratings: number | string;
  price: number;
  discount: number;
  tags?: string[];
  link: string;
  thumbnail:string;
}

export const CourseCard = ({
  title,
  instructor,
  sypnosis,
  ratings,
  price,
  discount,
  tags = [],
  thumbnail
}: CoursesProp) => {
  const discountPrice = Math.floor(price - price * (discount / 100));

  return (
    <div className="shadow shadow-black shrink-0 lg:w-[370px] w-full h-auto rounded-xl bg-[#0b0b0b] overflow-hidden shadow-lg hover:scale-[1.02] transition-all duration-300 border border-gray-800">
      {/* Thumbnail */}
      <div className="h-[140px] bg-[#141414] flex items-center justify-center">
        <img src={thumbnail || placeholder} alt={title} className="object-cover h-full w-full rounded-t-xl" />
      </div>

      {/* Course details */}
      <div className="p-4 text-white flex flex-col gap-2">
        <h1 className="text-lg font-semibold line-clamp-1">{title}</h1>
        <p className="text-sm text-gray-400">{instructor}</p>
        <p className="text-sm text-gray-300 line-clamp-2">{sypnosis}</p>
        <p className="text-yellow-400 text-sm">⭐ {ratings}</p>

        {/* Discounted Price */}
        <div className="flex items-center gap-2 mt-2">
          <p className="text-blue-400 font-semibold">${discountPrice}</p>
          <p className="text-gray-500 line-through text-sm">${price}</p>
          <p className="text-green-400 text-xs">{discount}% OFF</p>
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {tags.slice(0, 2).map((tag, index) => (
              <span
                key={index}
                className="text-xs bg-blue-700/20 border border-blue-600 text-blue-300 px-2 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
