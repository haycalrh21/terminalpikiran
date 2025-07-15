import { getPostBySlug } from "@/lib/posts";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";

export default function PostDetailPage({ slug }: { slug: string }) {
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#222831] text-[#DFD0B8] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Button
            asChild
            variant="ghost"
            className="text-[#DFD0B8]/50 hover:text-primary-foreground"
          >
            <Link href="/posts">
              <ArrowLeftIcon className="mr-2 h-4 w-4" />
              Back to Posts
            </Link>
          </Button>
        </div>

        {post.imageUrl && (
          <div className="relative w-full h-64 sm:h-80 md:h-96 mb-8 rounded-lg overflow-hidden">
            <Image
              src={post.imageUrl || "/placeholder.svg"}
              alt={post.title}
              fill
              style={{ objectFit: "cover" }}
              className="rounded-lg"
              priority
            />
          </div>
        )}

        <h1 className="text-4xl font-extrabold leading-tight mb-4">
          {post.title}
        </h1>
        <p className="text-gray-400 text-sm mb-8">
          By {post.author} on {post.date}
        </p>

        <div
          className="prose prose-invert max-w-none text-[#DFD0B8] leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </div>
  );
}
