import { ReturnButton } from "@/components/return-button";
import { UserRoleSelect } from "@/components/pages/admin/dashboard/user-role-select";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { UserRole } from "../../../../prisma/generated/client";
import AdminPage from "../_components/adminPage";

export default async function Page() {
  const headersList = await headers();

  const sessionRaw = await auth.api.getSession({
    headers: headersList,
  });

  // Check if session exists and has required data
  if (!sessionRaw || !sessionRaw.session || !sessionRaw.user) {
    redirect("/auth/login");
  }

  const session = {
    ...sessionRaw.session,
    user: sessionRaw.user,
  };

  // Check if user has ADMIN role
  if (session.user.role !== UserRole.ADMIN) {
    redirect("/profile");
  }

  return <AdminPage session={session}>test</AdminPage>;
}
