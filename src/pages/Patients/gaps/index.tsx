import Spinner from "@/components/common/Spinner";
import { useGetPatientsGapsQuery } from "@/redux/apis/patientsApi";
import { openModal } from "@/redux/slice/modal";
import type { AppDispatch } from "@/redux/store";
import type { PatientGap } from "@/types/patients";
import { useDispatch } from "react-redux";

const Gaps = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, isLoading } = useGetPatientsGapsQuery({
    limit: 50,
    offset: 0,
  });

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4">
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data?.data?.map((gap: PatientGap) => (
            <div
              key={gap.patient_id}
              className="border border-gray-200 rounded-xl p-4 shadow-sm bg-gray-50"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-semibold text-gray-800">
                  Patient ID: {gap.patient_id}
                </h3>
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
                {gap.gaps_found.split(",").map((item, idx) => (
                  <li key={idx}>{item.trim()}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Gaps;
