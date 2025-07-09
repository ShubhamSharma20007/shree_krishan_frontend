import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { NavLink, Link } from "react-router-dom";
import logo2 from '@/assets/logo2.png';
import { Bell } from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

export default function Component() {
  const notifications = [
    { id: 1, message: 'New user registered', time: '2 mins ago' },
    { id: 2, message: 'Inventory updated', time: '10 mins ago' },
    { id: 3, message: 'Stock report generated', time: '1 hour ago' },
  ];

  const NotificationDropdown = () => (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 inline-flex h-2 w-2 rounded-full bg-red-500" />
        </Button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content 
          side="bottom" 
          align="end" 
          sideOffset={8}
          className="rounded-md bg-white p-3 shadow-lg border w-64 z-[9999]"
        >
          <h3 className="text-sm font-semibold mb-2">Notifications</h3>
          {notifications.length === 0 ? (
            <p className="text-xs text-gray-500">No new notifications</p>
          ) : (
            notifications.map((notif) => (
              <DropdownMenu.Item
                key={notif.id}
                className="px-2 py-1 text-sm cursor-pointer hover:bg-gray-100 rounded"
              >
                <div className="font-medium">{notif.message}</div>
                <div className="text-xs text-gray-400">{notif.time}</div>
              </DropdownMenu.Item>
            ))
          )}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );

  return (
    <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6 sticky z-[10] bg-white shadow top-0">
      
      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-4">
          <NavLink to="#" className="mr-6 hidden lg:flex">
            <MountainIcon className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
          </NavLink>
          <div className="grid gap-2 py-6">
            <NavLink to="/" className="flex w-full items-center py-2 text-lg font-semibold">Home</NavLink>
            <NavLink to="/admin/brandlist" className="flex w-full items-center py-2 text-lg font-semibold">Brand List</NavLink>
            <NavLink to="/admin/listing" className="flex w-full items-center py-2 text-lg font-semibold">Product List</NavLink>
            <NavLink to="/admin/product-part-list" className="flex w-full items-center py-2 text-lg font-semibold">Product Part List</NavLink>
            <NavLink to="/admin/inventory" className="flex w-full items-center py-2 text-lg font-semibold">Update Inventory</NavLink>
            <NavLink to="/admin/report" className="flex w-full items-center py-2 text-lg font-semibold">Stock Report</NavLink>

            {/* ✅ Mobile Notification */}
            <div className="mt-4">
              <NotificationDropdown />
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <Link to="/admin" className="mr-6 hidden lg:flex">
        <img src={logo2} className="text-lg h-20 w-25 font-semibold tracking-tighter" alt="Logo" />
        <span className="sr-only">Acme Inc</span>
      </Link>

      {/* Big Screen Navbar */}
      <nav className="ml-auto hidden lg:flex gap-6 items-center">
        <NavLink to="/admin" className="group inline-flex h-9 items-center px-4 text-sm font-medium hover:bg-gray-100">Home</NavLink>
        <NavLink to="/admin/brandlist" className="group inline-flex h-9 items-center px-4 text-sm font-medium hover:bg-gray-100">Brand List</NavLink>
        <NavLink to="/admin/listing" className="group inline-flex h-9 items-center px-4 text-sm font-medium hover:bg-gray-100">Product List</NavLink>
        <NavLink to="/admin/product-part-list" className="group inline-flex h-9 items-center px-4 text-sm font-medium hover:bg-gray-100">Product Part List</NavLink>
        <NavLink to="/admin/inventory" className="group inline-flex h-9 items-center px-4 text-sm font-medium hover:bg-gray-100">Update Inventory</NavLink>
        <NavLink to="/admin/report" className="group inline-flex h-9 items-center px-4 text-sm font-medium hover:bg-gray-100">Stock Report</NavLink>

        {/* ✅ Big Screen Notification */}
        <NotificationDropdown />
      </nav>
    </header>
  );
}

function MenuIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function MountainIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
