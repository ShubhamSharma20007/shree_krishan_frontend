

import { useParams } from 'react-router-dom'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Card } from '@/components/ui/card'

const parts = [
  {
    title: 'Display & Screens',
    images: [
      { img: 'https://d57avc95tvxyg.cloudfront.net/images/thumbnails/150/150/detailed/3217/replacement_front_glass_for_samsung_galaxy_s10_black_by_maxbhi_com_16694.jpg?t=1731769454', title: 'Front Glass Only' },
      { img: 'https://d57avc95tvxyg.cloudfront.net/images/thumbnails/150/150/detailed/3217/lcd_with_touch_screen_for_samsung_galaxy_s10_black_by_maxbhi_com_97605.jpg?t=1731769454', title: 'Display Combo Folder' },
   
    ]
  },
  {
    title: 'Body & Housings',
    images: [
      { img: 'https://d57avc95tvxyg.cloudfront.net/images/thumbnails/150/150/detailed/3217/back_panel_cover_for_samsung_galaxy_s10_black_maxbhi_com_15441.jpg?t=1731769455', title: 'Back Cover Panel' },
      { img: 'https://d57avc95tvxyg.cloudfront.net/images/thumbnails/150/150/detailed/5284/camera_lens_for_samsung_galaxy_s10_black_by_maxbhi_com_22813.jpg?t=1731792150', title: 'Camera Lens' },
      { img: 'https://d57avc95tvxyg.cloudfront.net/images/thumbnails/150/150/detailed/4464/volume_side_button_outer_for_samsung_galaxy_s10_black_by_maxbhi_com_73520.jpg?t=1739591930', title: 'Volume Button Outer' },
      
   
    ]
  },
   {
    title: 'Battery',
    images: [
      { img: 'https://d57avc95tvxyg.cloudfront.net/images/thumbnails/150/150/detailed/3217/battery_for_samsung_galaxy_s10_plus_by_maxbhi_com_36070.jpg?t=1731769498', title: 'Back Battery' },
     
   
    ]
  },
  
]

const SparePartsAndAccessories = () => {
  const { device } = useParams()
  return (
    <div className='container mx-auto p-3 md:p-0'>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
         
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className='capitalize'>{device}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className='mt-10'>
      <div className='flex items-center gap-5'>
      <Card  className='h-40 w-40 bg-transparent border-0 '>
        <img src={'https://d57avc95tvxyg.cloudfront.net/images/thumbnails/100/150/feature_variant/3211/Samsung_Galaxy_S10_Plus_spare_parts_accessories_by_maxbhi.jpeg?t=1731769325'}  className='w-full h-full rounded-xl object-contain ' />
      </Card>
      <div>
      <h1 className='text-xl font-semibold  text-foreground  capitalize '>{device} Spare Parts</h1>
      <p className='text-sm my-2 text-foreground'>Released : March 2019</p>
      <p className='text-sm my-2 text-foreground'>Display Size : 6.10 inches</p>
      </div>
      </div>
      <div className='mt-5 px-2  container mx-auto'>

        {
          parts.map((part: { title: string; images: { img: string; title: string }[] }, i: number) => {
            return (
              <div key={i} className='mt-5'>
                <h1 className='text-xl font-semibold  text-foreground my-10  capitalize'>{part.title}</h1>
                <div className='grid grid-cols-2 container mx-auto sm:grid-cols-3 md:grid-cols-6 gap-2 justify-items-center'>

                {
                  part.images.map((item: { img: string; title: string }, j: number) => (
                    <div key={j} className='' >
                     <a href={`/${encodeURIComponent(device!)}/${encodeURIComponent(part.title)}/${encodeURIComponent(item.title)}`}>

                      <Card className='p-2'>
                      <img src={item.img.trim()} alt={item.title} className='w-full h-36 object-contain mx-auto' />
                      </Card>
                      
                      <h1 className='text-sm font-medium mt-2 text-center'>{item.title}</h1>
                      </a>
                    </div>
                  ))
                }
                </div>
              </div>
            )
          })
        }
      </div>
      </div>

    </div>
  )
}

export default SparePartsAndAccessories