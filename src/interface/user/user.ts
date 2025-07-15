export interface ProfilePageProps {
  session: {
    expiresAt: Date;
    token: string;
    userAgent?: string | null;
    user: {
      id: string;
      name: string;
      email: string;
      image?: string | null;
      createdAt: Date;
      role: "USER" | "ADMIN";
      giraffeFact: string;
    };
  };
}
