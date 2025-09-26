// @ts-nocheck
import { BillingRecordModal } from "@/components/common/BillingRecordModal";
import { ConfirmationModal } from "@/components/common/ConfirmationModal";
import {
  useCreateOrUpdateBillingMutation,
  useDeleteBillingRecordMutation,
  useGetBillingRecordsQuery,
  useUpdateBillingRecordMutation,
} from "@/redux/apis/billingApi";
import { useState } from "react";
import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import Datatable from "../../components/tables/Datatable";

export default function BillingRecordsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");

  // API Hooks
  const { data: allRecords, refetch } = useGetBillingRecordsQuery({});

  const [createOrUpdateBilling, { isLoading: isCreating }] =
    useCreateOrUpdateBillingMutation();
  const [updateBillingRecord, { isLoading: isUpdating }] =
    useUpdateBillingRecordMutation();
  const [deleteBillingRecord, { isLoading: isDeleting }] =
    useDeleteBillingRecordMutation();

  // Determine which data to display
  const isSearchMode = searchQuery && searchQuery.trim().length > 0;
  const displayData = isSearchMode ? searchResults : allRecords;
  const isSearchInProgress = isSearchMode && (isSearching || isSearchFetching);

  const handleCreateRecord = async (values) => {
    await createOrUpdateBilling(values).unwrap();
    setIsModalOpen(false);
    refetch();
  };

  const handleEditRecord = (record) => {
    setSelectedRecord(record);
    setModalMode("edit");
    setIsModalOpen(true);
  };

  const handleUpdateRecord = async (values) => {
    if (!selectedRecord) return;
    await updateBillingRecord({
      record_id: selectedRecord.id,
      ...values,
    }).unwrap();
    setIsModalOpen(false);
    setSelectedRecord(null);
    refetch();
  };

  const handleDeleteRecord = (record) => {
    setSelectedRecord(record);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedRecord) return;
    await deleteBillingRecord(selectedRecord.id).unwrap();
    setIsDeleteModalOpen(false);
    setSelectedRecord(null);
    refetch();
  };

  const handleAddClick = () => {
    setSelectedRecord(null);
    setModalMode("add");
    setIsModalOpen(true);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <>
      <PageMeta
        title="React.js Billing Records Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Billing Records Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Billing Records" />

      <div className="space-y-6">
        <ComponentCard
          crudCard={true}
          data={displayData}
          createRecordApi={handleCreateRecord}
          onAddClick={handleAddClick}
          onSearch={handleSearch}
          isSearching={isSearchInProgress}
        >
          <div className="space-y-4">
            {/* Search Results Info */}
            {isSearchMode && (
              <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-blue-600 dark:text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                    {isSearchInProgress
                      ? "Searching..."
                      : searchResults && searchResults.length > 0
                      ? `Found ${searchResults.length} result${
                          searchResults.length === 1 ? "" : "s"
                        } for "${searchQuery}"`
                      : `No results found for "${searchQuery}"`}
                  </span>
                </div>
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 text-sm font-medium"
                >
                  Clear search
                </button>
              </div>
            )}

            {/* Data Table */}
            <Datatable
              data={displayData}
              onEdit={handleEditRecord}
              onDelete={handleDeleteRecord}
            />
          </div>
        </ComponentCard>
      </div>

      {/* Billing Record Modal for Add/Edit */}
      <BillingRecordModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={modalMode === "add" ? handleCreateRecord : handleUpdateRecord}
        initialValues={modalMode === "edit" ? selectedRecord : {}}
        isLoading={modalMode === "add" ? isCreating : isUpdating}
      />

      {/* Generic Confirmation Modal for Delete */}
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Billing Record?"
        description="Are you sure you want to delete this billing record? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        isLoading={isDeleting}
      />
    </>
  );
}
