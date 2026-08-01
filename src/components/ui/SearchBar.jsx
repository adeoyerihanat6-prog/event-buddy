import { Search } from "lucide-react";

const SearchBar = () => {
  return (
    <div className="flex items-center gap-3 h-14 rounded-2xl bg-[#17171C] px-4 border border-white/10">

      <Search
        size={20}
        className="text-gray-400"
      />

      <input
        placeholder="Search concerts, festivals..."
        className="bg-transparent outline-none flex-1 text-white placeholder:text-gray-500"
      />

    </div>
  );
};

export default SearchBar;