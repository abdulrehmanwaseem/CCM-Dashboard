import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { useLazySearchBillingRecordsQuery } from "@/redux/apis/billingApi";
import { useState } from "react";

const BillingRecordSearch = () => {
  const [patientId, setPatientId] = useState("");
  const [touched, setTouched] = useState(false);

  // Lazy query hook
  const [triggerSearch, { data: results, isFetching, isError }] =
    useLazySearchBillingRecordsQuery();

  const handleSearch = () => {
    if (patientId.trim() !== "") {
      setTouched(true);
      triggerSearch({ query: patientId });
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <ComponentCard>
        <PageBreadcrumb
          prevPageTitle="Billing Records"
          pageTitle="Search Billing Records"
          prevPageLink="/billing"
        />
        <div className="mb-6">
          <Label htmlFor="patient-id-search">Patient ID</Label>
          <div className="flex items-center gap-4">
            <Input
              id="patient-id-search"
              type="text"
              placeholder="Enter Patient ID..."
              value={patientId}
              onChange={(e) => {
                setPatientId(e.target.value);
              }}
              className="mt-1 w-full"
            />
            <Button size="sm" variant="primary" onClick={handleSearch}>
              Search
            </Button>
          </div>
        </div>

        {isFetching && <div className="text-gray-500">Searching...</div>}
        {isError && (
          <div className="text-red-500">Error searching records.</div>
        )}

        {touched && patientId && Array.isArray(results) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {results.length === 0 ? (
              <div className="text-gray-500 col-span-2">
                No records found for this Patient ID.
              </div>
            ) : (
              results.map((rec, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 p-4 shadow-sm flex flex-col gap-2"
                >
                  <div className="font-semibold text-brand-600 text-sm mb-1">
                    Patient ID: {rec.patient_id}
                  </div>
                  <div className="text-xs text-gray-500 mb-2">
                    Service Date: {rec.service_date}
                  </div>
                  <div className="text-gray-800 dark:text-white/90 font-medium">
                    {rec.service_description}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="bg-gray-100 dark:bg-gray-800 dark:text-gray-100 text-gray-800 rounded px-2 py-1 text-xs">
                      Billed: ${rec.amount_billed}
                    </span>
                    <span className="bg-gray-100 dark:bg-gray-800 dark:text-gray-100 text-gray-800 rounded px-2 py-1 text-xs">
                      Paid: ${rec.amount_paid}
                    </span>
                    <span className="bg-gray-100 dark:bg-gray-800 dark:text-gray-100 text-gray-800 rounded px-2 py-1 text-xs">
                      Due: ${rec.balance_due}
                    </span>
                    <span
                      className={`rounded px-2 py-1 text-xs ${
                        rec.payment_status === "Paid"
                          ? "bg-green-100 text-green-700"
                          : rec.payment_status === "Partially Paid"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {rec.payment_status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </ComponentCard>
    </div>
  );
};

export default BillingRecordSearch;
