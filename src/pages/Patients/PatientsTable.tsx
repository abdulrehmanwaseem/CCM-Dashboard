import { openModal } from "@/redux/slice/modal";
import type { AppDispatch } from "@/redux/store";
import { Patient } from "@/types/patients";
import { useDispatch } from "react-redux";

// interface Patient {
//   patient_id: string;
//   patient_name: string;
//   cpt_code?: string;
//   total_minutes_counted?: number;
//   total_amount_billed?: string;
//   billing_status?: string;
//   timestamp?: string | number | Date;
//   ccm_report_id?: string;
// }

interface Props {
  data: Patient[];
}

export default function PatientsTable({ data }: Props) {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-xs text-gray-500">
            <th className="py-3">Patient</th>
            <th className="py-3">DOB</th>
            <th className="py-3">Sex</th>
          </tr>
        </thead>
        <tbody>
          {data.map((p: Patient) => (
            <tr key={p.patient_id} className="border-t border-gray-100">
              <td className="py-3">
                <div className="font-medium text-gray-800">
                  {p.first_name} {p.last_name}
                </div>
                <div className="text-xs text-gray-500">{p.patient_id}</div>
              </td>
              <td className="py-3">{p.dob}</td>
              <td className="py-3">{p.sex}</td>
              {/* <td className="py-3">{p.total_amount_billed}</td>
              <td className="py-3">
                <span
                  className={`inline-flex items-center px-2 py-0.5 text-xs rounded-full ${
                    p.billing_status === "completed"
                      ? "bg-green-100 text-green-700"
                      : p.billing_status === "flagged"
                      ? "bg-red-100 text-red-700"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {p.billing_status}
                </span>
              </td> */}
              <td className="py-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      dispatch(
                        openModal({
                          modalType: "patientDetails",
                          data: p.patient_id,
                          MODAL_WIDTH: "max-w-[500px]",
                        })
                      )
                    }
                    title="View details"
                    className="inline-flex items-center justify-center h-8 w-8 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
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
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
