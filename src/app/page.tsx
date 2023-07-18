"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    document.title = "Firasat App";
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center gap-4 p-24">
      <h2 className="text-4xl font-bold text-center">Pilih Channel</h2>
      <div className="flex gap-4">
        <Link href={"/goduplo-tv"}>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            GoDuplo TV
          </button>
        </Link>
        <Link href={"/serial-rena-nene"}>
          <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
            Serial Rena Nene
          </button>
        </Link>
      </div>
    </main>
  );
}
