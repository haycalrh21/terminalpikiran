import PostsPage from "./_components/posts";
import Userlayout from "@/components/layout/user/userLayout";
import NotFound from "../not-found";
import { getAllPosts } from "../actions/posts/action";
import { Post } from "@/interface/post/post";

export default async function page() {
  const posts = await getAllPosts();

  if (!posts) {
    return <NotFound />;
  }
  return (
    <Userlayout>
      <PostsPage posts={posts as Post[]} />
    </Userlayout>
  );
}
