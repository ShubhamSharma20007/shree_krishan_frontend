
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { NavLink } from "react-router-dom"
import logo2 from '@/assets/logoRed.png'
import { Link } from "react-router-dom"
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar"
import { BellIcon } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useFetch } from '@/hooks/useFetch';
import NotificationServiceInstance from '../../../../service/notification.service';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom"
import Cookies from 'js-cookie';
export default function Component() {
  const { fn: getNotificationFn, data: getNotificationRes, loading: notificationLoading } = useFetch(NotificationServiceInstance.getNotification);
  const [notifications, setNotifications] = useState([]);
  const [isSideBarOpen,setIsSideBarOpen] = useState(false)

  const navigate  = useNavigate()
  useEffect(() => {
    getNotificationFn();
  }, []);


  useEffect(() => {
    if (getNotificationRes && Array.isArray(getNotificationRes?.alerts)) {
      setNotifications(getNotificationRes.alerts);
    }
  }, [getNotificationRes]);


  console.log(getNotificationRes?.alerts,12)


  return (
    <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6 sticky z-[10] bg-white shadow top-0">

      {/* Mobile Sidebar */}
      <Sheet open={isSideBarOpen} onOpenChange={setIsSideBarOpen}>
        <SheetTrigger asChild className="print:hidden">
          <div className="flex justify-between items-center w-full md:w-auto space-x-2.5  ">
          <Button variant="outline" size="icon" className="lg:hidden" onClick={()=>setIsSideBarOpen(true)}>
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
    <div className="flex justify-between items-center gap-3 md:hidden">

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="secondary" size="icon">
              <div className="relative">
                {notifications.length > 0 && (
                  <div className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500" />
                )}
                <BellIcon />
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64 max-h-80 overflow-y-auto">
            <DropdownMenuLabel>Stock Alert Notifications 🔔</DropdownMenuLabel>
            <DropdownMenuSeparator />

            {notifications.length > 0 ? (
          notifications.map((alert, index) => (
            <DropdownMenuItem key={index} className="flex flex-col items-start px-3 py-2 rounded-md hover:bg-indigo-50 transition duration-200">
            <div className="flex items-center justify-between w-full">
              <span className="text-sm font-medium text-gray-700 capitalize">
                {alert.productName} - {alert.productPartName}
              </span>
    
              {alert.expDate && (
                <span className="ml-2 px-2 py-0.5 text-xs bg-yellow-100 text-yellow-700 font-medium rounded-md">
                  Exp Date: {new Date(alert.expDate).toLocaleDateString()}
                </span>
              )}
            </div>
    
            <span className="mt-1 px-2 py-0.5 text-xs bg-green-100 text-green-700 font-medium rounded-md">
              Stock Left: {alert.stockQuantity}
            </span>
          </DropdownMenuItem>
        ))
      ) : (
              <DropdownMenuItem>No new notifications</DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>



        <DropdownMenu>
          <DropdownMenuTrigger>
           
        <Avatar>
          <AvatarImage src="" />
          <AvatarFallback>SS</AvatarFallback>
        </Avatar>
          </DropdownMenuTrigger>
         <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem  onClick={()=>{
    navigate('/')
    }}>Back To Home</DropdownMenuItem>
    <DropdownMenuItem  onClick={()=>{
    Cookies.remove('token')
    navigate('/login')
    }} >Logout</DropdownMenuItem>
  </DropdownMenuContent>
        </DropdownMenu>

    </div>

</div>
        </SheetTrigger>
        <SheetContent side="left" className="p-4">
          <NavLink to="#" className="mr-6 hidden lg:flex">
            <MountainIcon className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
          </NavLink>
          <div className="grid gap-2 py-6">
            <NavLink to="/" className="flex w-full items-center py-2 text-lg font-semibold" onClick={()=>setIsSideBarOpen(false)}>Home</NavLink>
            <NavLink to="/admin/brandlist" className="flex w-full items-center py-2 text-lg font-semibold"  onClick={()=>setIsSideBarOpen(false)}>Brand List</NavLink>
            <NavLink to="/admin/listing" className="flex w-full items-center py-2 text-lg font-semibold"  onClick={()=>setIsSideBarOpen(false)}>Product List</NavLink>
            <NavLink to="/admin/product-part-list" className="flex w-full items-center py-2 text-lg font-semibold"  onClick={()=>setIsSideBarOpen(false)}>Product Part List</NavLink>
            <NavLink to="/admin/inventory" className="flex w-full items-center py-2 text-lg font-semibold"  onClick={()=>setIsSideBarOpen(false)}>Update Inventory</NavLink>
            <NavLink to="/admin/report" className="flex w-full items-center py-2 text-lg font-semibold"  onClick={()=>setIsSideBarOpen(false)}>Stock Report</NavLink>
            <NavLink to="/admin/contact-report" className="flex w-full items-center py-2 text-lg font-semibold"  onClick={()=>setIsSideBarOpen(false)}>Contact Report</NavLink>


          </div>
        </SheetContent>
      </Sheet>

      <Link to="/admin/dashboard" className="mr-6 hidden lg:flex">
        <img src={logo2} className="text-lg h-12 w-25 font-semibold tracking-tighter" alt="Logo" />
        <span className="sr-only">Shree Mobile Repairs</span>
      </Link>
      {/* Big Screen NavBar */}
      <nav className="ml-auto hidden lg:flex gap-6">
        <NavLink
          to="/admin/dashboard"
          className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"

        >
          Home
        </NavLink>

        <NavLink
          to="/admin/brandlist"
          className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"

        >
          Brand List
        </NavLink>
        <NavLink
          to="/admin/listing"
          className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"

        >
          Product List
        </NavLink>
        <NavLink
          to="/admin/product-part-list"
          className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"

        >
          Product Part List
        </NavLink>
        <NavLink
          to="/admin/inventory"
          className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"

        >
          Update Inventory
        </NavLink>
        <NavLink
          to="/admin/report"
          className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"

        >
          Stock Report
        </NavLink>
        <NavLink
          to="/admin/contact-report"
          className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"

        >
          Contact Report
        </NavLink>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="secondary" size="icon">
              <div className="relative">
                {notifications.length > 0 && (
                  <div className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500" />
                )}
                <BellIcon />
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64 max-h-80 overflow-y-auto">
            <DropdownMenuLabel>Stock Alert Notifications 🔔</DropdownMenuLabel>
            <DropdownMenuSeparator />

            {notifications.length > 0 ? (
          notifications.map((alert, index) => (
            <DropdownMenuItem key={index} className="flex flex-col items-start px-3 py-2 rounded-md hover:bg-indigo-50 transition duration-200">
            <div className="flex items-center justify-between w-full">
              <span className="text-sm font-medium text-gray-700 capitalize">
                {alert.productName} - {alert.productPartName}
              </span>
    
              {alert.expDate && (
                <span className="ml-2 px-2 py-0.5 text-xs bg-yellow-100 text-yellow-700 font-medium rounded-md">
                  Exp Date: {new Date(alert.expDate).toLocaleDateString()}
                </span>
              )}
            </div>
    
            <span className="mt-1 px-2 py-0.5 text-xs bg-green-100 text-green-700 font-medium rounded-md">
              Stock Left: {alert.stockQuantity}
            </span>
          </DropdownMenuItem>
        ))
      ) : (
              <DropdownMenuItem>No new notifications</DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>



        <DropdownMenu>
          <DropdownMenuTrigger>
           
        <Avatar>
          <AvatarImage src="" />
          <AvatarFallback>SS</AvatarFallback>
        </Avatar>
          </DropdownMenuTrigger>
         <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
      <DropdownMenuItem  onClick={()=>{
    navigate('/')
    }}>Back To Home</DropdownMenuItem>
    <DropdownMenuItem  onClick={()=>{
    Cookies.remove('token')
    navigate('/login')
    }}>Logout</DropdownMenuItem>
  </DropdownMenuContent>
        </DropdownMenu>
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
