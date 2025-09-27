import { subMinutes } from "date-fns";

function minutesAgo(n: number) {
  return subMinutes(new Date(), n).toISOString();
}

const patientsData = Array.from({ length: 20 }).map((_, i) => {
  const id = `P-${1000 + i}`;
  const names = [
    "Sarah Chen",
    "Michael Rodriguez",
    "Emma Thompson",
    "James Wilson",
    "Olivia Brown",
    "Liam Johnson",
    "Noah Davis",
    "Ava Martinez",
    "Sophia Garcia",
    "Mason Lee",
    "Isabella Taylor",
    "Lucas Anderson",
    "Mia Thomas",
    "Amelia White",
    "Ethan Harris",
    "Harper Clark",
    "Benjamin Lewis",
    "Charlotte Walker",
    "Logan Hall",
    "Evelyn Allen",
  ];

  const statuses = ["completed", "pending", "flagged"];
  const cptPool = ["97110", "97112", "99396", "99397", "99386"];

  const idx = i % names.length;
  const status = statuses[i % statuses.length];
  const cpt = cptPool[i % cptPool.length];

  const total = 10 + ((i * 7) % 30);
  const prev = Math.max(0, total - (i % 6));
  const billable = Math.max(0, Math.floor(total * 0.85));

  return {
    patient_id: id,
    patient_name: names[idx],
    cpt_code: cpt,
    previous_minutes_counted: prev,
    total_minutes_counted: total,
    minutes_documented: total,
    total_amount_billed: `$${Math.max(0, Math.floor(total * 7.5)).toFixed(2)}`,
    provider_id: `PR-${10 + (i % 25)}`,
    visit_note_id: `VN-${4300 + i}`,
    message_id: `MSG-${9000 + i}`,
    order_id: `ORD-${770 + i}`,
    ccm_report_id: `CCM-${3000 + i}`,
    timestamp: minutesAgo(i * 3),
    date_range: "2025-09-01 - 2025-09-26",
    content: `Sample note for ${names[idx]} (record ${i + 1}).`,
    category: i % 2 === 0 ? "Care Coordination" : "Medication Review",
    duplicates_detected: i % 3,
    missing_minutes_flag: i % 7 === 0,
    total_minutes: total,
    billable_minutes: billable,
    non_billable_minutes: total - billable,
    billing_status: status,
    created_at: minutesAgo(i * 30),
    updated_at: minutesAgo(i * 10),
  };
});

export default patientsData;
