import React from 'react';
import { Home, BarChart2, Settings, HelpCircle, Menu } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

interface NavItem {
  icon: React.ReactNode;
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { icon: <Home size={20} />, label: 'Dashboard', href: '/create' },
  { icon: <BarChart2 size={20} />, label: 'Analytics', href: '/' },
  { icon: <Settings size={20} />, label: 'Settings', href: '/settings' },
  { icon: <HelpCircle size={20} />, label: 'Help', href: '/help' },
];

const NavBar: React.FC = () => {
  return (
    <nav className="bg-white shadow-sm px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between h-16">
          <div className="flex flex-row justify-between w-full">
            <div className="flex-shrink-0 flex items-center">
              <span className="font-semibold text-zinc-500 text-xl">EasySocialMedia</span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                >
                  {item.icon}
                  <span className="ml-2">{item.label}</span>
                </a>
              ))}
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
                  {navItems.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className="flex items-center px-2 py-2 text-base font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900"
                    >
                      {item.icon}
                      <span className="ml-3">{item.label}</span>
                    </a>
                  ))}
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