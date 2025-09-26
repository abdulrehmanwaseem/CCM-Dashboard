// @ts-nocheck

export default function UserInfoCard({ user }) {
  const fields = [
    { label: "First Name", value: user.full_name },
    { label: "Last Name", value: user.lastName },
    { label: "Email address", value: user.email },
    { label: "Phone", value: user.phone },
    { label: "Bio", value: user.bio },
  ];
  console.log(user);

  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
      <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
        Personal Information
      </h4>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7">
        {fields
          .filter((f) => f.value) // Only show if value exists
          .map((f, i) => (
            <div key={i}>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                {f.label}
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {f.value}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}
