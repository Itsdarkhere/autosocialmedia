'use client'
import React, { useState } from 'react';
import { Sun, Moon, User, LogOut, Settings, Menu } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const navItems = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Analytics', href: '/analytics' },
  { label: 'Create', href: '/create' },
  { label: 'Help', href: '/help' },
];

const NavTwo = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // You would typically update your app's theme here
  };

  return (
    <nav className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} shadow-md`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold">EasySocialMedia</span>
          </div>
          
          <div className="hidden md:flex space-x-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  darkMode 
                    ? 'hover:bg-gray-700' 
                    : 'hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User size={20} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu size={20} />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <nav className="flex flex-col space-y-4 mt-4">
                    {navItems.map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        className={`flex items-center px-2 py-2 text-base font-medium rounded-md ${
                          darkMode 
                            ? 'text-gray-300 hover:bg-gray-700 hover:text-white' 
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        {item.label}
                      </a>
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavTwo;