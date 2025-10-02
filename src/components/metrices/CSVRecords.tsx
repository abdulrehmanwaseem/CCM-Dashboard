import { useGetAllCSVsQuery } from "@/redux/apis/patientsApi";
import { useNavigate } from "react-router-dom";
import Spinner from "../common/Spinner";

// CSV file item
// interface CSVFile {
//   id: number;
//   name: string;
//   records: string; // e.g. "2,847 records"
//   size: string; // e.g. "2.3 MB"
//   modified: string; // e.g. "2024-01-15 14:30"
//   tag: string; // e.g. "Patient Data"
//   ready?: boolean;
// }

// const csvData: CSVFile[] = [
//   {
//     id: 1,
//     name: "patient_demographics_2024.csv",
//     records: "2,847 records",
//     size: "2.3 MB",
//     modified: "2024-01-15 14:30",
//     tag: "Patient Data",
//     ready: true,
//   },
//   {
//     id: 2,
//     name: "phq9_assessments_q4.csv",
//     records: "1,394 records",
//     size: "1.8 MB",
//     modified: "2024-01-15 13:45",
//     tag: "Reports",
//     ready: true,
//   },
//   {
//     id: 3,
//     name: "billing_summary_december.csv",
//     records: "562 records",
//     size: "980 KB",
//     modified: "2024-01-14 10:20",
//     tag: "Finance",
//     ready: true,
//   },

//   {
//     id: 6,
//     name: "lab_results_october.csv",
//     records: "1,128 records",
//     size: "1.2 MB",
//     modified: "2024-01-11 11:10",
//     tag: "Lab Data",
//     ready: true,
//   },
//   {
//     id: 7,
//     name: "ehr_activity_logs.csv",
//     records: "12,845 records",
//     size: "9.8 MB",
//     modified: "2024-01-10 18:50",
//     tag: "System Logs",
//     ready: false,
//   },
//   {
//     id: 8,
//     name: "appointment_history_2023.csv",
//     records: "6,542 records",
//     size: "5.4 MB",
//     modified: "2024-01-09 15:25",
//     tag: "Appointments",
//     ready: true,
//   },
// ];

export default function CSVRecords() {
  const navigate = useNavigate();
  const { data, isLoading } = useGetAllCSVsQuery();

  const downloadDummy = () => {
    const a = document.createElement("a");
    a.href = "/files/dummy.csv";
    a.download = "dummy.csv";
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const routesMap: Record<string, string> = {
    "Patient Demographics": "/patients",
    "Patient Gaps": "/patients/gaps",
    "Patient Vitals": "/patients/vitals",
    "Patient Medications": "/patients/medications",
    "Patient Metrics": "/patients/metrics",
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            CSV Data Files
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            available data exports from snowflake
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={downloadDummy}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
          >
            Export All
          </button>
        </div>
      </div>

      <div className="divide-y divide-gray-100 dark:divide-gray-800">
        {isLoading ? (
          <Spinner />
        ) : (
          data?.csv_files.map((file) => (
            <div
              key={file.id}
              className="flex items-center justify-between py-4"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-md bg-gray-50 dark:bg-white/[0.03]">
                  {/* simple file icon */}
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-gray-500 dark:text-gray-300"
                  >
                    <path
                      d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M14 3v6h6"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                      {file.title}
                    </p>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      •
                    </span>
                    {/* <span className="text-xs text-gray-500 dark:text-gray-400">
                    {file.records}
                  </span> */}
                    {/* <span className="ml-3 inline-flex items-center gap-2 rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600 dark:bg-white/[0.03] dark:text-gray-300">
                    {file.tag}
                    {file.ready && (
                      <Badge size="sm" color="success">
                        ready
                      </Badge>
                    )}
                  </span> */}
                  </div>
                  <div className="text-theme-xs mt-1 text-gray-500 dark:text-gray-400">
                    {file.file_size} · Modified{" "}
                    {new Date(file.last_modified).toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const path = routesMap[file.title];
                    if (path) navigate(path);
                  }}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                  title="View file records"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current"
                  >
                    <path
                      d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="3"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <button
                  onClick={downloadDummy}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                  title="Download file"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current"
                  >
                    <path
                      d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <polyline
                      points="7 10 12 5 17 10"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <line
                      x1="12"
                      y1="5"
                      x2="12"
                      y2="17"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
