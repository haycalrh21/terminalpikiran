// Update your /lib/posts.ts file with this interface
import { JsonValue } from "@prisma/client/runtime/library"; // atau path sesuai Prisma versimu

export interface Post {
  id: string;
  slug: string;
  title: string;
  content: JsonValue; // ✅ ubah dari string ke JsonValue
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  user: {
    id: string;
    name: string;
    image: string | null;
    email: string;
    emailVerified: boolean;
    role: string; // UserRole
    banned: boolean | null;
    banReason: string | null;
    banExpires: Date | null;
    createdAt: Date;
    updatedAt: Date;
  };
}
