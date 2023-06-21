import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-4 p-24">
      <h2 className="text-4xl font-bold text-center">Pilih Channel</h2>
      <div className="flex gap-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          GoDuplo TV
        </button>
        <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
          <Link href={"/serial-rena-nene"}>Serial Rena Nene</Link>
        </button>
      </div>
    </main>
  );
}
