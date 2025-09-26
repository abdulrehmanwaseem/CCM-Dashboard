// @ts-nocheck

import {
  ArrowDownIcon,
  ArrowUpIcon,
  BoxIconLine,
  DollarLineIcon,
  GroupIcon,
  TimeIcon,
} from "../../icons";
import Badge from "../ui/badge/Badge";

const calculatePercentage = (numerator, denominator) => {
  if (!denominator || denominator === 0) return 0;
  return ((numerator / denominator) * 100).toFixed(1);
};

export default function Metrics({ data }) {
  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Format number with commas
  const formatNumber = (num) => {
    return new Intl.NumberFormat("en-US").format(num);
  };

  // Calculate derived metrics
  const paymentRate = data
    ? calculatePercentage(data.paid_records, data.total_records)
    : 0;

  const collectionRate = data
    ? calculatePercentage(data.total_paid, data.total_billed)
    : 0;
  // Metrics data array
  const metricsData = [
    {
      id: 1,
      title: "Total Records",
      value: data ? formatNumber(data.total_records) : "0",
      icon: GroupIcon,
      badge: {
        color: paymentRate >= 70 ? "success" : "warning",
        icon: paymentRate >= 70 ? ArrowUpIcon : ArrowDownIcon,
        text: `${paymentRate}% paid`,
      },
    },
    {
      id: 2,
      title: "Total Billed",
      value: data ? formatCurrency(data.total_billed) : "$0",
      icon: BoxIconLine,
      badge: {
        color:
          collectionRate >= 80
            ? "success"
            : collectionRate >= 60
            ? "warning"
            : "error",
        icon: collectionRate >= 80 ? ArrowUpIcon : ArrowDownIcon,
        text: `${collectionRate}% collected`,
      },
    },
    {
      id: 3,
      title: "Total Paid",
      value: data ? formatCurrency(data.total_paid) : "$0",
      icon: () => <DollarLineIcon className="size-6" />,
      badge: {
        color: "success",
        icon: ArrowUpIcon,
        text: `${data ? formatNumber(data.paid_records) : "0"} records`,
      },
    },
    {
      id: 4,
      title: "Balance Due",
      value: data ? formatCurrency(data.total_balance_due) : "$0",
      icon: () => <TimeIcon className="size-6" />,
      badge: {
        color: "error",
        icon: ArrowUpIcon,
        text: `${
          data
            ? formatNumber(data.unpaid_records + data.partially_paid_records)
            : "0"
        } pending`,
      },
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
      {metricsData.map((metric) => {
        const IconComponent = metric.icon;
        const BadgeIcon = metric.badge.icon;

        return (
          <div
            key={metric.id}
            className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6"
          >
            <div className="flex items-center justify-center text-gray-800 dark:text-gray-100 w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
              <IconComponent className={`size-6`} />
            </div>

            <div className="flex items-end justify-between mt-5">
              <div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {metric.title}
                </span>
                <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                  {metric.value}
                </h4>
              </div>
              <Badge color={metric.badge.color}>
                <BadgeIcon />
                {metric.badge.text}
              </Badge>
            </div>
          </div>
        );
      })}
    </div>
  );
}
