// @ts-nocheck
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";

const sampleRecords = [
  {
    patient_id: "P-1001",
    patient_name: "Sarah Chen",
    provider_id: "PR-21",
    visit_note_id: "VN-4321",
    message_id: "MSG-9001",
    order_id: "ORD-778",
    ccm_report_id: "CCM-3001",
    timestamp: new Date(Date.now() - 1000 * 60 * 2),
    date_range: "2025-09-01 - 2025-09-26",
    content:
      "PHQ-9 report generated: patient screening indicates mild symptoms.",
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

  {
    patient_id: "P-1002",
    patient_name: "Michael Rodriguez",
    provider_id: "PR-11",
    visit_note_id: "VN-4322",
    message_id: "MSG-9002",
    order_id: "ORD-779",
    ccm_report_id: "CCM-3002",
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    date_range: "2025-09-01 - 2025-09-26",
    content: "New patient registered and intake completed.",
    minutes_documented: 12,
    category: "Care Coordination",
    duplicates_detected: 0,
    missing_minutes_flag: false,
    total_minutes: 12,
    billable_minutes: 12,
    non_billable_minutes: 0,
    billing_status: "completed",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    patient_id: "P-1003",
    patient_name: "Emma Thompson",
    provider_id: "PR-09",
    visit_note_id: "VN-4323",
    message_id: "MSG-9003",
    order_id: "ORD-780",
    ccm_report_id: "CCM-3003",
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
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
    provider_id: "PR-05",
    visit_note_id: "VN-4324",
    message_id: "MSG-9004",
    order_id: "ORD-781",
    ccm_report_id: "CCM-3004",
    timestamp: new Date(Date.now() - 1000 * 60 * 120),
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
    patient_name: "James Wilson",
    provider_id: "PR-05",
    visit_note_id: "VN-4324",
    message_id: "MSG-9004",
    order_id: "ORD-781",
    ccm_report_id: "CCM-3005",
    timestamp: new Date(Date.now() - 1000 * 60 * 120),
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
];

export default function CCMRecords() {
  const [modalOpen, setModalOpen] = useState(false);

  const preview = sampleRecords.slice(0, 5);

  function openModal(index = 0) {
    setActiveIndex(index);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

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
            onClick={() => openModal(0)}
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
                <span className="text-theme-xs text-gray-400">
                  {formatDistanceToNow(r.timestamp, { addSuffix: true })}
                </span>
              </div>
              <div className="text-theme-sm text-gray-500 mt-1">
                {r.patient_name}
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={closeModal}
          ></div>
          <div className="relative z-10 w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6">
            <div className="flex items-start justify-between mb-4">
              <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                All CCM Records
              </h4>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                Close
              </button>
            </div>

            <div className="divide-y divide-gray-100 dark:divide-gray-800">
              {sampleRecords.map((r) => (
                <div key={r.ccm_report_id} className="py-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-gray-800 dark:text-white/90">
                        {r.patient_name}{" "}
                        <span className="text-xs text-gray-400">
                          · {r.patient_id}
                        </span>
                      </div>
                      <div className="text-theme-sm text-gray-500 mt-1">
                        {r.content}
                      </div>
                    </div>
                    <div className="text-theme-xs text-gray-400 text-right">
                      <div>
                        {formatDistanceToNow(r.timestamp, { addSuffix: true })}
                      </div>
                      <div className="mt-1">{r.minutes_documented} min</div>
                    </div>
                  </div>
                  <div className="mt-3 text-theme-xs text-gray-500">
                    <div>Category: {r.category}</div>
                    <div>Billing: {r.billing_status}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
