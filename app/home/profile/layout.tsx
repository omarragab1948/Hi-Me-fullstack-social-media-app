import type { Metadata } from "next";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import TabsComp from "@/app/components/Tabs";
import ProfLayout from "@/app/components/ProfLayout";
export const metadata: Metadata = {
  title: "Profile",
  description: "HI-ME is a social media platform",
};
const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ProfLayout />
      <div
        className="mt-40 flex flex-col w-3/4 mx-auto  border-t border-slate-400  justify-end"
        style={{ direction: "rtl" }}
      >
        <TabsComp />
        {children}
      </div>
    </>
  );
};

export default layout;
