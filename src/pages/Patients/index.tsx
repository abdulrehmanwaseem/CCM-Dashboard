import { useMemo, useState } from "react";
import Pagination from "./Pagination";
import PatientsTable from "./PatientsTable";
import SearchBar from "./SearchBar";
import patientsData from "./patientsData";
import PageMeta from "@/components/common/PageMeta";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";

const PatientsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const filteredPatients = useMemo(() => {
    if (!searchTerm) return patientsData;
    const s = searchTerm.toLowerCase();
    return patientsData.filter((p) =>
      `${p.patient_name} ${p.patient_id} ${p.cpt_code}`
        .toLowerCase()
        .includes(s)
    );
  }, [searchTerm]);

  const totalRecords = filteredPatients.length;
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredPatients.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
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
      <PatientsTable patients={currentRecords} />
      <Pagination
        currentPage={currentPage}
        totalRecords={totalRecords}
        recordsPerPage={recordsPerPage}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default PatientsPage;
