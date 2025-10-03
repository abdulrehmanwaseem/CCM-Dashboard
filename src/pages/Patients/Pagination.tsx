interface Props {
  currentPage: number;
  totalRecords: number;
  recordsPerPage: number;
  onPageChange: (p: number) => void;
}

function getVisiblePages(current: number, total: number) {
  const delta = 2; // current page ke around dikhane wale pages
  const range: (number | string)[] = [];

  const rangeStart = Math.max(2, current - delta);
  const rangeEnd = Math.min(total - 1, current + delta);

  range.push(1);

  if (rangeStart > 2) {
    range.push("...");
  }

  for (let i = rangeStart; i <= rangeEnd; i++) {
    range.push(i);
  }

  if (rangeEnd < total - 1) {
    range.push("...");
  }

  if (total > 1) {
    range.push(total);
  }

  return range;
}

export default function Pagination({
  currentPage,
  totalRecords,
  recordsPerPage,
  onPageChange,
}: Props) {
  const totalPages = Math.max(1, Math.ceil(totalRecords / recordsPerPage));
  const visiblePages = getVisiblePages(currentPage, totalPages);

  return (
    <div className="mt-4 flex items-center justify-between">
      <div className="text-sm text-gray-500">
        Showing page {currentPage} of {totalPages}
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded-md border border-gray-200 bg-white text-sm disabled:opacity-50"
        >
          Prev
        </button>

        {visiblePages.map((p, index) =>
          p === "..." ? (
            <span key={`ellipsis-${index}`} className="px-2 text-gray-400">
              ...
            </span>
          ) : (
            <button
              key={`page-${p}`}
              onClick={() => onPageChange(p as number)}
              className={`px-3 py-1 rounded-md border text-sm ${
                p === currentPage
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
              }`}
            >
              {p}
            </button>
          )
        )}

        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded-md border border-gray-200 bg-white text-sm disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
