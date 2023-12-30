"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const TabsComp = () => {
  const tabs = [
    { id: "posts", label: "Posts" },
    { id: "about", label: "About" },
    { id: "friends", label: "Friends" },
    { id: "images", label: "Images" },
  ];

  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState(getActiveTab(pathname, tabs));
  const user = useSelector((state) => state.user.user);
  useEffect(() => {
    // Update active tab when pathname changes
    setActiveTab(getActiveTab(pathname, tabs));
  }, [pathname, tabs]);

  const changeTab = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div className="flex my-6">
      {tabs.map((tab) => (
        <Link
          href={`/home/profile/${tab.id === "posts" ? `${user?._id}` : tab.id}`}
          key={tab.id}
          onClick={() => changeTab(tab.id)}
          className={`px-4 py-2 mr-2 text-xl duration-300 ${
            activeTab === tab.id
              ? "border-b-2 border-primary text-primary"
              : "border-b-2 border-gray-200 text-gray-800"
          }`}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
};

// Function to determine the active tab based on the pathname
const getActiveTab = (pathname, tabs) => {
  const pathSegments = pathname.split("/");
  return tabs.find((tab) => pathSegments.includes(tab.id))?.id || tabs[0].id;
};

export default TabsComp;
