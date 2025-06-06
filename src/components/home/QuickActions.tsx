"use client";
import React from "react";
import { QuickActionButton } from "../QuickActionButton";

export const QuickActions = () => {
  return (
    <div className="pt-8 w-full space-y-4 md:mt-0 md:flex md:h-full md:w-1/2 md:flex-col">
      <div className="space-y-4 md:flex md:flex-1 md:flex-col md:justify-between">
        {/* External Links */}
        <div className="flex gap-3">
          <QuickActionButton
            text="College Login"
            onClick={() =>
              window.open(
                "https://gecskp.etlab.in/user/login",
                "_blank",
                "noopener,noreferrer",
              )
            }
          />
          <QuickActionButton
            text="Bus Time"
            onClick={() => alert("Bus Time feature coming soon!")}
          />
        </div>

        {/* Internal Links */}
        <div className="flex gap-3">
          <QuickActionButton
            text="Lost & Found"
            onClick={() => (window.location.href = "/lost-and-found")}
          />
          <QuickActionButton
            text="SGPA Calculator"
            onClick={() =>
              window.open(
                "https://ktugpa.web.app/",
                "_blank",
                "noopener,noreferrer",
              )
            }
          />
          <QuickActionButton
            text="Hackathon"
            onClick={() =>
              window.open(
                "https://codecompasss.github.io/code_compass_india/repeto",
                "_blank",
                "noopener,noreferrer",
              )
            }
          />
        </div>

        <div className="flex gap-3">
          <QuickActionButton
            text="College Map"
            onClick={() =>
              window.open(
                "https://app.mappedin.com/map/65fbc2aa7c0c4fe5b4cc4683/directions?floor=m_c235d70c9e691132&location=s_fca685ba2c784ab7&departure=s_c0ed60b6daeada7c",
                "_blank",
                "noopener,noreferrer",
              )
            }
          />
          <QuickActionButton
            text="Academic Calendar"
            onClick={() => alert("Academic Calendar feature coming soon!")}
          />
        </div>

        <div className="flex gap-3">
          <QuickActionButton
            text="Club"
            onClick={() => alert("Club details coming soon!")}
          />
          <QuickActionButton
            text="Anonymous Complaint"
            onClick={() => alert("Anonymous Complaint feature coming soon!")}
          />
        </div>

        <div className="flex gap-3">
          <QuickActionButton
            text="Private Hostel"
            onClick={() => alert("Private Hostel information coming soon!")}
          />
          <QuickActionButton
            text="Scholarships"
            onClick={() =>
              window.open(
                "https://codecompasss.github.io/code_compass_india/repeto",
                "_blank",
                "noopener,noreferrer",
              )
            }
          />
          <QuickActionButton
            text="Project Showcase"
            onClick={() =>
              window.open(
                "https://codecompasss.github.io/gecian_archive/",
                "_blank",
                "noopener,noreferrer",
              )
            }
          />
        </div>
      </div>
    </div>
  );
};
