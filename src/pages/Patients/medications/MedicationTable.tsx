import Spinner from "@/components/common/Spinner";
import { openModal } from "@/redux/slice/modal";
import type { AppDispatch } from "@/redux/store";
import type { MedicationRecord } from "@/types/patients";
import { useDispatch } from "react-redux";

interface Props {
  data: MedicationRecord[];
  isFetching: boolean;
}

function MedicationTable({ data, isFetching }: Props) {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-4 overflow-x-auto">
      {isFetching ? (
        <div className="my-5 h-[70vh]">
          <Spinner />
        </div>
      ) : (
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-gray-500 dark:text-white/90">
              <th className="py-3 text-sm">Patient</th>
              <th className="py-3 text-sm">Diagnosis</th>
              <th className="py-3">Medication Name</th>
              <th className="py-3">Medication start Date</th>
              <th className="py-3">CPT Code</th>
              <th className="py-3">Bill Date</th>
              <th className="py-3">ICD-10 Code</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((p: MedicationRecord) => (
              <tr
                key={p.patient_id}
                className="border-t border-gray-100 dark:border-gray-800 dark:text-white/80"
              >
                <td className="py-3 w-40">
                  <div className="font-medium text-gray-800 dark:text-white/90">
                    {p.first_name} {p.last_name}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-white/80">
                    {p.patient_id}
                  </div>
                </td>
                <td className="py-3 w-52 pr-4">
                  <div className="">
                    {p.active_problem.slice(0, 2).map((item, index) => (
                      <span key={index} className="text-sm block">
                        {item}
                      </span>
                    ))}
                  </div>
                  {p.active_problem.length > 2 && (
                    <button
                      onClick={() =>
                        dispatch(
                          openModal({
                            modalType: "diagnosisView",
                            data: p.active_problem,
                            MODAL_WIDTH: "max-w-[500px]",
                          })
                        )
                      }
                      className="text-blue-600 text-sm hover:underline mt-1"
                    >
                      +{p.active_problem.length - 2} more
                    </button>
                  )}
                </td>

                <td className="py-3 w-48 pr-8">
                  {p.medication_name === null ? "-" : p.medication_name}
                </td>
                <td className="py-3">
                  {p.med_start_date === null ? "-" : p.med_start_date}
                </td>
                <td className="py-3">
                  {p.cpt_code === null ? "-" : p.cpt_code}
                </td>
                <td className="py-3">
                  {p.bill_date === null ? "-" : p.bill_date}
                </td>
                <td className="py-3">
                  {p.icd10_code === null ? "-" : p.icd10_code}
                </td>

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
                      className="inline-flex items-center justify-center h-8 w-8 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
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
      )}
    </div>
  );
}

export default MedicationTable;
