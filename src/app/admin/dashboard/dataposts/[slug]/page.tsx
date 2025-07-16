//server component

import AdminPage from "@/app/admin/_components/adminServer";
import PostsDetails from "./_components/postsDetails";

export default async function Page() {
  return (
    <AdminPage>
      <PostsDetails />
    </AdminPage>
  );
}
