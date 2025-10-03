import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import PageMeta from "@/components/common/PageMeta";
import Spinner from "@/components/common/Spinner";
import { useGetPatientsGapsQuery } from "@/redux/apis/patientsApi";
import { useState } from "react";
import Pagination from "../Pagination";
import GapsData from "./GapsData";

const Gaps = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 50;

  const offset = (currentPage - 1) * recordsPerPage;

  const { data, isLoading, isFetching } = useGetPatientsGapsQuery({
    limit: recordsPerPage,
    offset,
  });

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <PageMeta
        title="Gaps Records"
        description="These are Gaps Records Dashboard page"
      />
      <PageBreadcrumb pageTitle="Medication Records" />

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
