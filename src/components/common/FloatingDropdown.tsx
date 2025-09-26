// @ts-nocheck

import { useEffect } from "react";

export default function FloatingDropdown({
  isOpen,
  position,
  onClose,
  onEdit,
  onDelete,
  record,
}) {
  useEffect(() => {
    if (isOpen && position) {
      // Create dropdown element
      const dropdownElement = document.createElement("div");
      dropdownElement.className =
        "fixed z-50 min-w-[120px] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg py-1";
      dropdownElement.style.top = `${position.top}px`;
      dropdownElement.style.left = `${position.left}px`;

      // Create backdrop
      const backdropElement = document.createElement("div");
      backdropElement.className = "fixed inset-0 z-40";

      // Edit button
      const editButton = document.createElement("button");
      editButton.className =
        "flex items-center gap-2 w-full px-3 py-2 text-sm text-left hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300";
      editButton.innerHTML = `
        <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
        </svg>
        Edit
      `;
      editButton.onclick = () => {
        cleanup();
        onClose();
        if (onEdit && record) onEdit(record);
      };

      // Delete button
      const deleteButton = document.createElement("button");
      deleteButton.className =
        "flex items-center gap-2 w-full px-3 py-2 text-sm text-left hover:bg-gray-50 dark:hover:bg-gray-700 text-red-500";
      deleteButton.innerHTML = `
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
        </svg>
        Delete
      `;
      deleteButton.onclick = () => {
        cleanup();
        onClose();
        if (onDelete && record) onDelete(record);
      };

      // Backdrop close handler
      backdropElement.onclick = () => {
        cleanup();
        onClose();
      };

      // Cleanup function
      const cleanup = () => {
        if (document.body.contains(backdropElement)) {
          document.body.removeChild(backdropElement);
        }
        if (document.body.contains(dropdownElement)) {
          document.body.removeChild(dropdownElement);
        }
      };

      // Append elements
      dropdownElement.appendChild(editButton);
      dropdownElement.appendChild(deleteButton);
      document.body.appendChild(backdropElement);
      document.body.appendChild(dropdownElement);

      // Return cleanup function
      return cleanup;
    }
  }, [isOpen, position, onClose, onEdit, onDelete, record]);

  // This component doesn't render anything in the React tree
  return null;
}
