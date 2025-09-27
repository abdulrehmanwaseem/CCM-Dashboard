// @ts-nocheck

import { closeModal } from "@/redux/slice/modal";
import { AlertTriangle } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Button from "../ui/button/Button";

const ConfirmationModal = () => {
  const dispatch = useDispatch();
  const { data, callback } = useSelector((state) => state.modal);
  const [isLoading, setIsLoading] = useState(false);

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);

    try {
      await callback({ id: data?.id }).unwrap();
      dispatch(closeModal());
      toast.success(data?.successMessage || "Action completed successfully!");
    } catch (error) {
      console.error("Error performing action:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (!isLoading) {
      dispatch(closeModal());
    }
  };

  return (
    <div className="px-2 max-w-lg">
      {/* Warning Icon */}
      <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full">
        <AlertTriangle className="w-6 h-6 text-red-600" />
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
        {data?.title || "Confirm Action"}
      </h3>

      {/* Message */}
      <p className="text-gray-600 text-center mb-6 leading-relaxed">
        {data?.message ||
          "Are you sure you want to perform this action? This cannot be undone."}
      </p>

      {/* Item being affected (optional) */}
      {data?.itemName && (
        <div className="bg-gray-50 rounded-lg p-3 mb-6 border">
          <p className="text-sm text-gray-700 text-center">
            <span className="font-medium">{data.itemLabel || "Item"}:</span>{" "}
            {data.itemName}
          </p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button
          variant="outline"
          onClick={handleCancel}
          disabled={isLoading}
          className="flex-1 h-11"
        >
          Cancel
        </Button>

        <Button
          onClick={formSubmitHandler}
          disabled={isLoading}
          className="flex-1 h-11 bg-red-600 hover:bg-red-700 text-white"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Processing...</span>
            </div>
          ) : (
            data?.confirmText || "Confirm"
          )}
        </Button>
      </div>

      {/* Warning footer */}
      <p className="text-xs text-gray-500 text-center mt-4">
        This action cannot be undone.
      </p>
    </div>
  );
};

export default ConfirmationModal;
