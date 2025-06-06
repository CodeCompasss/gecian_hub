"use client";

import { QuickActions } from "./QuickActions";
import { TimeTableBlock } from "./TimeTable";

const ResponsiveDashboard = () => {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl pt-4">
        <main className="px-3 pb-24">
          <div className="md:flex md:h-[calc(100vh-12rem)] md:gap-6 lg:gap-8">
            <section className="h-[50vh] w-full md:h-full md:w-1/2">
              <TimeTableBlock />
            </section>
            <QuickActions />
          </div>
        </main>
      </div>
    </div>
  );
};

export default ResponsiveDashboard;
