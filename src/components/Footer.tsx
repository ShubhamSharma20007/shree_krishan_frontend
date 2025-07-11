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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useRef, useState } from "react"
import ConntactServiceInstance from "../../service/contact.service"
import { useFetch } from "@/hooks/useFetch"
import toast from "react-hot-toast"
import { LoaderCircle } from "lucide-react"
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
  console.log(name, email, message,subject,contactNo)
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
    <Button variant="link" className="cursor-pointer">Click here for Contact Us</Button>
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

      <footer className="rounded-lg bg-zinc-100 my-10 shadow-sm m-4 dark:bg-zinc-900 py-5">
        <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
          <span className="text-sm  sm:text-center dark:text-gray-400 text-black">
            © 2025{" "}

           
            . Developed by Shubham & Sumit with ❤️
          </span>
          <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
            <DialogCloseButton isOpen={isOpen} setIsOpen={setIsOpen} />
          </ul>
        </div>
      </footer>
    </>

  )
}

export default Footer