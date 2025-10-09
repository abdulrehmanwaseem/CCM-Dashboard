import {
  CsvFilesResponse,
  HistoryDetail,
  HistoryResponse,
  MedicationsResponse,
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
      query: () => ({
        url: "/dashboard",
      }),
      providesTags: ["Patients"],
    }),
    getAllCSVs: builder.query<CsvFilesResponse, void>({
      query: () => ({
        url: "/csv-files",
      }),
      providesTags: ["Patients"],
    }),
    getPatientsDemographics: builder.query<
      PatientsResponse,
      { limit: number; offset: number }
    >({
      query: ({ limit, offset }) => ({
        url: `/patient-demographics?limit=${limit}&offset=${offset}`,
      }),
      providesTags: ["Patients"],
    }),

    getPatientsGaps: builder.query<
      PatientGapsResponse,
      { limit: number; offset: number }
    >({
      query: ({ limit, offset }) => ({
        url: `/patient-gaps?limit=${limit}&offset=${offset}`,
      }),
      providesTags: ["Patients"],
    }),
    getPatientsVitals: builder.query<
      VitalsResponse,
      { limit: number; offset: number }
    >({
      query: ({ limit, offset }) => ({
        url: `/patient-vitals?limit=${limit}&offset=${offset}`,
      }),
      providesTags: ["Patients"],
    }),
    getPatientsMedication: builder.query<
      MedicationsResponse,
      { limit: number; offset: number }
    >({
      query: ({ limit, offset }) => ({
        url: `/patient-medications?limit=${limit}&offset=${offset}`,
      }),
      providesTags: ["Patients"],
    }),
    getPatientsMetrics: builder.query({
      query: () => ({
        url: "/patient-metrics",
      }),
      providesTags: ["Patients"],
    }),
    getPatientsHistory: builder.query<
      HistoryResponse,
      { limit: number; offset: number }
    >({
      query: ({ limit, offset }) => ({
        url: `/patient-history?limit=${limit}&offset=${offset}`,
      }),
      providesTags: ["Patients"],
    }),
    getHistoryById: builder.query<HistoryDetail, string>({
      query: (patient_id) => ({
        url: `/patient-history/${patient_id}`,
      }),
      providesTags: ["Patients"],
    }),
    getPatientsSummaryById: builder.query<Patient, string>({
      query: (patient_id) => ({
        url: `/patient-summary/${patient_id}`,
      }),
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
