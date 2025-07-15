import Navbar from "@/components/navbar";
import React from "react";

export default function Userlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
      {/* <section className="flex items-center justify-center h-dvh"> */}
      <section className="relative min-h-screen w-full overflow-hidden bg-[#222831] text-[#DFD0B8]">
        {children}
      </section>
      {/* </section> */}
    </div>
  );
}
