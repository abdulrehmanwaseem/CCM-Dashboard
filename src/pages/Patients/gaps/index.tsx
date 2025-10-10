import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import PageMeta from "@/components/common/PageMeta";
import Spinner from "@/components/common/Spinner";
import { useGetPatientsGapsQuery } from "@/redux/apis/patientsApi";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import Pagination from "../Pagination";
import SearchBar from "../SearchBar";
import GapsData from "./GapsData";

const Gaps = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 50;

  const offset = (currentPage - 1) * recordsPerPage;

  const [debouncedSearch] = useDebounce(searchTerm, 600);

  const { data, isLoading, isFetching } = useGetPatientsGapsQuery(
    {
      limit: recordsPerPage,
      offset,
      patient_id: debouncedSearch.trim() || undefined,
    },
    { refetchOnMountOrArgChange: true }
  );

  // const filteredData = useMemo(() => {
  //   if (!debouncedSearch.trim()) return data?.data ?? [];
  //   return (data?.data ?? []).filter((item) =>
  //     item.patient_id.toString().includes(debouncedSearch.trim())
  //   );
  // }, [data, debouncedSearch]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <PageMeta
        title="Gaps Records"
        description="These are Gaps Records page"
      />
      <PageBreadcrumb pageTitle=" Records" />
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={(s) => {
          setSearchTerm(s);
          setCurrentPage(1);
        }}
        placeholder="Search patients by ID"
      />

      {isLoading ? (
        <Spinner />
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
