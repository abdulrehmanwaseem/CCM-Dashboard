import Pagination from "@/pages/Patients/Pagination";
import patientsData from "@/pages/Patients/patientsData";
import PatientsTable from "@/pages/Patients/PatientsTable";
import { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

export default function ViewCSV() {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  // optional filename passed through location.state
  const filename =
    (location.state && location.state.filename) ||
    "patient_demographics_2024.csv";

  const totalRecords = patientsData.length;
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = useMemo(
    () => patientsData.slice(indexOfFirstRecord, indexOfLastRecord),
    [currentPage]
  );

  const downloadDummy = () => {
    const a = document.createElement("a");
    a.href = "/files/dummy.csv";
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold">{filename}</h1>
          <p className="text-sm text-gray-500">
            Showing all records contained in this CSV
          </p>
        </div>
        <div>
          <button
            onClick={downloadDummy}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50"
          >
            Download CSV
          </button>
        </div>
      </div>

      <PatientsTable patients={currentRecords} />

      <Pagination
        currentPage={currentPage}
        totalRecords={totalRecords}
        recordsPerPage={recordsPerPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
