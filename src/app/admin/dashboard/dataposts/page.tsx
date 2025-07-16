import { prisma } from "@/lib/prisma";
import React from "react";
import TableData from "../../_components/tableData";
import { redirect } from "next/navigation";
import { UserRole } from "../../../../../prisma/generated/client";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import AdminPage from "../../_components/adminPage";

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
    redirect: "/profile";
  }

  const data = await prisma.post.findMany({
    include: {
      user: true,
    },
  });
  console.log("Data fetched:", data);
  return (
    <AdminPage session={session}>
      <TableData data={data} />
    </AdminPage>
  );
}
