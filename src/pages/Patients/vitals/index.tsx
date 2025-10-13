import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import PageMeta from "@/components/common/PageMeta";
import Spinner from "@/components/common/Spinner";
import { useGetPatientsVitalsQuery } from "@/redux/apis/patientsApi";
import type { Vitals } from "@/types/patients";
import { useState } from "react";
import VitalsTable from "./VitalsTable";
import Pagination from "../Pagination";
import { useDebounce } from "use-debounce";
import SearchBar from "../SearchBar";

const Vitals = () => {
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

  const { data, isLoading, isFetching } = useGetPatientsVitalsQuery(
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
        title="Vitals Records"
        description="These are Vitals Records Dashboard page"
      />
      <PageBreadcrumb pageTitle="Vitals Records" />

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
        <Spinner />
      ) : (
        <>
          <VitalsTable data={data?.data ?? []} isFetching={isFetching} />
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

export default Vitals;
