"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function HeroSection({}) {
  // isMenuOpen state and related logic are now handled by the Navbar component
  // No need for them here unless HeroSection has its own distinct mobile menu

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#222831] text-[#DFD0B8]">
      {/* Background animation */}
      <div className="absolute inset-0 z-0">
        <div className="absolute left-[10%] top-[20%] h-24 w-24 animate-float-1 rounded-full bg-white/40 opacity-20 blur-xl" />
        <div className="absolute right-[15%] top-[50%] h-32 w-32 animate-float-2 rounded-full bg-white/40 opacity-20 blur-xl" />
        <div className="absolute left-[50%] top-[80%] h-20 w-20 animate-float-3 rounded-full bg-white/40 opacity-20 blur-xl" />
        <div className="absolute left-[30%] top-[70%] h-28 w-28 animate-float-4 rounded-full bg-white/40 opacity-20 blur-xl" />
        <div className="absolute right-[5%] top-[10%] h-16 w-16 animate-float-5 rounded-full bg-white/40 opacity-20 blur-xl" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-16 text-center md:px-10 lg:px-20 lg:py-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl space-y-6"
        >
          <motion.h1
            variants={itemVariants}
            className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl leading-tight"
          >
            Unleash Your Thoughts, Share Your Stories
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-300 sm:text-xl md:text-2xl leading-relaxed"
          >
            Dive into a world of captivating articles, insightful discussions,
            and inspiring narratives. Your journey into knowledge starts here.
          </motion.p>
          <motion.div variants={itemVariants}>
            <Button
              asChild
              className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-lg font-semibold text-primary-foreground shadow-lg transition-all duration-300 hover:scale-105 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <Link href="#">Explore Posts</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float-up-down {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-40px); /* Vertical movement */
          }
        }
        .animate-float-1 {
          animation: float-up-down 8s ease-in-out infinite;
        }
        .animate-float-2 {
          animation: float-up-down 10s ease-in-out infinite 1s;
        }
        .animate-float-3 {
          animation: float-up-down 7s ease-in-out infinite 2s;
        }
        .animate-float-4 {
          animation: float-up-down 9s ease-in-out infinite 0.5s;
        }
        .animate-float-5 {
          animation: float-up-down 6s ease-in-out infinite 1.5s;
        }
      `}</style>
    </section>
  );
}
