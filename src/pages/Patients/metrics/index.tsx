import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import PageMeta from "@/components/common/PageMeta";
import Spinner from "@/components/common/Spinner";
import { useGetPatientsMetricsQuery } from "@/redux/apis/patientsApi";
import { useState } from "react";
import Pagination from "../Pagination";
import MedicationTable from "./MetricsTabls";
import { useDebounce } from "use-debounce";
import SearchBar from "../SearchBar";

const Metrics = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchBy, setSearchBy] = useState<"ID" | "Name">("ID");

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 50;

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
  };

  const { data, isLoading, isFetching } = useGetPatientsMetricsQuery(
    queryParams,
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <PageMeta
        title="Metrics Records"
        description="These are Metrics Records page"
      />
      <PageBreadcrumb pageTitle="Metrics Records" />

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={(s) => {
          setSearchTerm(s);
          setCurrentPage(1);
        }}
        searchBy={searchBy}
        setSearchBy={setSearchBy}
      />

      {isLoading ? (
        <div className="h-[70vh]">
          <Spinner />
        </div>
      ) : (
        <>
          <MedicationTable data={data?.data ?? []} isFetching={isFetching} />
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

export default Metrics;
