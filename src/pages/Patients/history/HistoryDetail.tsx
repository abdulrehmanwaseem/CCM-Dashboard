import { useGetHistoryByIdQuery } from "@/redux/apis/patientsApi";
import { useParams } from "react-router";

export default function HistoryDetail() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetHistoryByIdQuery(id!);
  const patient = data?.data;

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <p className="text-center ">Loading patient details...</p>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <p className="text-center">No patient data found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 bg-gray-50">
      <div className="flex justify-between items-center pb-4">
        <h1 className="text-2xl font-bold">Patient Details</h1>
        <span
          className={`px-3 py-1 text-sm rounded-full capitalize ${
            patient?.patient_status === "active"
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {patient?.patient_status}
        </span>
      </div>
      <div className="grid md:grid-cols-2 gap-6 ">
        <div>
          <h2 className="text-lg font-semibold mb-2">Personal Info</h2>
          <div className="space-y-1 text-sm">
            <p>
              <span className="font-medium">Name:</span> {patient?.name}
            </p>
            <p>
              <span className="font-medium">Age:</span> {patient?.age}
            </p>
            <p>
              <span className="font-medium">Gender:</span> {patient?.gender}
            </p>
            <p>
              <span className="font-medium">Marital Status:</span>{" "}
              {patient?.marital_status}
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold  mb-2">Address Info</h2>
          <div className="space-y-1 text-sm">
            <p>
              <span className="font-medium">Address:</span>{" "}
              {patient?.complete_address || "N/A"}
            </p>
            <p>
              <span className="font-medium">City/State:</span>{" "}
              {patient?.city_state || "N/A"}
            </p>
            <p>
              <span className="font-medium">Zipcode:</span>{" "}
              {patient?.zipcode || "N/A"}
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-3">
          Diagnosis / Active Problems
        </h2>
        {patient?.active_problem.length === 0 ? (
          <p className="text-sm">No active problems found.</p>
        ) : (
          <ul className="list-disc pl-6 space-y-1 text-sm max-h-52 overflow-y-auto">
            {patient?.active_problem.map((problem, idx) => (
              <li key={idx}>{problem}</li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <h2 className="text-lg font-semibold  mb-3">Social Sections</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {Object.entries(patient?.social_sections || {}).map(
            ([section, items]) => (
              <div key={section} className="rounded-lg p-3 shadow">
                <h3 className="text-sm font-semibold capitalize mb-2">
                  {section}
                </h3>
                {items.length === 0 ? (
                  <p className="text-xs">No records</p>
                ) : (
                  <ul className="list-disc pl-4 text-xs space-y-1 max-h-28 overflow-y-auto">
                    {items.map((item: string, idx: number) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            )
          )}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semiboldmb-3">Social Summary</h2>
        <div className="grid md:grid-cols-5 sm:grid-cols-3 max-sm:grid-cols-2 gap-3">
          {Object.entries(patient?.social_summary || {}).map(([key, value]) => (
            <div
              key={key}
              className="border rounded-lg p-3 text-center  shadow-sm"
            >
              <p className="text-xs uppercase">{key}</p>
              <p className="mt-1 font-semibold ">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
