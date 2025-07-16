"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function savePost(data: any) {
  try {
    // Validate required fields
    if (!data.title || !data.content || !data.userId) {
      return {
        success: false,
        error: "Title, content, and user ID are required",
      };
    }

    const post = await prisma.post.create({
      data: {
        title: data.title,
        content: data.content, // Udah Json type di model, ga perlu stringify
        userId: data.userId,
        slug: data.slug,
        image: data.image || null, // Optional image field
      },
    });

    // Revalidate relevant pages
    revalidatePath("/posts");
    revalidatePath("/dashboard");
    revalidatePath("/admin/dashboard/posts");

    return {
      success: true,
      data: post,
    };
  } catch (error) {
    console.error("Error saving post:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to save post. Please try again.",
    };
  }
}

export async function updatePost(id: string, data: any) {
  try {
    // Validate required fields
    if (!data.title || !data.content) {
      return {
        success: false,
        error: "Title and content are required",
      };
    }

    const post = await prisma.post.update({
      where: { id },
      data: {
        title: data.title,
        content: data.content, // Json type, ga perlu stringify
        image: data.image || null, // Optional image field
      },
    });

    // Revalidate relevant pages
    revalidatePath("/posts");
    revalidatePath("/dashboard");
    revalidatePath("/admin/dashboard/posts");

    return {
      success: true,
      data: post,
    };
  } catch (error) {
    console.error("Error updating post:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to update post. Please try again.",
    };
  }
}

export async function deletePost(id: string) {
  try {
    await prisma.post.delete({
      where: { id },
    });

    // Revalidate relevant pages
    revalidatePath("/posts");
    revalidatePath("/dashboard");
    revalidatePath("/admin/dashboard/posts");

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error deleting post:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to delete post. Please try again.",
    };
  }
}
