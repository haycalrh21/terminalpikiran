"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  MenuIcon,
  XIcon,
  TwitterIcon,
  GithubIcon,
  LinkedinIcon,
} from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const navLinkVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <nav className="relative z-20 flex items-center justify-between p-6 md:px-10 lg:px-20 bg-[#222831] text-[#DFD0B8]">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-bold tracking-tight"
      >
        <Link href="/" className="hover:text-primary-foreground">
          <img src="/logo.png" className="object-center w-30" />
        </Link>
      </motion.div>

      {/* Desktop Navigation */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="hidden items-center space-x-8 md:flex"
      >
        <motion.div variants={navLinkVariants}>
          <Link
            href="/"
            className="text-lg font-medium hover:text-primary-foreground"
          >
            Home
          </Link>
        </motion.div>
        <motion.div variants={navLinkVariants}>
          <Link
            href="#"
            className="text-lg font-medium hover:text-primary-foreground"
          >
            About
          </Link>
        </motion.div>
        <motion.div variants={navLinkVariants}>
          <Link
            href="/posts"
            className="text-lg font-medium hover:text-primary-foreground"
          >
            Posts
          </Link>
        </motion.div>
      </motion.div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <XIcon className="h-6 w-6" />
          ) : (
            <MenuIcon className="h-6 w-6" />
          )}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute left-0 right-0 top-full z-10 flex flex-col items-center space-y-4 bg-[#222831] p-6 md:hidden shadow-lg"
        >
          <Link
            href="/"
            className="text-lg font-medium hover:text-primary-foreground"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="#"
            className="text-lg font-medium hover:text-primary-foreground"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
          <Link
            href="/posts"
            className="text-lg font-medium hover:text-primary-foreground"
            onClick={() => setIsMenuOpen(false)}
          >
            Posts
          </Link>
          <div className="flex space-x-4 pt-2">
            <Link
              href="#"
              aria-label="Twitter"
              className="hover:text-primary-foreground"
            >
              <TwitterIcon className="h-6 w-6" />
            </Link>
            <Link
              href="#"
              aria-label="GitHub"
              className="hover:text-primary-foreground"
            >
              <GithubIcon className="h-6 w-6" />
            </Link>
            <Link
              href="#"
              aria-label="LinkedIn"
              className="hover:text-primary-foreground"
            >
              <LinkedinIcon className="h-6 w-6" />
            </Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
