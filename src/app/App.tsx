import React, { useState } from "react";

// Lazy load components to avoid circular dependencies
const LandingPage = React.lazy(() =>
  import("./components/LandingPage").then((m) => ({
    default: m.LandingPage,
  })),
);
const PatientPortal = React.lazy(() =>
  import("./components/PatientPortal").then((m) => ({
    default: m.PatientPortal,
  })),
);
const DoctorPortal = React.lazy(() =>
  import("./components/DoctorPortal").then((m) => ({
    default: m.DoctorPortal,
  })),
);
const StaffPortal = React.lazy(() =>
  import("./components/StaffPortal").then((m) => ({
    default: m.StaffPortal,
  })),
);

type Portal = "landing" | "patient" | "doctor" | "staff";

export default function App() {
  const [currentPortal, setCurrentPortal] =
    useState<Portal>("landing");

  const handleSelectPortal = (
    portal: "patient" | "doctor" | "staff",
  ) => {
    setCurrentPortal(portal);
  };

  const handleBackToLanding = () => {
    setCurrentPortal("landing");
  };

  return (
    <div className="size-full min-h-screen">
      <React.Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#E8F4F8] to-white">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-[#002D62] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-[#002D62] font-semibold">
                Loading SmartCare HQMS...
              </p>
            </div>
          </div>
        }
      >
        {currentPortal === "landing" && (
          <LandingPage onSelectPortal={handleSelectPortal} />
        )}
        {currentPortal === "patient" && (
          <PatientPortal onBack={handleBackToLanding} />
        )}
        {currentPortal === "doctor" && (
          <DoctorPortal onBack={handleBackToLanding} />
        )}
        {currentPortal === "staff" && (
          <StaffPortal onBack={handleBackToLanding} />
        )}
      </React.Suspense>
    </div>
  );
}