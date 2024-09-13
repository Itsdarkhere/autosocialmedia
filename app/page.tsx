import Hero from "@/components/Hero";
import Notified from "@/components/Notified";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-neutral-50 px-4">
      <Hero />
      <div className="w-full py-8">
        <Notified />
      </div>
    </main>
  );
}
