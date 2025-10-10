interface Props {
  searchTerm: string;
  placeholder?: string;
  setSearchTerm: (s: string) => void;
}

export default function SearchBar({
  searchTerm,
  setSearchTerm,
  placeholder = "Search patients by name or ID",
}: Props) {
  return (
    <div className="mb-4">
      <div className="relative">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
          ⌕
        </div>
      </div>
    </div>
  );
}
