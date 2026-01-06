import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="relative w-full h-screen">
        <Image
          src="/images/hero.webp"
          alt="Landing"
          fill
          className="object-cover"
          priority
        />
      </div>
    </main>
  );
}
