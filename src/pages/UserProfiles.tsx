import { useEffect, useState } from "react";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import UserInfoCard from "../components/UserProfile/UserInfoCard";
import UserMetaCard from "../components/UserProfile/UserMetaCard";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function UserProfiles() {
  const { userData: authUser } = useSelector((state: RootState) => state.auth);

  const [userData, setUserData] = useState({
    email: "",
    // avatar: "",
    full_name: "",
    firstName: "",
    lastName: "",
    phone: "",
    bio: "",
    country: "",
    city: "",
    postalCode: "",
    taxId: "",
  });

  useEffect(() => {
    if (authUser) {
      setUserData((prev) => ({
        ...prev,
        email: authUser.email || "",
        avatar: authUser.avatar || "",
        full_name: authUser.full_name || "",
      }));
    }
  }, [authUser]);

  return (
    <>
      <PageMeta
        title="React.js Profile Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Profile Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Profile" />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Profile
        </h3>
        <div className="space-y-6">
          <UserMetaCard user={userData} />
          <UserInfoCard user={userData} />
        </div>
      </div>
    </>
  );
}
