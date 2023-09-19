import {Menu } from "lucide-react";
import { Button} from "./ui/button";
import MobileSidebar from "./mobile-sidebar";
import { getApiLimitCount } from "@/lib/api-limit";
//import { checkSubscription } from "@/lib/subscription";


import React from 'react'
import { UserButton } from "@clerk/nextjs";

const Navbar =async () => {
  const apiLimitCount = await getApiLimitCount();
  //const isPro = await checkSubscription();
  return (
    <div className="flex items-center p-4">
      <MobileSidebar isPro={false} apiLimitCount={apiLimitCount} />
      <div className="flex w-full justify-end">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
}

export default Navbar
