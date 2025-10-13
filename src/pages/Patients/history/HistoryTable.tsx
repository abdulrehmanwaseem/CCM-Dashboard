import Spinner from "@/components/common/Spinner";
import type { History } from "@/types/patients";
import { useNavigate } from "react-router";

interface Props {
  data: History[];
  isFetching: boolean;
}

export default function HistoryTable({ data, isFetching }: Props) {
  const navigate = useNavigate();

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4">
      {isFetching ? (
        <div className="my-5 h-[70vh]">
          <Spinner />
        </div>
      ) : (
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-gray-500">
              <th className="py-3">Patient</th>
              <th className="py-3">Age</th>
              <th className="py-3">Gender</th>
              <th className="py-3">Address</th>
              <th className="py-3">City / State</th>
              <th className="py-3">Zipcode</th>
              <th className="py-3">Status</th>
              {/* <th className="py-3">Active Problem</th> */}
              <th className="py-3"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((p) => (
              <tr key={p.patient_id} className="border-t border-gray-100">
                <td className="py-3">
                  <div className="font-medium text-gray-800">{p.name}</div>
                  <div className="text-xs text-gray-500">{p.patient_id}</div>
                </td>
                <td className="py-3 w-16">{p.age}</td>
                <td className="py-3">{p.gender}</td>
                <td className="py-3">{p.complete_address}</td>
                <td className="py-3">{p.city_state}</td>
                <td className="py-3">{p.zipcode}</td>
                <td className="py-3 capitalize">{p.patient_status}</td>
                <td className="py-3">
                  <button
                    onClick={() =>
                      navigate(`/patients/history/${p.patient_id}`)
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
