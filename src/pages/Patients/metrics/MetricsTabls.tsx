import Spinner from "@/components/common/Spinner";
import { openModal } from "@/redux/slice/modal";
import { AppDispatch } from "@/redux/store";
import type { Metrics } from "@/types/patients";
import { useDispatch } from "react-redux";

interface Props {
  data: Metrics[];
  isFetching: boolean;
}

export default function MetricsTable({ data, isFetching }: Props) {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4">
      {isFetching ? (
        <div className="my-5">
          <Spinner />
        </div>
      ) : (
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-gray-500">
              <th className="py-3 text-sm">Patient</th>
              <th className="py-3 text-sm">PHQ-9 Score</th>
              <th className="py-3 text-sm">Cognitive Score</th>
              <th className="py-3 text-sm">ACP Status</th>
              <th className="py-3 text-sm">Careplan Status</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((p) => (
              <tr key={p.patient_id} className="border-t border-gray-100">
                {/* Patient Info */}
                <td className="py-3 w-40">
                  <div className="font-medium text-gray-800">
                    {p.first_name} {p.last_name}
                  </div>
                  <div className="text-xs text-gray-500">{p.patient_id}</div>
                </td>

                {/* PHQ-9 */}
                <td className="py-3">
                  {p.phq9_score === null ? "-" : p.phq9_score}
                </td>

                {/* Cognitive */}
                <td className="py-3">
                  {p.cognitive_score === null ? "-" : p.cognitive_score}
                </td>

                {/* ACP */}
                <td className="py-3">
                  {p.acp_status === null ? "-" : p.acp_status}
                </td>

                {/* Careplan */}
                <td className="py-3">
                  {p.careplan_status === null ? "-" : p.careplan_status}
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
      )}
    </div>
  );
}
