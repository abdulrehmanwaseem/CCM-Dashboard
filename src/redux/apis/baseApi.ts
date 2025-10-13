// @ts-nocheck
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = import.meta.env.VITE_SERVER_BASE_URL;

const baseQueryWithPatient = async (args: any, api: any, extraOptions: any) => {
  if (args.params) {
    let query = "";
    if (args.params.patient_id)
      query += `&patient_id=${args.params.patient_id}`;
    if (args.params.patient_name)
      query += `&patient_name=${args.params.patient_name}`;

    args.url += args.url.includes("?") ? query : query.replace("&", "?");
  }

  return fetchBaseQuery({ baseUrl, credentials: "include" })(
    args,
    api,
    extraOptions
  );
};

export const apis = createApi({
  reducerPath: "apis",
  baseQuery: baseQueryWithPatient,
  tagTypes: ["Auth", "Billing", "Patients"],
  endpoints: () => ({}),
});
