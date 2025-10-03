import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import PageMeta from "@/components/common/PageMeta";
import Spinner from "@/components/common/Spinner";
import { useGetPatientsMedicationQuery } from "@/redux/apis/patientsApi";
import { useState } from "react";
import Pagination from "../Pagination";
import MedicationTable from "./MedicationTable";

const Medications = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 50;

  const offset = (currentPage - 1) * recordsPerPage;

  const { data, isLoading, isFetching } = useGetPatientsMedicationQuery({
    limit: recordsPerPage,
    offset,
  });

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

export default Medications;
