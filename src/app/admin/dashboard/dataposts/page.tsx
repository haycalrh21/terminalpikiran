import { prisma } from "@/lib/prisma";
import React from "react";
import TableData from "../../_components/tableData";
import { redirect } from "next/navigation";
import { UserRole } from "../../../../../prisma/generated/client";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import AdminPage from "../../_components/adminServer";

export default async function page() {
  const data = await prisma.post.findMany({
    include: {
      user: true,
    },
  });

  return (
    <AdminPage>
      <TableData data={data} />
    </AdminPage>
  );
}
