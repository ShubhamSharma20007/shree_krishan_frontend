import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import logo from "@/assets/logoRed.png"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useRef, useState } from "react"
import ConntactServiceInstance from "../../service/contact.service"
import { useFetch } from "@/hooks/useFetch"
import toast from "react-hot-toast"
import { LoaderCircle, Instagram, Facebook, Twitter, Linkedin } from "lucide-react"
import { Link } from "react-router-dom"
export function DialogCloseButton({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (isOpen: boolean) => void }) {
    const { fn: contactFn, data: contactRes, loading: contactLoading } = useFetch(ConntactServiceInstance.contactMail);
    const formRef = useRef<HTMLFormElement>(null);
const handleSubmit =async(e:React.FormEvent<HTMLFormElement>)=>{
  e.preventDefault()
  const formData = new FormData(e.currentTarget)
  const name = formData.get('name')
  const email = formData.get('email')
  const message = formData.get('message')
  const subject = formData.get('subject') 
  const contactNo = formData.get('contactNo')
  try {
    await contactFn({name,email,message,subject,contactNo})
    setIsOpen(false)
  } catch (error) {
    console.log(error)
  }
}

useEffect(()=>{
  if(contactRes){
    toast.success(contactRes.message ||' Mail Send Successfully')
    if(formRef.current) formRef.current.reset();

  }
},[contactRes])
  return (
   <Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogTrigger asChild>
    <Button variant="link" className="cursor-pointer p-0 text-sm text-gray-600 dark:text-gray-300 no-underline hover:no-underline">Click here for Contact & Appointment</Button>
  </DialogTrigger>
  <DialogContent className="sm:max-w-md">
    <form onSubmit={handleSubmit} ref={formRef}>
      <DialogHeader>
      <DialogTitle>Contact Us</DialogTitle>
      <DialogDescription>
        Fill out the form and we'll get back to you shortly.
      </DialogDescription>
    </DialogHeader>

    <div className="grid gap-4 py-4">
      <div className="grid gap-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" placeholder="Your full name" />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" name="email" placeholder="you@example.com" />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="subject">Subject</Label>
        <Input id="subject" name="subject" placeholder="Appointment subject" />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="contactNo">Contact Number</Label>
        <Input id="contactNo" name="contactNo" placeholder="Phone number" />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="message">Message</Label>
        <textarea
          id="message"
          name="message"
          placeholder="Type your message..."
          rows={4}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        ></textarea>
      </div>
    </div>

    <DialogFooter className="sm:justify-end">
      <Button type="submit" disabled={contactLoading}>
        {
          contactLoading ? <LoaderCircle className="animate-spin"/> : 'Send Message'
        }
      </Button>
      <DialogClose asChild>
        <Button type="button" variant="secondary">
          Cancel
        </Button>
      </DialogClose>
    </DialogFooter>
    </form>
  </DialogContent>
</Dialog>

  )
}

const Footer = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
  <footer className="rounded-lg bg-zinc-100 my-10 shadow-sm m-4 dark:bg-zinc-900 p-5">
    <div className="max-w-screen-xl grid grid-cols-1 md:grid-cols-4 gap-10 mx-auto">
      {/* Section 1 - Logo */}
      <div className="flex flex-col md:flex-col items-start space-y-3 md:space-y-3">
      <div className="flex flex-row items-center md:flex-col md:items-center md:space-y-3 space-x-3 md:space-x-0 text-center justify-center">
        <img src={logo} alt="Logo" width={120} height={30} />
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Empowering your business with transparency and trust.
        </p>
      </div>
    </div>

      {/* Section 2 - Reach Us */}
      <div className="space-y-6 -mt-10 md:mt-0">
        <div>
          <h3 className="font-bold text-lg mb-2">Reach Us</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            <strong>Chittorgarh</strong><br />
            33-Subhash chowk,New cloth market, near Bharat Gas, Chittorgarh, Rajasthan 312001
          </p>

          <p className="text-sm text-gray-600 dark:text-gray-300">
            <strong>Nimbahera</strong><br />
            Nagar Palika Colony, Raza Colony, Adarsh Nagar, Nimbahera, Rajasthan 312601
          </p>
        </div>
      </div>

      {/* Section 3 - Important Links */}
      <div className="space-y-4">
        <h3 className="font-bold text-lg mb-2">Important Links</h3>
        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
          <li className="p-0 m-0">
            <DialogCloseButton isOpen={isOpen} setIsOpen={setIsOpen} />
          </li>
          <li>
            <Link to="#">Privacy Policy</Link>
          </li>
          <li>
            <Link to="#">Terms & Conditions</Link>
          </li>
        </ul>
      </div>

      {/* Section 4 - Learn More + Follow Us */}
      <div className="space-y-4">
        <h3 className="font-bold text-lg mb-2">Learn More</h3>
        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
          <li>
            <Link to="#">About Us</Link>
          </li>
          
        </ul>

        {/* Follow Us at Bottom */}
        <div className="pt-4">
          <h3 className="font-bold text-lg mb-2">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <Instagram className="w-5 h-5 text-gray-700 hover:text-pink-600" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <Facebook className="w-5 h-5 text-gray-700 hover:text-blue-600" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              <Linkedin className="w-5 h-5 text-gray-700 hover:text-blue-700" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <Twitter className="w-5 h-5 text-gray-700 hover:text-sky-500" />
            </a>
          </div>
        </div>
      </div>
    </div>

    <div className="text-center mt-8 text-sm text-gray-500 dark:text-gray-400">
      © 2025. Developed by <strong>Shubham</strong> & <strong>Sumit</strong> with ❤️
    </div>
  </footer>
</>


  )
}

export default Footer


