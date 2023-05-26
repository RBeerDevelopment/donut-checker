import { Suspense } from "react";
import { TimeSection } from "./time-section";
import { TimeSectionLoading } from "./time-section-loading";

export default async function Home() {
  return (
    <main className="flex flex-col gap-4 w-screen h-screen justify-center items-center bg-black text-white">
      <Suspense fallback={<TimeSectionLoading />}>
        {/* @ts-expect-error Server Component */}
        <TimeSection />
      </Suspense>
    </main>
  );
}
