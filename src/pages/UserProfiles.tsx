import { useEffect, useState } from "react";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import UserInfoCard from "../components/UserProfile/UserInfoCard";
import UserMetaCard from "../components/UserProfile/UserMetaCard";

export default function UserProfiles() {
  const [userData, setUserData] = useState({
    email: "",
    avatar: "",
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
    try {
      const authData = localStorage.getItem(
        "sb-uiraboudhblnffuyanny-auth-token"
      );
      if (authData) {
        const parsed = JSON.parse(authData);
        const meta = parsed?.user?.user_metadata || {};
        setUserData({
          email: parsed?.user?.email || "",
          avatar: meta?.avatar_url || "/images/user/owner.jpg",
          full_name: meta?.full_name || "",
          firstName: meta?.firstName || "",
          lastName: meta?.lastName || "",
          phone: meta?.phone || "",
          bio: meta?.bio || "",
          country: meta?.country || "",
          city: meta?.city || "",
          postalCode: meta?.postalCode || "",
          taxId: meta?.taxId || "",
        });
      }
    } catch (error) {
      console.error("Error parsing Supabase auth token:", error);
    }
  }, []);

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
