
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { HashLink } from 'react-router-hash-link';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Search } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Link } from 'react-router-dom';
const SellProductDashboard = () => {
  const data =[
    {
      img:"https://d57avc95tvxyg.cloudfront.net/images/thumbnails/100/150/feature_variant/3211/Samsung_Galaxy_S10_Plus_spare_parts_accessories_by_maxbhi.jpeg?t=1731769325",
      name:"Samsung Galaxy S10 Plus"
    }
  ]
  return (
    <div className='container mx-auto p-3 md:p-0'>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
          <BreadcrumbLink asChild>
        <HashLink smooth to="/#all_brand">
          All Models
        </HashLink>
      </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className='capitalize'>SellProduct</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className='mt-10'>
      <h1 className='text-2xl font-semibold  text-foreground  capitalize text-center'>Select  Mobile Phone Model</h1>
     <div className='flex gap-x-2 items-center relative justify-center mt-5'>  
     <div className=" w-1/2 relative flex items-center justify-center ">
  <Input
    className="w-full placeholder:capitalize pr-10 border-accent-foreground/40 "
    placeholder="Search handset..."
  />
  <Search className="w-4 h-4 text-gray-500 absolute top-[50%] right-3 -translate-y-1/2 pointer-events-none" />
</div>


<Select>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Select Brand" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="apple">Apple</SelectItem>
    <SelectItem value="samsung">Samsung</SelectItem>
    <SelectItem value="readme">Readme</SelectItem>
    <SelectItem value="oppo">Oppo</SelectItem>
  </SelectContent>
</Select>
     </div>

      {/*  devices */}
     <div className='mt-10 grid  grid-cols-2 container mx-auto sm:grid-cols-4 md:grid-cols-5 gap-4 '>
     {
        Array.from({ length: 10 }).map((_,i:number)=><div>
         <Link to={"/sellproduct/"+encodeURIComponent(data[0].name)} className='flex justify-center'>
         <Card key={i} className='h-40 w-40 bg-transparent border-0 '>
        <img src={data[0].img}  className='w-full h-full rounded-xl object-contain ' />
      </Card>
         </Link>
      <h1 className='text-center font-medium text-sm text-foreground capitalize mt-4'>{data[0].name}</h1>
      
        </div>)
      }
     </div>
      </div>

    </div>
  )
}

export default SellProductDashboard