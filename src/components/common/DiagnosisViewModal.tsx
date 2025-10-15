import { closeModal } from "@/redux/slice/modal";
import type { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";

export default function DiagnosisViewModal() {
  const dispatch = useDispatch();
  const { data } = useSelector((state: RootState) => state.modal);

  const problems: string[] = Array.isArray(data) ? data : [];

  return (
    <>
      <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white/90">
        Diagnosis / Active Problems
      </h2>
      {problems.length === 0 ? (
        <p className="text-gray-500 dark:text-white/70 text-sm">
          No active problems found.
        </p>
      ) : (
        <ul className="list-disc pl-8 space-y-1 max-h-80 overflow-y-auto bg-gray-50 dark:bg-white/[0.03] rounded-lg p-3 border dark:border-gray-800">
          {problems.map((problem, idx) => (
            <li key={idx} className="text-sm text-gray-800 dark:text-white/80">
              {problem}
            </li>
          ))}
        </ul>
      )}
      <div className="flex gap-3 mt-4">
        <button
          onClick={() => dispatch(closeModal())}
          className="flex-1 rounded-lg border border-gray-300 dark:border-gray-800 px-4 py-2 text-sm text-gray-700 dark:text-white/70 dark:hover:bg-white/5 dark:hover:text-white"
        >
          Close
        </button>
      </div>
    </>
  );
}
