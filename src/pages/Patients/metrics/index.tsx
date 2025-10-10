import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import PageMeta from "@/components/common/PageMeta";
import Spinner from "@/components/common/Spinner";
import { useGetPatientsMetricsQuery } from "@/redux/apis/patientsApi";
import { useState } from "react";
import Pagination from "../Pagination";
import MedicationTable from "./MetricsTabls";

const Metrics = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 50;

  const offset = (currentPage - 1) * recordsPerPage;

  const { data, isLoading, isFetching } = useGetPatientsMetricsQuery({
    limit: recordsPerPage,
    offset,
  });

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

      {isLoading ? (
        <Spinner />
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
