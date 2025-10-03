import Spinner from "@/components/common/Spinner";
import { openModal } from "@/redux/slice/modal";
import type { AppDispatch } from "@/redux/store";
import type { Vitals } from "@/types/patients";
import { useDispatch } from "react-redux";

interface Props {
  data: Vitals[];
  isFetching: boolean;
}

function VitalsTable({ data, isFetching }: Props) {
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
              <th className="py-3">Patient ID</th>
              <th className="py-3">BP (Systolic/Diastolic)</th>
              <th className="py-3">Heart Rate</th>
              <th className="py-3">Temperature (°F)</th>
              <th className="py-3">O₂ Saturation (%)</th>
              <th className="py-3">Height (in)</th>
              <th className="py-3">Weight (lbs)</th>
              <th className="py-3">BMI</th>
              <th className="py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((v: Vitals) => (
              <tr key={v.patient_id} className="border-t border-gray-100">
                <td className="py-3">{v.patient_id}</td>
                <td className="py-3">
                  {v.bp_s && v.bp_d ? `${v.bp_s}/${v.bp_d}` : "-"}
                </td>
                <td className="py-3">{v.hr ?? "-"}</td>
                <td className="py-3">{v.temperature ?? "-"}</td>
                <td className="py-3">{v.o2_percent ?? "-"}</td>
                <td className="py-3">{v.height ?? "-"}</td>
                <td className="py-3">{v.weight ?? "-"}</td>
                <td className="py-3">{v.bmi ?? "-"}</td>

                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        dispatch(
                          dispatch(
                            openModal({
                              modalType: "patientDetails",
                              data: v.patient_id,
                              MODAL_WIDTH: "max-w-[500px]",
                            })
                          )
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

export default VitalsTable;
