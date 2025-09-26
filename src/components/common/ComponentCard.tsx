// @ts-nocheck

import { FileIcon, PaperPlaneIcon, PencilIcon } from "@/icons";
import moment from "moment";
import { useState } from "react";
import { CSVLink } from "react-csv";
import { useModal } from "../../hooks/useModal";
import { BillingRecord } from "../../types/billing";
import Button from "../ui/button/Button";
import {
  BillingRecordFormValues,
  BillingRecordModal,
} from "./BillingRecordModal";
import { useNavigate } from "react-router";

interface ComponentCardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  desc?: string;
  crudCard?: boolean;
  createRecordApi?: (values: BillingRecordFormValues) => Promise<unknown>;
  data?: BillingRecord[];
  onAddClick?: () => void;
  onSearch?: (query: string) => void;
  isSearching?: boolean;
}

const csvHeaders = [
  { label: "Patient ID", key: "patient_id" },
  { label: "Service Date", key: "service_date" },
  { label: "Service Description", key: "service_description" },
  { label: "Amount Billed", key: "amount_billed" },
  { label: "Amount Paid", key: "amount_paid" },
  { label: "Balance Due", key: "balance_due" },
  { label: "Payment Status", key: "payment_status" },
  { label: "Created At", key: "created_at" },
  { label: "Updated At", key: "updated_at" },
];

const ComponentCard: React.FC<ComponentCardProps> = ({
  title,
  children,
  className = "",
  desc = "",
  crudCard = false,
  createRecordApi,
  data = [],
  onAddClick,
}) => {
  const { isOpen, openModal, closeModal } = useModal();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Handle create record
  const handleCreateRecord = async (values: BillingRecordFormValues) => {
    if (!createRecordApi) return;
    setIsLoading(true);
    try {
      await createRecordApi(values);
      closeModal();
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return dateString ? moment(dateString).format("MM/DD/YYYY") : "";
  };

  const formattedData = data?.map((record) => ({
    ...record,
    service_date: formatDate(record.service_date),
    created_at: formatDate(record.created_at),
    updated_at: formatDate(record.updated_at),
  }));

  const handleAddClick = () => {
    if (onAddClick) {
      onAddClick();
    } else {
      openModal();
    }
  };

  return (
    <div
      className={`rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] ${className}`}
    >
      {/* Card Header */}
      {(crudCard || title) && (
        <div className="px-6 py-5">
          {title && (
            <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
              {title}
            </h3>
          )}
          {desc && (
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {desc}
            </p>
          )}
          {crudCard && (
            <div className="flex items-center justify-between">
              <div className="flex gap-4 flex-1">
                <Button
                  size="sm"
                  variant="primary"
                  startIcon={<PencilIcon className="size-5" />}
                  onClick={handleAddClick}
                >
                  Add Record
                </Button>

                <Button
                  size="sm"
                  variant="primary"
                  startIcon={<PaperPlaneIcon className="size-5" />}
                  onClick={() => navigate("/billing/search")}
                >
                  Search Record
                </Button>
              </div>
              <div className="ml-4">
                {data && data.length > 0 ? (
                  <CSVLink
                    data={formattedData}
                    headers={csvHeaders}
                    filename={`billing-records-${moment().format(
                      "YYYY-MM-DD"
                    )}.csv`}
                    className="inline-flex items-center justify-center gap-2 rounded-lg transition bg-white text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03] dark:hover:text-gray-300 px-4 py-3 text-sm"
                  >
                    <FileIcon className="size-5" /> Export Records
                  </CSVLink>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    startIcon={<FileIcon className="size-5" />}
                    disabled
                  >
                    Export Records
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      )}
      {/* Card Body */}
      <div className="p-4 border-t border-gray-100 dark:border-gray-800 sm:p-6">
        <div className="space-y-6">{children}</div>
      </div>

      {/* Modal for Add Record */}
      {crudCard && createRecordApi && !onAddClick && (
        <BillingRecordModal
          isOpen={isOpen}
          onClose={closeModal}
          onSubmit={handleCreateRecord}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default ComponentCard;
