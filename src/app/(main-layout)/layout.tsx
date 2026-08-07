import { ReactNode } from "react";
import Navbar from "@/components/shared/main/Navbar";
import Footer from "@/components/shared/main/Footer";
import BackgroundVisuals from "@/components/shared/main/BackgroundVisuals";
import InitialLoader from "@/components/shared/main/InitialLoader";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative min-h-screen bg-[#020205] text-white">
      {/* Brand Initial Loader (Public pages only) */}
      <InitialLoader />

      {/* Background Visuals Layer */}
      <BackgroundVisuals />

      {/* Page Content Layer */}
      <div className="relative z-10 flex flex-col min-h-screen justify-between">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
