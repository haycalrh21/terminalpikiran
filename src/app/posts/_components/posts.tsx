import Link from "next/link";
import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Post } from "@/interface/post/post";

// ✅ Ambil gambar dari string HTML
function extractFirstImage(htmlContent: string | null): string | null {
  if (!htmlContent) return null;
  const imgRegex = /<img[^>]+src="([^">]+)"/i;
  const match = htmlContent.match(imgRegex);
  return match ? match[1] : null;
}

// ✅ Ambil text dari string HTML
function stripHtmlAndTruncate(
  htmlContent: string | null,
  maxLength = 150
): string {
  if (!htmlContent) return "";
  const text = htmlContent
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}

export default async function PostsPage({ posts }: { posts: Post[] }) {
  return (
    <div className="min-h-screen bg-[#222831] text-[#DFD0B8] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-12">All Posts</h1>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => {
            // ✅ Convert content ke string aman
            const htmlContent =
              typeof post.content === "string"
                ? post.content
                : JSON.stringify(post.content);

            const image =
              extractFirstImage(htmlContent) ||
              post.image ||
              "/default-thumbnail.jpg";

            const preview = stripHtmlAndTruncate(htmlContent);

            return (
              <Link
                key={post.slug}
                href={`/posts/${post.slug}`}
                className="block"
              >
                <Card className="h-full flex flex-col bg-[#31363F] border-[#4A5058] hover:border-[#DFD0B8] transition-colors duration-200 overflow-hidden">
                  <div className="relative w-full h-48">
                    <Image
                      src={image}
                      alt={post.title}
                      fill
                      style={{ objectFit: "cover" }}
                      className="rounded-t-lg"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-[#DFD0B8] text-2xl">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="text-gray-400 text-sm">
                      By {post.user.name} on{" "}
                      {new Date(post.createdAt).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-[#DFD0B8]">{preview}</p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
