"use client";
import TopNavBar from '../topNavbar';
import { QuickActions } from "./QuickActions";
import { TimeTableBlock } from "./TimeTable";

const ResponsiveDashboard = () => {
  return (
    <div className="min-h-screen">
      <TopNavBar userName="John Doe" semester={4} department="CSE" />
      <div className="mx-auto max-w-[var(--max-screen-size)] pt-4">
        <main className="px-3 pb-24">
          <div className="md:flex lg:h-[calc(100vh-12rem)] md:gap-6 lg:gap-8">
            <section className="flex flex-col justify-center h-[64vh] w-full md:h-full md:w-1/2 mx-auto">
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
