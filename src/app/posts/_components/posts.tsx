import Link from "next/link";
import Image from "next/image"; // Import Image component
import { getAllPosts } from "@/lib/posts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function PostsPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-[#222831] text-[#DFD0B8] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-12">All Posts</h1>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/posts/${post.slug}`}
              className="block"
            >
              <Card className="h-full flex flex-col bg-[#31363F] border-[#4A5058] hover:border-[#DFD0B8] transition-colors duration-200 overflow-hidden">
                <div className="relative w-full h-48">
                  <Image
                    src={post.imageUrl || "/placeholder.svg"}
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
                    By {post.author} on {post.date}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-[#DFD0B8]">{post.excerpt}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
