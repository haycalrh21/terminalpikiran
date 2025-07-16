// lib/auth-utils.ts

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { UserRole } from "../../prisma/generated/client";

export async function getAuthSession() {
  const headersList = await headers();

  const sessionRaw = await auth.api.getSession({
    headers: headersList,
  });

  // Check if session exists and has required data
  if (!sessionRaw || !sessionRaw.session || !sessionRaw.user) {
    redirect("/auth/login");
  }

  return {
    ...sessionRaw.session,
    user: sessionRaw.user,
  };
}

export async function getAdminSession() {
  const session = await getAuthSession();

  // Check if user has ADMIN role
  if (session.user.role !== UserRole.ADMIN) {
    redirect("/profile");
  }

  return session;
}
