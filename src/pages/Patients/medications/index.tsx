import Spinner from "@/components/common/Spinner";
import { useGetPatientsMedicationQuery } from "@/redux/apis/patientsApi";
import { openModal } from "@/redux/slice/modal";
import type { AppDispatch } from "@/redux/store";
import { MedicationRecord } from "@/types/patients";
import { useDispatch } from "react-redux";

const Medications = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, isLoading } = useGetPatientsMedicationQuery({
    limit: 50,
    offset: 0,
  });

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4">
      {isLoading ? (
        <Spinner />
      ) : (
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-gray-500">
              <th className="py-3">Patient ID</th>
              <th className="py-3">Medication Name</th>
              <th className="py-3">Medication start Date</th>
              <th className="py-3">CPT Code</th>
              <th className="py-3">Bill Date</th>
              <th className="py-3">ICD-10 Code</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((p: MedicationRecord) => (
              <tr key={p.patient_id} className="border-t border-gray-100">
                {/* <td className="py-3">
                  <div className="font-medium text-gray-800">
                    {p.patient_id}
                  </div>
                  <div className="text-xs text-gray-500">{p.patient_id}</div>
                </td> */}
                <td className="py-3">{p.patient_id}</td>
                <td className="py-3">
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
                          dispatch(
                            openModal({
                              modalType: "patientDetails",
                              data: p.patient_id,
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
};

export default Medications;
