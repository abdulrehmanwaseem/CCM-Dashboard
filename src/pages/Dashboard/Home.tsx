// @ts-nocheck

import CCMRecords from "@/components/ccm/CCMRecords";
import PageMeta from "@/components/common/PageMeta";
import CSVRecords from "@/components/metrices/CSVRecords";
import MonthlyTarget from "@/components/metrices/MonthlyTarget";
import StatisticsChart from "@/components/metrices/StatisticsChart";

export default function Home() {
  return (
    <>
      <PageMeta
        title="DashCCM - Admin Dashboard"
        description="This is React.js Ecommerce Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 xl:col-span-5">
          <MonthlyTarget />
        </div>
        <div className="col-span-12 space-y-6 xl:col-span-7">
          <CCMRecords />
        </div>

        <div className="col-span-12">
          <CSVRecords />
        </div>
        <div className="col-span-12">
          <ComingSoonOverlay title="Patient Statistics Overview">
            <StatisticsChart />
          </ComingSoonOverlay>
        </div>
      </div>
    </>
  );
}

const ComingSoonOverlay = ({ children, title = "Available Soon" }) => {
  return (
    <div className="relative">
      {/* Original content with reduced opacity */}
      <div className="opacity-70 pointer-events-none">{children}</div>

      {/* Overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm rounded-2xl">
        <div className="text-center p-6">
          {/* Icon */}
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-blue-100 dark:bg-blue-900/20 rounded-full">
            <svg
              className="w-8 h-8 text-blue-600 dark:text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          {/* Title */}
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            {title}
          </h3>

          {/* Subtitle */}
          <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xs">
            This feature is currently under development and will be available
            soon.
          </p>

          {/* Badge */}
          <div className="inline-flex items-center px-3 py-1 mt-4 text-xs font-medium text-blue-600 bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 rounded-full">
            <div className="w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full mr-2 animate-pulse"></div>
            Coming Soon
          </div>
        </div>
      </div>
    </div>
  );
};
