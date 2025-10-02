import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import PageMeta from "@/components/common/PageMeta";
import Spinner from "@/components/common/Spinner";
import { useGetPatientsDemographicsQuery } from "@/redux/apis/patientsApi";
import { useState } from "react";
import Pagination from "./Pagination";
import PatientsTable from "./PatientsTable";
import SearchBar from "./SearchBar";

const PatientsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 50;

  const offset = (currentPage - 1) * recordsPerPage;

  const { data, isLoading } = useGetPatientsDemographicsQuery({
    limit: recordsPerPage,
    offset,
  });

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <PageMeta
        title="React.js Billing Records Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Billing Records Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Patient Records" />
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={(s) => {
          setSearchTerm(s);
          setCurrentPage(1);
        }}
      />

      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <PatientsTable data={data?.data ?? []} />
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

export default PatientsPage;
