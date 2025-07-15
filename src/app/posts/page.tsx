import React from "react";
import PostsPage from "./_components/posts";
import Userlayout from "@/components/layout/user/userLayout";

export default function page() {
  return (
    <Userlayout>
      <PostsPage />
    </Userlayout>
  );
}
