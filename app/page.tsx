"use client";
import Link from "next/link";
import { useEffect } from "react";
import "./globals.css";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    document.title = "Firasat App";
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center gap-4 p-24">
      <h2 className="text-4xl font-bold text-center">Pilih Channel</h2>
      <div className="flex gap-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => router.push("/goduplo-tv")}
        >
          GoDuplo TV
        </button>
        <button
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => router.push("/serial-rena-nene")}
        >
          Serial Rena Nene
        </button>
      </div>
    </main>
  );
}
