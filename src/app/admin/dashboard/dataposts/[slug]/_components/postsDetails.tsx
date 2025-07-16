"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { GetSlugPost } from "@/app/actions/posts/action";

export default function PostsDetails() {
  const pathname = usePathname();
  const router = useRouter();
  const [data, setData] = useState<any>(null);

  const slug = pathname.split("/").pop();

  useEffect(() => {
    const fetchData = async () => {
      if (!slug) return;
      const post = await GetSlugPost(slug);
      setData(post);
    };
    fetchData();
  }, [slug]);

  if (!data) return <div className="p-4">Loading...</div>;

  console.log(data, "data from postsDetails");

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 text-white">
      {/* Back Button */}
      <button
        onClick={() => router.push("/admin/dashboard/dataposts/")}
        className="flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-6 transition-colors"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to Posts
      </button>

      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-extrabold leading-tight break-words mb-4">
          {data.title}
        </h1>
        {data.subtitle && (
          <p className="text-lg text-muted-foreground mb-4">{data.subtitle}</p>
        )}

        {/* Author & Date */}
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          {data.user?.image && (
            <img
              src={data.user.image}
              alt={data.user.name}
              className="w-8 h-8 rounded-full object-cover"
            />
          )}
          <span>
            By{" "}
            <span className="font-semibold text-white">
              {data.user?.name || "Unknown Author"}
            </span>
          </span>
          <span>•</span>
          <span>Updated {new Date(data.updatedAt).toLocaleString()}</span>
        </div>
      </header>

      {/* Gambar utama */}
      {data.image && (
        <div className="w-full overflow-hidden rounded-xl my-8">
          <img
            src={data.image}
            alt={data.title}
            className="w-full h-auto rounded-xl object-cover"
          />
        </div>
      )}

      {/* Konten */}
      <div
        className="prose prose-invert max-w-none mb-8"
        dangerouslySetInnerHTML={{ __html: data.content }}
      />
    </div>
  );
}
