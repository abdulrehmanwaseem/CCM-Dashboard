// @ts-nocheck
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import Input from "../form/input/InputField";
import { Modal } from "../ui/modal";
import DatePicker from "../form/date-picker";

export interface BillingRecordFormValues {
  amount_billed: number;
  amount_paid: number;
  patient_id: string;
  service_date: string;
  service_description: string;
}

interface BillingRecordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: BillingRecordFormValues) => Promise<unknown>;
  initialValues?: Partial<BillingRecordFormValues>;
  isLoading?: boolean;
}

export const BillingRecordModal: React.FC<BillingRecordModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialValues = {},
  isLoading = false,
}) => {
  const schema = yup.object().shape({
    patient_id: yup.string().required("Patient ID is required"),
    service_date: yup.string().required("Service date is required"),
    service_description: yup.string().required("Description is required"),
    amount_billed: yup
      .number()
      .typeError("Amount billed must be a number")
      .min(1, "Amount billed must be greater than or equals to 1")
      .required("Amount billed is required"),
    amount_paid: yup
      .number()
      .typeError("Amount paid must be a number")
      .min(1, "Amount paid must be greater than or equals to 1")
      .test(
        "not-greater-than-billed",
        "Amount paid cannot be greater than amount billed",
        function (value) {
          const { amount_billed } = this.parent;
          if (!value || !amount_billed) return true;
          return value <= amount_billed;
        }
      )
      .required("Amount paid is required"),
  });

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<BillingRecordFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      patient_id: initialValues?.patient_id || "",
      service_date: initialValues?.service_date || "",
      service_description: initialValues?.service_description || "",
      amount_billed: initialValues?.amount_billed || undefined, // Empty by default
      amount_paid: initialValues?.amount_paid || undefined, // Empty by default
    },
  });

  useEffect(() => {
    if (isOpen) {
      reset({
        amount_billed: initialValues.amount_billed || undefined,
        amount_paid: initialValues.amount_paid || undefined,
        patient_id: initialValues.patient_id || "",
        service_date: initialValues.service_date || "",
        service_description: initialValues.service_description || "",
      });
    }
  }, [isOpen, reset, initialValues?.patient_id]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="max-w-[700px] p-6 lg:p-10"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col px-2 overflow-y-auto custom-scrollbar"
      >
        <div>
          <h5 className="mb-2 font-semibold text-gray-800 modal-title text-theme-xl dark:text-white/90 lg:text-2xl">
            Add Billing Record
          </h5>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Add a new billing record for a patient.
          </p>
        </div>

        <div className="mt-6 space-y-4">
          {/* Service Date */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
              Service Date
            </label>
            <Controller
              control={control}
              name="service_date"
              render={({ field }) => (
                <DatePicker
                  id="service_date"
                  placeholder="YYYY-MM-DD"
                  defaultDate={field.value}
                  onChange={([date]) =>
                    field.onChange(date ? date.toISOString().slice(0, 10) : "")
                  }
                />
              )}
            />
            {errors.service_date && (
              <div className="text-red-500 text-xs">
                {errors.service_date.message}
              </div>
            )}
          </div>

          {/* Patient ID */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
              Patient ID
            </label>
            <Controller
              control={control}
              name="patient_id"
              render={({ field }) => (
                <Input
                  type="text"
                  placeholder="e.g. PAT001"
                  error={!!errors?.patient_id}
                  hint={errors?.patient_id?.message}
                  {...field}
                />
              )}
            />
          </div>

          {/* Description */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
              Description
            </label>
            <Controller
              control={control}
              name="service_description"
              render={({ field }) => (
                <Input
                  type="text"
                  placeholder="e.g. Blood Test Panel"
                  error={!!errors.service_description}
                  hint={errors.service_description?.message}
                  {...field}
                />
              )}
            />
          </div>

          {/* Amount Billed */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
              Amount Billed
            </label>
            <Controller
              control={control}
              name="amount_billed"
              render={({ field }) => (
                <Input
                  type="number"
                  placeholder="e.g. 250"
                  error={!!errors.amount_billed}
                  hint={errors.amount_billed?.message}
                  value={field.value || ""} // Show empty string if undefined
                  onChange={(e) => field.onChange(e.target.value)}
                />
              )}
            />
          </div>

          {/* Amount Paid */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
              Amount Paid
            </label>
            <Controller
              control={control}
              name="amount_paid"
              render={({ field }) => (
                <Input
                  type="number"
                  placeholder="e.g. 50"
                  error={!!errors.amount_paid}
                  hint={errors.amount_paid?.message}
                  value={field.value || ""} // Show empty string if undefined
                  onChange={(e) => field.onChange(e.target.value)}
                />
              )}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center gap-3 mt-6 modal-footer sm:justify-end">
          <button
            onClick={onClose}
            type="button"
            className="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] sm:w-auto"
            disabled={isLoading}
          >
            Close
          </button>

          <button
            type="submit"
            className="btn btn-success btn-update-event flex w-full justify-center items-center gap-2 rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 sm:w-auto disabled:opacity-70"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                Saving...
              </>
            ) : (
              "Save Record"
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};
