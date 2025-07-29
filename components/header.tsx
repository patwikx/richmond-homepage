"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Menu, MapPin, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
  SheetClose,
  SheetFooter,
} from '@/components/ui/sheet';

// A more robust link component for the mobile menu for better styling and tap area
const MobileNavLink = ({ href, icon, title, subtitle }: { href: string; icon: React.ReactNode; title: string; subtitle: string; }) => (
    <a href={href} className="group flex items-center gap-4 rounded-lg p-3 transition-colors hover:bg-slate-100">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
            {icon}
        </div>
        <div>
            <p className="font-semibold text-slate-800">{title}</p>
            <p className="text-sm text-slate-500">{subtitle}</p>
        </div>
    </a>
);

export function Header() {
  const contact = {
    phone: '+63 919 067 7096',
    email: 'apvelandria@rdrealty.com.ph',
    location: 'Cagampang Ext. Brgy. Bula, General Santos City',
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-md">
      {/* === Top Bar for Secondary Info (Desktop only) === */}
      <div className="hidden bg-slate-50 border-b border-slate-200 md:block">
        <div className="container mx-auto flex h-10 max-w-7xl items-center justify-end gap-x-6 px-4 sm:px-6 lg:px-8">
            <a href={`tel:${contact.phone}`} className="flex items-center gap-2 text-sm text-slate-600 transition-colors hover:text-blue-700">
                <Phone size={14} /> <span>{contact.phone}</span>
            </a>
            <a href={`mailto:${contact.email}`} className="flex items-center gap-2 text-sm text-slate-600 transition-colors hover:text-blue-700">
                <Mail size={14} /> <span>{contact.email}</span>
            </a>
        </div>
      </div>
      
      {/* === Main Header Area === */}
      <div className="container mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label="Back to Homepage">
          <Image 
            src="/rlii.png" 
            alt="Richmond Land Innovations Logo" 
            width={80} 
            height={35}
            className="h-auto"
            priority 
          />
        </Link>

        <div className="hidden items-center gap-x-4 md:flex">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <MapPin size={16} className="text-slate-500" /> {contact.location}
            </div>
            <Button asChild size="lg" className="ml-4 bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg transition-shadow">
                <a href="#inquire">Inquire Now</a>
            </Button>
        </div>

        {/* === Polished Mobile Menu === */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Open Menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex w-full flex-col bg-slate-50 p-0 sm:max-w-md">
                <SheetHeader className="border-b bg-white p-4">
                  <div className="flex items-center justify-between">
                    <SheetClose asChild>
                      <Link href="/" aria-label="Back to Homepage">
                        <Image src="/rlii.png" alt="Logo" width={80} height={35} className="h-auto" />
                      </Link>
                    </SheetClose>
                  </div>
                </SheetHeader>
                
                <div className="flex-1 space-y-2 overflow-y-auto bg-white p-4">
                  <nav className="flex flex-col gap-2">
                    <SheetClose asChild>
                      <MobileNavLink href="#" icon={<MapPin size={20}/>} title="Our Location" subtitle={contact.location} />
                    </SheetClose>
                    <SheetClose asChild>
                      <MobileNavLink href={`tel:${contact.phone}`} icon={<Phone size={20}/>} title="Call Us" subtitle={contact.phone} />
                    </SheetClose>
                    <SheetClose asChild>
                      <MobileNavLink href={`mailto:${contact.email}`} icon={<Mail size={20}/>} title="Email Us" subtitle={contact.email} />
                    </SheetClose>
                  </nav>
                </div>

                <SheetFooter className="border-t bg-white p-4 shadow-inner">
                    <Button asChild size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-base shadow-lg">
                        <a href="#inquire">Inquire Now</a>
                    </Button>
                </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}