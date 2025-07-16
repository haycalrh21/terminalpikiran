import Tiptap from "../../_components/tiptap";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { UserRole } from "../../../../../prisma/generated/client";

import RichTextEditor from "../../_components/tiptap";
import AdminPage from "../../_components/adminServer";

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
    <AdminPage>
      <div className="p-4 sm:p-6 max-w-full rounded-lg shadow-md overflow-x-auto">
        <RichTextEditor session={session} />
      </div>
    </AdminPage>
  );
}
