import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import ProfilePage from "../_components/profilePage";
import { UpdateUserForm } from "../_components/update-user-form";

// Force dynamic rendering
export const dynamic = "force-dynamic";

export default async function Page() {
  const headersList = await headers();

  const sessionRaw = await auth.api.getSession({
    headers: headersList,
  });

  // Cek session dengan lebih detail
  if (!sessionRaw || !sessionRaw.session || !sessionRaw.user) {
    redirect("/auth/login");
  }

  const session = {
    ...sessionRaw.session,
    user: sessionRaw.user,
  };

  return (
    <ProfilePage session={session}>
      <UpdateUserForm
        image={session.user.image ?? ""}
        name={session.user.name}
      />
    </ProfilePage>
  );
}
