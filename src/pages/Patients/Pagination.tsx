interface Props {
  currentPage: number;
  totalRecords: number;
  recordsPerPage: number;
  onPageChange: (p: number) => void;
}

export default function Pagination({
  currentPage,
  totalRecords,
  recordsPerPage,
  onPageChange,
}: Props) {
  const totalPages = Math.max(1, Math.ceil(totalRecords / recordsPerPage));
  const pages = Array.from({ length: totalPages }).map((_, i) => i + 1);

  return (
    <div className="mt-4 flex items-center justify-between">
      <div className="text-sm text-gray-500">
        Showing page {currentPage} of {totalPages}
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded-lg border border-gray-200 bg-white text-sm disabled:opacity-50"
        >
          Prev
        </button>
        {pages.map((p) => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`px-3 py-1 rounded-lg border ${
              p === currentPage
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 border-gray-200"
            }`}
          >
            {p}
          </button>
        ))}
        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded-lg border border-gray-200 bg-white text-sm disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
