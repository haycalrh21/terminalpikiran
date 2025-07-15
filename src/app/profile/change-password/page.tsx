import React from "react";
import { ChangePasswordForm } from "../_components/change-password-form";
import ProfilePage from "../_components/profilePage";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export default async function page() {
  const headersList = await headers();

  const sessionRaw = await auth.api.getSession({
    headers: headersList,
  });

  // Cek session dengan lebih detail
  if (!sessionRaw || !sessionRaw.session || !sessionRaw.user) {
    redirect("/auth/login");
    return null; // Tambahkan return untuk safety
  }

  const session = {
    ...sessionRaw.session,
    user: sessionRaw.user,
  };

  return (
    <ProfilePage session={session}>
      <ChangePasswordForm />
    </ProfilePage>
  );
}
