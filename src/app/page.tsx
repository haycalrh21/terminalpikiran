import Userlayout from "@/components/layout/user/userLayout";
import { GetStartedButton } from "@/components/pages/index/get-started-button";
import HeroSection from "@/components/pages/index/hero";

export default function Page() {
  return (
    // <div className="flex items-center justify-center h-dvh">
    //   <div className="flex justify-center gap-8 flex-col items-center">
    //     <h1 className="text-6xl font-bold">Better Auth</h1>
    //     ss
    //     <GetStartedButton />
    //   </div>
    // </div>
    <Userlayout>
      <HeroSection />
    </Userlayout>
  );
}
