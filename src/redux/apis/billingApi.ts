import { apis } from "./baseApi";

const billingApi = apis.injectEndpoints({
  endpoints: (builder) => ({
    // Create or update billing record
    createOrUpdateBilling: builder.mutation({
      query: (body) => ({
        url: "/billing_data/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Billing"],
    }),
    // Get billing records with filters
    getBillingRecords: builder.query({
      query: (params = {}) => {
        const searchParams = new URLSearchParams(params).toString();
        return {
          url: `/billing_data/?${searchParams}`,
        };
      },
      providesTags: ["Billing"],
    }),
    // Get a single billing record
    getBillingRecord: builder.query({
      query: (record_id) => ({
        url: `/billing_data/${record_id}`,
      }),
    }),
    // Update billing record
    updateBillingRecord: builder.mutation({
      query: ({ record_id, ...body }) => ({
        url: `/billing_data/${record_id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Billing"],
    }),
    // Delete billing record
    deleteBillingRecord: builder.mutation({
      query: (record_id) => ({
        url: `/billing_data/${record_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Billing"],
    }),
    // Get dashboard billing summary
    getBillingSummary: builder.query({
      query: () => ({
        url: "/dashboard/billing_summary",
      }),
    }),
    // Search billing records
    searchBillingRecords: builder.query({
      query: (params = {}) => {
        const searchParams = new URLSearchParams(params).toString();
        return {
          url: `/billing_data/search?${searchParams}`,
        };
      },
    }),
  }),
});

export const {
  useCreateOrUpdateBillingMutation,
  useGetBillingRecordsQuery,
  useGetBillingRecordQuery,
  useUpdateBillingRecordMutation,
  useDeleteBillingRecordMutation,
  useGetBillingSummaryQuery,
  useLazySearchBillingRecordsQuery,
} = billingApi;
