import Spinner from "@/components/common/Spinner";
import { openModal } from "@/redux/slice/modal";
import type { AppDispatch } from "@/redux/store";
import type { PatientGap } from "@/types/patients";
import { useDispatch } from "react-redux";

interface Props {
  data: PatientGap[];
  isFetching: boolean;
}

function GapsData({ data, isFetching }: Props) {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="rounded-2xl ">
      {isFetching ? (
        <div className="my-5 h-[70vh]">
          <Spinner />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data?.map((gap: PatientGap) => (
            <div
              key={gap.patient_id}
              className="border border-gray-200 rounded-lg p-4 shadow-sm bg-gray-50"
            >
              <div className="flex justify-between items-center mb-2">
                <div className="text-lg font-medium mb-2">
                  <div className="text-gray-800">
                    {gap.first_name} {gap.last_name}
                  </div>
                  <div className="text-xs text-gray-500">{gap.patient_id}</div>
                </div>
                <button
                  onClick={() =>
                    dispatch(
                      dispatch(
                        openModal({
                          modalType: "patientDetails",
                          data: gap.patient_id,
                          MODAL_WIDTH: "max-w-[500px]",
                        })
                      )
                    )
                  }
                  title="View details"
                  className="inline-flex items-center justify-center h-8 w-8 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-100"
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

              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                {gap?.gaps_found?.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default GapsData;
