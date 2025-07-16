import { getAuthSession } from "@/utils/auth";
import AdminPageClient from "./adminClient";

interface Props {
  children: React.ReactNode;
}

export default async function AdminPage({ children }: Props) {
  const session = await getAuthSession();

  return <AdminPageClient session={session}>{children}</AdminPageClient>;
}
