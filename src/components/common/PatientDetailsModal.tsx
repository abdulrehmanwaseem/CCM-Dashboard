import React from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "@/redux/store";
import { closeModal } from "@/redux/slice/modal";
import { formatDistanceToNow } from "date-fns";

interface PatientRecord {
  patient_id: string;
  patient_name: string;
  cpt_code?: string;
  previous_minutes_counted?: number;
  total_minutes_counted?: number;
  total_amount_billed?: string;
  provider_id?: string;
  visit_note_id?: string;
  message_id?: string;
  order_id?: string;
  ccm_report_id?: string;
  timestamp?: string | number | Date;
  content?: string;
  minutes_documented?: number;
  category?: string;
  duplicates_detected?: number;
  missing_minutes_flag?: boolean;
  total_minutes?: number;
  billable_minutes?: number;
  non_billable_minutes?: number;
  billing_status?: string;
  created_at?: string;
  updated_at?: string;
}

const PatientDetailsModal: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const modalState = useSelector((state: RootState) => state.modal);
  const data = modalState.data as unknown as PatientRecord | undefined;

  if (!data) return null;

  const handleClose = () => dispatch(closeModal());

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {data.patient_name}
          </h3>
          <p className="text-sm text-gray-500">
            ID: {data.patient_id} · {data.ccm_report_id}
          </p>
          <div className="mt-2 flex items-center gap-2">
            {data.category && (
              <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-700">
                {data.category}
              </span>
            )}
            {data.billing_status && (
              <span
                className={`inline-flex items-center px-2 py-0.5 text-xs rounded-full ${
                  data?.billing_status === "completed"
                    ? "bg-green-100 text-green-700"
                    : data?.billing_status === "flagged"
                    ? "bg-red-100 text-red-700"
                    : "bg-amber-100 text-amber-700"
                }`}
              >
                {data?.billing_status}
              </span>
            )}
          </div>
        </div>
        <div className="text-theme-xs text-gray-400 text-right">
          <div>
            {formatDistanceToNow(new Date(data.timestamp || Date.now()), {
              addSuffix: true,
            })}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {new Date(data.timestamp || Date.now()).toLocaleString()}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div className="bg-gray-50 rounded-lg p-3 border">
          <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
            <div>Provider ID:</div>
            <div className="font-medium">{data.provider_id || "-"}</div>

            <div>Visit Note ID:</div>
            <div className="font-medium">{data.visit_note_id || "-"}</div>

            <div>Message ID:</div>
            <div className="font-medium">{data.message_id || "-"}</div>

            <div>Order ID:</div>
            <div className="font-medium">{data.order_id || "-"}</div>

            <div>CPT Code:</div>
            <div className="font-medium">{data.cpt_code || "-"}</div>

            <div>Prev minutes:</div>
            <div className="font-medium">
              {data.previous_minutes_counted ?? 0} min
            </div>

            <div>Total minutes:</div>
            <div className="font-medium">
              {data.total_minutes_counted ?? data.total_minutes ?? 0} min
            </div>

            <div>Minutes documented:</div>
            <div className="font-medium">
              {data.minutes_documented ?? 0} min
            </div>

            <div>Billable minutes:</div>
            <div className="font-medium">{data.billable_minutes ?? 0} min</div>

            <div>Non-billable minutes:</div>
            <div className="font-medium">
              {data.non_billable_minutes ?? 0} min
            </div>

            <div>Duplicates detected:</div>
            <div className="font-medium">{data.duplicates_detected ?? 0}</div>

            <div>Amount billed:</div>
            <div className="font-medium">{data.total_amount_billed || "-"}</div>

            <div>Created at:</div>
            <div className="font-medium">
              {data.created_at
                ? new Date(data.created_at).toLocaleString()
                : "-"}
            </div>
          </div>
        </div>

        <div className="text-theme-sm text-gray-500">
          <div className="font-medium text-gray-800">Note</div>
          <div className="mt-1">{data.content || "-"}</div>
        </div>
      </div>

      <div className="flex gap-3 mt-6">
        <button
          onClick={handleClose}
          className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700"
        >
          Close
        </button>
      </div>
    </>
  );
};

export default PatientDetailsModal;
