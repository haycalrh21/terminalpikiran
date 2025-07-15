import React from "react";
import PostDetailPage from "./_components/postsDetails";
import Userlayout from "@/components/layout/user/userLayout";

export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <Userlayout>
      <PostDetailPage slug={slug} />
    </Userlayout>
  );
}
