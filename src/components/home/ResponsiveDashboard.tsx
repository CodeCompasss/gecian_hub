"use client";
import { useEffect, useState } from "react";
import TopNavBar from "../topNavbar";
import { QuickActions } from "./QuickActions";
import TimeTableBlock from "./TimeTable";
import { onAuthStateChanged } from "@/lib/firebase/auth"; // Update with correct path
import { User } from "firebase/auth";

const ResponsiveDashboard = () => {
 const [userName, setUserName] = useState<string>("");
const [userPhotoURL, setUserPhotoURL] = useState<string | null>(null);

useEffect(() => {
  const unsubscribe = onAuthStateChanged((authUser: User | null) => {
    if (authUser) {
      setUserName(authUser.displayName || "Student");
      setUserPhotoURL(authUser.photoURL || null);
    } else {
      setUserName("Guest");
      setUserPhotoURL(null);
    }
  });

  return () => unsubscribe();
}, []);


  return (
    <div className="min-h-screen">
      <TopNavBar userName={userName} userPhotoURL={userPhotoURL}  />
      <div className="mx-auto max-w-[var(--max-screen-size)] pt-4">
        <main className="px-3 pb-24">
          <div className="md:flex lg:h-[calc(100vh-12rem)] md:gap-6 lg:gap-8">
            <section className="flex flex-col justify-center w-full md:h-full md:w-1/2 mx-auto">
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
