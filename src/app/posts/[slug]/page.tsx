import React from "react";
import PostDetailPage from "./_components/postsDetails";
import Userlayout from "@/components/layout/user/userLayout";
import { GetSlugPost } from "@/app/actions/posts/action";
import { Post } from "@/interface/post/post";

export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await GetSlugPost(slug);

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
        <p className="text-gray-600">
          The post you're looking for doesn't exist.
        </p>
      </div>
    );
  }

  return (
    <Userlayout>
      <PostDetailPage post={data as Post} />
    </Userlayout>
  );
}
