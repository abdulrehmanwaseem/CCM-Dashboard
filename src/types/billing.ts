// types/billing.ts

export interface BillingRecord {
  id: number; // Changed from string to number to match API expectation
  amount_billed: number;
  amount_paid: number;
  balance_due: number;
  patient_id: string;
  payment_status: "Paid" | "Unpaid" | "Partially Paid";
  service_date: string;
  service_description: string;
  created_at?: string;
  updated_at?: string;
}

export interface BillingRecordsQueryParams {
  limit?: number;
  skip?: number;
  patient_id?: string | null;
  start_date?: string | null;
  end_date?: string | null;
  payment_status?: string | null;
}

export interface SearchBillingRecordsParams {
  query: string;
  limit?: number;
  skip?: number;
}

export interface BillingRecordFormValues {
  patient_id: string;
  service_description: string;
  service_date: string;
  amount_billed: number;
  amount_paid: number;
  payment_status: "Paid" | "Unpaid" | "Partially Paid";
}

export interface UpdateBillingRecordParams extends BillingRecordFormValues {
  record_id: number; // Ensure this is a number
}

export interface BillingSummary {
  paid_records: number;
  partially_paid_records: number;
  total_balance_due: number;
  total_billed: number;
  total_paid: number;
  total_records: number;
  unpaid_records: number;
}

export interface ValidationError {
  detail: Array<{
    loc: (string | number)[];
    msg: string;
    type: string;
    input?: unknown;
  }>;
}
