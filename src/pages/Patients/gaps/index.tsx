import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import PageMeta from "@/components/common/PageMeta";
import Spinner from "@/components/common/Spinner";
import { useGetPatientsGapsQuery } from "@/redux/apis/patientsApi";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import Pagination from "../Pagination";
import SearchBar from "../SearchBar";
import GapsData from "./GapsData";
import { Dropdown } from "@/components/ui/dropdown/Dropdown";
import { DropdownItem } from "@/components/ui/dropdown/DropdownItem";

const gapFilters = [
  "PHQ9 assessment missing",
  "Cognitive assessment missing",
  "Advance Care Plan missing",
  "Care Plan missing",
  "Active medication missing",
  "Billing CPT code missing",
  "Billing ICD10 code missing",
];

const Gaps = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchBy, setSearchBy] = useState<"ID" | "Name">("ID");

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 50;

  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  const offset = (currentPage - 1) * recordsPerPage;

  const [debouncedSearch] = useDebounce(searchTerm, 1000);

  const queryParams = {
    limit: recordsPerPage,
    offset,
    patient_id:
      searchBy === "ID" && debouncedSearch.trim()
        ? debouncedSearch.trim()
        : undefined,
    patient_name:
      searchBy === "Name" && debouncedSearch.trim()
        ? debouncedSearch.trim()
        : undefined,
    fields: selectedFilter || undefined,
  };

  const { data, isLoading, isFetching } = useGetPatientsGapsQuery(queryParams, {
    refetchOnMountOrArgChange: true,
  });

  const handleFilterSelect = (filter: string) => {
    setSelectedFilter(filter);
    setCurrentPage(1);
    setFilterOpen(false);
  };

  const clearFilter = () => {
    setSelectedFilter(null);
    setCurrentPage(1);
    setFilterOpen(false);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <PageMeta
        title="Gaps Records"
        description="These are Gaps Records page"
      />
      <PageBreadcrumb pageTitle="Records" />

      <div className="flex gap-3 sm:items-center max-sm:flex-col">
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={(s) => {
            setSearchTerm(s);
            setCurrentPage(1);
          }}
          searchBy={searchBy}
          setSearchBy={setSearchBy}
        />

        <div className="relative mb-4">
          <button
            onClick={() => setFilterOpen((prev) => !prev)}
            className="dropdown-toggle bg-white border rounded-md px-3 py-2 text-sm flex justify-between items-center w-[250px] max-sm:w-full"
          >
            {selectedFilter ? selectedFilter : "Filter by Gap"}
            <svg
              className={`ml-2 transition-transform duration-200 ${
                filterOpen ? "rotate-180" : ""
              }`}
              width="18"
              height="20"
              viewBox="0 0 18 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.3125 8.65625L9 13.3437L13.6875 8.65625"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <Dropdown
            isOpen={filterOpen}
            onClose={() => setFilterOpen(false)}
            className="absolute left-0 w-[250px] flex flex-col rounded-2xl border border-gray-200 bg-white p-2 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark z-10"
          >
            {gapFilters.map((filter) => (
              <DropdownItem
                key={filter}
                onItemClick={() => handleFilterSelect(filter)}
                className="px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
              >
                {filter}
              </DropdownItem>
            ))}

            {selectedFilter && (
              <DropdownItem
                onItemClick={clearFilter}
                className="px-3 py-2 text-sm font-medium text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-white/5"
              >
                Clear Filter
              </DropdownItem>
            )}
          </Dropdown>
        </div>
      </div>

      {isLoading ? (
        <div className="h-[70vh]">
          <Spinner />
        </div>
      ) : (
        <>
          <GapsData data={data?.data ?? []} isFetching={isFetching} />
          <Pagination
            currentPage={currentPage}
            totalRecords={data?.count ?? 0}
            recordsPerPage={recordsPerPage}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </>
  );
};

export default Gaps;
