// @ts-nocheck
import { formatDistanceToNow } from "date-fns";
import { useDispatch } from "react-redux";
import { openModal } from "@/redux/slice/modal";
import type { AppDispatch } from "@/redux/store";
import { useNavigate } from "react-router";

const sampleRecords = [
  {
    patient_id: "P-1001",
    patient_name: "Sarah Chen",
    cpt_code: "97110", // Therapeutic Exercises
    previous_minutes_counted: 10,
    total_minutes_counted: 12,
    total_amount_billed: "$210.00",
    provider_id: "PR-21",
    visit_note_id: "VN-4321",
    message_id: "MSG-9001",
    order_id: "ORD-778",
    ccm_report_id: "CCM-3001",
    timestamp: new Date(Date.now() - 1000 * 60 * 2), // 2 minutes ago
    date_range: "2025-09-01 - 2025-09-26",
    content:
      "PHQ-9 report generated: patient screening indicates mild symptoms.",
    minutes_documented: 18,
    category: "Care Coordination",
    duplicates_detected: 0,
    missing_minutes_flag: false,
    total_minutes: 12,
    billable_minutes: 21,
    non_billable_minutes: 7,
    billing_status: "pending",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },

  {
    patient_id: "P-1002",
    patient_name: "Michael Rodriguez",
    cpt_code: "97112", // Neuromuscular Reeducation
    previous_minutes_counted: 0,
    total_minutes_counted: 0,
    total_amount_billed: "$90.00",
    provider_id: "PR-11",
    visit_note_id: "VN-4322",
    message_id: "MSG-9002",
    order_id: "ORD-779",
    ccm_report_id: "CCM-3002",
    timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
    date_range: "2025-09-01 - 2025-09-26",
    content: "New patient registered and intake completed.",
    minutes_documented: 12,
    category: "Care Coordination",
    duplicates_detected: 0,
    missing_minutes_flag: false,
    total_minutes: 0,
    billable_minutes: 12,
    non_billable_minutes: 0,
    billing_status: "completed",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },

  {
    patient_id: "P-1003",
    patient_name: "Emma Thompson",
    cpt_code: "99396", // Physical Checkup
    previous_minutes_counted: 5,
    total_minutes_counted: 25,
    total_amount_billed: "$200.00",
    provider_id: "PR-09",
    visit_note_id: "VN-4323",
    message_id: "MSG-9003",
    order_id: "ORD-780",
    ccm_report_id: "CCM-3003",
    timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
    date_range: "2025-09-01 - 2025-09-26",
    content: "Appointment completed and summary added.",
    minutes_documented: 25,
    category: "Medication Review",
    duplicates_detected: 1,
    missing_minutes_flag: false,
    total_minutes: 25,
    billable_minutes: 20,
    non_billable_minutes: 5,
    billing_status: "pending",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },

  {
    patient_id: "P-1004",
    patient_name: "James Wilson",
    cpt_code: "99397", // Preventive Exam for Patient over 65
    previous_minutes_counted: 0,
    total_minutes_counted: 8,
    total_amount_billed: "$0.00",
    provider_id: "PR-05",
    visit_note_id: "VN-4324",
    message_id: "MSG-9004",
    order_id: "ORD-781",
    ccm_report_id: "CCM-3004",
    timestamp: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
    date_range: "2025-09-01 - 2025-09-26",
    content: "Care plan updated and follow up scheduled.",
    minutes_documented: 8,
    category: "Care Coordination",
    duplicates_detected: 0,
    missing_minutes_flag: true,
    total_minutes: 8,
    billable_minutes: 0,
    non_billable_minutes: 8,
    billing_status: "flagged",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },

  {
    patient_id: "P-1005",
    patient_name: "Sophia Davis",
    cpt_code: "99386", // Preventive Exam for New Adult Patient
    previous_minutes_counted: 2,
    total_minutes_counted: 18,
    total_amount_billed: "$135.00",
    provider_id: "PR-14",
    visit_note_id: "VN-4325",
    message_id: "MSG-9005",
    order_id: "ORD-782",
    ccm_report_id: "CCM-3005",
    timestamp: new Date(Date.now() - 1000 * 60 * 240), // 4 hours ago
    date_range: "2025-09-01 - 2025-09-26",
    content: "Initial preventive exam and care plan discussion.",
    minutes_documented: 18,
    category: "Care Coordination",
    duplicates_detected: 0,
    missing_minutes_flag: false,
    total_minutes: 18,
    billable_minutes: 15,
    non_billable_minutes: 3,
    billing_status: "pending",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export default function CCMRecords() {
  const preview = sampleRecords.slice(0, 4);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Recent Activity
          </h3>
          <p className="text-theme-sm text-gray-500 dark:text-gray-400">
            Latest CCM records and events
          </p>
        </div>
        <div>
          <button
            onClick={() => navigate("/patients")}
            className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 dark:bg-white/5 dark:text-white/90"
          >
            Show all
          </button>
        </div>
      </div>

      <ul className="flex flex-col gap-4">
        {preview.map((r, idx) => (
          <li key={r.ccm_report_id} className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-1">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 12l2 2 4-4"
                  stroke="#465FFF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => openModal(idx)}
                  className="text-sm font-medium text-gray-800 dark:text-white/90 hover:underline"
                >
                  {r.content}
                </button>
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    {/* revenue / billed amount */}
                    <div
                      className={`text-sm font-semibold ${
                        (r.total_amount_billed || "").replace(
                          /[^0-9.-]+/g,
                          ""
                        ) *
                          1 >
                        0
                          ? "text-green-700"
                          : "text-gray-500"
                      }`}
                    >
                      {r.total_amount_billed || "$0.00"}
                    </div>
                    <div className="text-theme-xs text-gray-400">
                      {formatDistanceToNow(r.timestamp, { addSuffix: true })}
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      dispatch(
                        openModal({
                          modalType: "patientDetails",
                          edit: false,
                          callback: null,
                          data: r,
                          MODAL_WIDTH: "max-w-[500px]",
                        })
                      )
                    }
                    title="View patient details"
                    className="inline-flex items-center justify-center h-9 w-9 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
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
              </div>
              <div className="text-theme-sm text-gray-500 mt-1 mb-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-medium text-gray-800 dark:text-white/90">
                    {r.patient_name}
                  </span>

                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700 dark:bg-white/[0.04] dark:text-gray-200">
                      CPT: {r.cpt_code}
                    </span>

                    <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-700 dark:bg-white/[0.04] dark:text-gray-200">
                      Prev: {r.previous_minutes_counted} min
                    </span>

                    <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-700 dark:bg-white/[0.04] dark:text-gray-200">
                      Total: {r.total_minutes_counted} min
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
