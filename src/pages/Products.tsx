
import { useParams } from 'react-router-dom'
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
const Products = () => {
  const { brand } = useParams()
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
            <BreadcrumbPage className='capitalize'>{brand}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className='mt-10'>
      <h1 className='text-2xl font-semibold  text-foreground  capitalize text-center'>Select {brand} Mobile Phone Model</h1>
     <div className='mx-auto w-1/2 relative'>
     <Input className="w-full placeholder:capitalize pr-8  border-accent-foreground/40 mt-5" placeholder={`Search your : ${brand} handset`} />
     <Search className=' w-4 h-4 text-gray-500 absolute top-1/2 right-2 transform -translate-y-1/2'/>
     </div>

      {/*  devices */}
     <div className='mt-10 grid  grid-cols-2 container mx-auto sm:grid-cols-4 md:grid-cols-5 gap-4 '>
     {
        Array.from({ length: 10 }).map((_,i:number)=><div>
         <a href={"/accessories/"+encodeURIComponent(data[0].name)} className='flex justify-center'>
         <Card key={i} className='h-40 w-40 bg-transparent border-0 '>
        <img src={data[0].img}  className='w-full h-full rounded-xl object-contain ' />
      </Card>
         </a>
      <h1 className='text-center font-medium text-sm text-foreground capitalize mt-4'>{data[0].name}</h1>
      
        </div>)
      }
     </div>
      </div>

    </div>
  )
}

export default Products