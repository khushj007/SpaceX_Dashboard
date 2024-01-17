"use client";
import Image from "next/image";
import logo from "@/public/spacex.png";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

export default function Home() {
  const user = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (user.isSignedIn) {
      router.push("/homepage");
    }
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 gap-4 md:gap-8">
      <Image src={logo} alt="logo.png" width={500} height={800} />

      <Link
        href={"/sign-up"}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300 transition mt-4 md:mt-[${dynamicSpacing}]"
      >
        Get started
      </Link>

      <p className="text-gray-600 mt-4 md:mt-[${dynamicSpacing}]">
        Already a member?
      </p>

      <Link
        href={"/sign-in"}
        className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring focus:border-gray-300 transition"
      >
        SignIn
      </Link>
    </main>
  );
}
