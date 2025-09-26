// @ts-nocheck

import Button from "@/components/ui/button/Button";
import { HorizontaLDots } from "@/icons";
import Badge from "../ui/badge/Badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

import FloatingDropdown from "@/components/common/FloatingDropdown";
import { useState } from "react";

export default function BasicTableOne({ data, onEdit, onDelete }) {
  const [openDropdownIdx, setOpenDropdownIdx] = useState(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });

  const handleDropdownClick = (idx, event) => {
    if (openDropdownIdx === idx) {
      setOpenDropdownIdx(null);
      return;
    }

    // Get button position
    const rect = event.currentTarget.getBoundingClientRect();
    setDropdownPosition({
      top: rect.bottom + 4,
      left: rect.right - 120, // 120px is dropdown width, align to right edge
    });
    setOpenDropdownIdx(idx);
  };

  const handleCloseDropdown = () => {
    setOpenDropdownIdx(null);
  };

  // if (isError)
  //   return (
  //     <div className="p-4 text-red-500">Failed to load billing records.</div>
  //   );

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <Table>
            {/* Table Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Patient ID
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Service Date
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Description
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Amount Billed
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Amount Paid
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Balance Due
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Payment Status
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 w-20"
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {Array.isArray(data) && data.length > 0 ? (
                data.map((record, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="px-5 py-4 sm:px-6 text-start dark:text-white">
                      {record?.patient_id}
                    </TableCell>
                    <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {record.service_date}
                    </TableCell>
                    <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {record.service_description}
                    </TableCell>
                    <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      ${record.amount_billed}
                    </TableCell>
                    <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      ${record.amount_paid}
                    </TableCell>
                    <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      ${record.balance_due}
                    </TableCell>
                    <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      <Badge
                        size="sm"
                        color={
                          record.payment_status === "Paid"
                            ? "success"
                            : record.payment_status === "Partially Paid"
                            ? "warning"
                            : "error"
                        }
                      >
                        {record.payment_status}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      <div className="flex justify-end">
                        <Button
                          size="xs"
                          variant="outline"
                          className="dropdown-toggle"
                          onClick={(e) => handleDropdownClick(idx, e)}
                        >
                          <HorizontaLDots className="size-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell className="py-6 pl-4 text-gray-400" colSpan={8}>
                    No billing records found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Clean floating dropdown component */}
      <FloatingDropdown
        isOpen={openDropdownIdx !== null}
        position={dropdownPosition}
        onClose={handleCloseDropdown}
        onEdit={onEdit}
        onDelete={onDelete}
        record={openDropdownIdx !== null ? data[openDropdownIdx] : null}
      />
    </>
  );
}
