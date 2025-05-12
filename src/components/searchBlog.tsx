import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchBlog = () => {
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Search value:", searchValue);
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-md">
      <input
        type="text"
        name="search"
        id="search"
        placeholder="Search blog..."
        value={searchValue}
        onChange={handleChange}
        className="bg-[#2C2A40] text-white w-full h-[50px] pl-4 pr-14 rounded-xl border border-gray-400 placeholder:text-gray-400 focus:outline-none"
      />
      <button
        type="submit"
        className="w-[20%] absolute right-0 top-1/2 -translate-y-1/2 bg-[#847FAD] hover:bg-[#9f94d1] text-black p-3 rounded-lg shadow-md transition-all duration-300 z-10"
      >
        <FontAwesomeIcon className="text-white" icon={faSearch} />
      </button>
    </form>
  );
};

export default SearchBlog;
