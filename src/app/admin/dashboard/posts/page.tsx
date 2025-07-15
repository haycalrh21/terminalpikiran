import Tiptap from "../../_components/tiptap";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { UserRole } from "../../../../../prisma/generated/client";
import AdminPage from "../../_components/adminPage";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";

export default async function page() {
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

  return (
    <AdminPage session={session}>
      <div className=" p-4 rounded-lg shadow-md">
        <SimpleEditor />
      </div>
    </AdminPage>
  );
}
