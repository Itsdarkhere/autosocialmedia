import React from 'react';
import { Home, BarChart2, Settings, HelpCircle, Menu, Disc } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from 'next/link';

interface NavItem {
  icon: React.ReactNode;
  label: string;
  href: string;
}

const NavBar: React.FC = () => {
  return (
    <nav className=" bg-neutral-50 border-b border-b-neutral-300 shadow-sm px-4 ">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between h-16">
          <div className="flex flex-row justify-between w-full">
            <Link href={"/"} className="flex-shrink-0 flex gap-1 justify-center items-center">
              <Disc size={20} className=' text-neutral-900' />
              <span className="font-semibold text-neutral-800 text-2xl">EasyLinkedin</span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex justify-center items-center sm:space-x-8">
              <Link href={"/"} className=' text-neutral-800 text-base font-medium'>Pricing</Link>
              <Link href={"/"} className=' text-neutral-800 text-base font-medium'>Login</Link>
              <Link href={"/"} className=' px-5 py-2 bg-blue-600 text-neutral-100 font-semibold rounded-md'>Sign-up</Link>
            </div>
          </div>
          <div className="sm:hidden flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="flex flex-col space-y-4 mt-4">
                  <Link href={"/"}>Pricing</Link>
                  <Link href={"/"}>Login</Link>
                  <Link href={"/"}>Sign-up</Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;