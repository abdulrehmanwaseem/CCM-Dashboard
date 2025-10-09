export interface PatientDashboard {
  total_patients: number;
  active_patients: 460;
  patients_with_missing_reports: 1000;
}

export interface CsvFile {
  id: number;
  title: string;
  file_size: string;
  last_modified: Date;
}

export interface CsvFilesResponse {
  csv_files: CsvFile[];
}

export interface Patient {
  patient_id: string;
  first_name: string;
  last_name: string;
  dob: string;
  sex: string;
  patient_status: string | null;
  complete_address: string | null;
  city_state: string | null;
  zipcode: string | null;
}

export interface PatientsResponse {
  data: Patient[];
  limit: number;
  offset: number;
  count: number;
}

export interface MedicationRecord {
  patient_id: string;
  first_name: string;
  last_name: string;
  active_problem: string[];
  medication_name: string | null;
  med_start_date: string | null;
  bill_date: string | null;
  cpt_code: string | null;
  icd10_code: string | null;
}

export interface MedicationsResponse {
  data: MedicationRecord[];
  limit: number;
  offset: number;
  count: number;
}

export interface Vitals {
  patient_id: string;
  first_name: string;
  last_name: string;
  bp_s: number | null; // Blood Pressure (Systolic)
  bp_d: number | null; // Blood Pressure (Diastolic)
  hr: number | null; // Heart Rate
  temperature: number | null; // Body Temperature (Fahrenheit)
  o2_percent: number | null; // Oxygen Saturation %
  height: number | null; // Height (inches)
  weight: number | null; // Weight (lbs)
  bmi: number | null; // Body Mass Index
}

export interface VitalsResponse {
  data: Vitals[];
  limit: number;
  offset: number;
  count: number;
}

export interface PatientGap {
  patient_id: string;
  gaps_found: string;
}

export interface PatientGapsResponse {
  data: PatientGap[];
  limit: number;
  offset: number;
  count: number;
}

export interface PatientInfo {
  first_name: string;
  last_name: string;
  dob: string;
  sex: "Male" | "Female" | "Other";
  bp_s: string;
  bp_d: string;
  hr: string;
  temperature: string;
  o2_percent: string;
  height: string;
  weight: string;
  bmi: number;
  phq9_score: string;
  cognitive_score: string;
  acp_status: string;
  careplan_status: string;
}

export interface Patient {
  basic_info: PatientInfo;
}

export interface SocialSections {
  family: string[];
  diet: string[];
  functional: string[];
  habits: string[];
  maintenance: string[];
  past: string[];
  social: string[];
  other: string[];
}

export interface SocialSummary {
  smoking: string;
  vaping: string;
  tobacco: string;
  alcohol: string;
  drug_use: string;
}

export interface History {
  patient_id: string;
  name: string;
  age: number;
  gender: string;
  complete_address: string;
  city_state: string;
  zipcode: string;
  patient_status: string;
  marital_status: string;
  active_problem: string[];
  social_sections: SocialSections;
  social_summary: SocialSummary;
}
export interface HistoryDetail {
  data: {
    patient_id: string;
    name: string;
    age: number;
    gender: string;
    complete_address: string;
    city_state: string;
    zipcode: string;
    patient_status: string;
    marital_status: string;
    active_problem: string[];
    social_sections: SocialSections;
    social_summary: SocialSummary;
  };
}

export interface HistoryResponse {
  count: number;
  limit: number;
  offset: number;
  data: History[];
}
