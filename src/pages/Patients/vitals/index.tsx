import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import PageMeta from "@/components/common/PageMeta";
import Spinner from "@/components/common/Spinner";
import { useGetPatientsVitalsQuery } from "@/redux/apis/patientsApi";
import type { Vitals } from "@/types/patients";
import { useState } from "react";
import VitalsTable from "./VitalsTable";
import Pagination from "../Pagination";

const Vitals = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 50;

  const offset = (currentPage - 1) * recordsPerPage;

  const { data, isLoading, isFetching } = useGetPatientsVitalsQuery({
    limit: recordsPerPage,
    offset,
  });

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
