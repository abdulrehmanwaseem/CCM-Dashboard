import {
  CsvFilesResponse,
  HistoryDetail,
  HistoryResponse,
  MedicationsResponse,
  MetricsResponse,
  Patient,
  PatientDashboard,
  PatientGapsResponse,
  PatientsResponse,
  VitalsResponse,
} from "@/types/patients";
import { apis } from "./baseApi";

const patientsApi = apis.injectEndpoints({
  endpoints: (builder) => ({
    getDashboard: builder.query<PatientDashboard, void>({
      query: () => ({ url: "/dashboard" }),
      providesTags: ["Patients"],
    }),
    getAllCSVs: builder.query<CsvFilesResponse, void>({
      query: () => ({ url: "/csv-files" }),
      providesTags: ["Patients"],
    }),
    getPatientsDemographics: builder.query<
      PatientsResponse,
      {
        limit: number;
        offset: number;
        patient_id?: string;
        patient_name?: string;
      }
    >({
      query: ({ limit, offset, patient_id, patient_name }) => ({
        url: `/patient-demographics?limit=${limit}&offset=${offset}`,
        params: { patient_id, patient_name },
      }),
      providesTags: ["Patients"],
    }),
    getPatientsGaps: builder.query<
      PatientGapsResponse,
      {
        limit: number;
        offset: number;
        patient_id?: string;
        patient_name?: string;
        fields?: string;
      }
    >({
      query: ({ limit, offset, patient_id, patient_name, fields }) => {
        let url = `/patient-gaps?limit=${limit}&offset=${offset}`;
        if (fields) url += `&fields=${fields}`;
        return { url, params: { patient_id, patient_name } };
      },
      providesTags: ["Patients"],
    }),
    getPatientsVitals: builder.query<
      VitalsResponse,
      {
        limit: number;
        offset: number;
        patient_id?: string;
        patient_name?: string;
      }
    >({
      query: ({ limit, offset, patient_id, patient_name }) => ({
        url: `/patient-vitals?limit=${limit}&offset=${offset}`,
        params: { patient_id, patient_name },
      }),
      providesTags: ["Patients"],
    }),
    getPatientsMedication: builder.query<
      MedicationsResponse,
      {
        limit: number;
        offset: number;
        patient_id?: string;
        patient_name?: string;
      }
    >({
      query: ({ limit, offset, patient_id, patient_name }) => ({
        url: `/patient-medications?limit=${limit}&offset=${offset}`,
        params: { patient_id, patient_name },
      }),
      providesTags: ["Patients"],
    }),
    getPatientsMetrics: builder.query<
      MetricsResponse,
      {
        limit: number;
        offset: number;
        patient_id?: string;
        patient_name?: string;
      }
    >({
      query: ({ limit, offset, patient_id, patient_name }) => ({
        url: `/patient-metrics?limit=${limit}&offset=${offset}`,
        params: { patient_id, patient_name },
      }),
      providesTags: ["Patients"],
    }),
    getPatientsHistory: builder.query<
      HistoryResponse,
      {
        limit: number;
        offset: number;
        patient_id?: string;
        patient_name?: string;
      }
    >({
      query: ({ limit, offset, patient_id, patient_name }) => ({
        url: `/patient-history?limit=${limit}&offset=${offset}`,
        params: { patient_id, patient_name },
      }),
      providesTags: ["Patients"],
    }),
    getHistoryById: builder.query<HistoryDetail, string>({
      query: (patient_id) => ({ url: `/patient-history/${patient_id}` }),
      providesTags: ["Patients"],
    }),
    getPatientsSummaryById: builder.query<Patient, string>({
      query: (patient_id) => ({ url: `/patient-summary/${patient_id}` }),
      providesTags: ["Patients"],
    }),
  }),
});

export const {
  useGetDashboardQuery,
  useGetAllCSVsQuery,
  useGetPatientsDemographicsQuery,
  useGetPatientsGapsQuery,
  useGetPatientsVitalsQuery,
  useGetPatientsMedicationQuery,
  useGetPatientsMetricsQuery,
  useGetPatientsSummaryByIdQuery,
  useGetPatientsHistoryQuery,
  useGetHistoryByIdQuery,
} = patientsApi;
