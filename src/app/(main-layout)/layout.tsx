import { ReactNode } from "react";
import Navbar from "@/components/shared/main/Navbar";
import Footer from "@/components/shared/main/Footer";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative min-h-screen flex flex-col justify-between">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;