"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import "@/styles/globals.css";

const HomePage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      router.push("/login");
    }, 4000);

    return () => clearTimeout(timer);
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-smooth-blink text-5xl font-bold">
          <Image
            src={"/assets/images/kidneysansfond3.png"}
            alt="Logo image"
            width={500}
            height={40}
          />
        </div>
      </div>
    );
  }

  return null;
};

export default HomePage;
