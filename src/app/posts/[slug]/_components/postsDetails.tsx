import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { Post } from "@/interface/post/post";

// Function to extract first image from HTML content
function extractFirstImage(htmlContent: string | null): string | null {
  if (!htmlContent) return null;

  const imgRegex = /<img[^>]+src="([^">]+)"/i;
  const match = htmlContent.match(imgRegex);
  return match ? match[1] : null;
}

export default function PostDetailPage({ post }: { post: Post }) {
  console.log("Post Detail Page Data:", post);
  // Add null checks for post and post.user
  if (!post) {
    return (
      <div className="min-h-screen bg-[#222831] text-[#DFD0B8] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <p className="text-center text-red-400">Post not found</p>
        </div>
      </div>
    );
  }

  // Safe access to user data with fallbacks
  const authorName = post.user?.name || "Unknown Author";
  const createdDate = post.createdAt
    ? new Date(post.createdAt).toLocaleDateString()
    : "Unknown Date";

  // Handle content based on its type (JsonValue vs string)
  const contentHtml =
    typeof post.content === "string"
      ? post.content
      : post.content
      ? JSON.stringify(post.content)
      : "";

  return (
    <div className="min-h-screen bg-[#222831] text-[#DFD0B8] ">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Button
            asChild
            variant="ghost"
            className="text-[#DFD0B8]/50 hover:text-[#DFD0B8] hover:bg-[#31363F]"
          >
            <Link href="/posts">
              <ArrowLeftIcon className="mr-2 w-4" />
              Back to Posts
            </Link>
          </Button>
        </div>

        <h1 className="text-4xl font-extrabold leading-tight mb-4 text-[#DFD0B8]">
          {post.title || "Untitled Post"}
        </h1>
        <p className="text-gray-400 text-sm mb-8">
          By {authorName} on {createdDate}
        </p>

        <div
          className="prose prose-invert max-w-none text-[#DFD0B8] leading-relaxed prose-img:rounded-lg prose-img:shadow-lg prose-headings:text-[#DFD0B8] prose-p:text-[#DFD0B8] prose-strong:text-[#DFD0B8] prose-em:text-[#DFD0B8]"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </div>
    </div>
  );
}
