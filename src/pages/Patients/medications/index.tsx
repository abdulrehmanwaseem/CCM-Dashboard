import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import PageMeta from "@/components/common/PageMeta";
import Spinner from "@/components/common/Spinner";
import { useGetPatientsMedicationQuery } from "@/redux/apis/patientsApi";
import { useState } from "react";
import Pagination from "../Pagination";
import MedicationTable from "./MedicationTable";
import { useDebounce } from "use-debounce";
import SearchBar from "../SearchBar";

const Medications = () => {
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

  const { data, isLoading, isFetching } = useGetPatientsMedicationQuery(
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
        title="Medication Records"
        description="These are Medication Records Dashboard page"
      />
      <PageBreadcrumb pageTitle="Medication Records" />

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

export default Medications;
