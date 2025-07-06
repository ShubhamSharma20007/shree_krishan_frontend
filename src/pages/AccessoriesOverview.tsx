import  { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs } from 'swiper/modules';
import '../../node_modules/swiper/swiper-bundle.min.css'
import '../../node_modules/swiper/swiper.min.css'
import { Card } from '@/components/ui/card';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useParams } from 'react-router-dom';


const AccessoriesOverview = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

const {device,item} = useParams()
  const images = [
    "https://d57avc95tvxyg.cloudfront.net/images/thumbnails/200/200/feature_variant/3211/Samsung_Galaxy_S10_Plus_spare_parts_accessories_by_maxbhi.jpeg?t=1741855304",
    "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s10-1.jpg",
    "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s10-2.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLtEuSp5A49mboPeXQFWAQridQYvK7YTovcRfsCqObH6bcm6GEgd_zYN5J_c7hYZ5ai7M&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1s6mkoo-mWKbcyptZQzl6505wZhJyJq_W7MArRJvVjx2SmL0cFKyWtRJvL450_AE2K9A&usqp=CAU",
  ];

  const thumbs =  [
    "https://d57avc95tvxyg.cloudfront.net/images/thumbnails/200/200/feature_variant/3211/Samsung_Galaxy_S10_Plus_spare_parts_accessories_by_maxbhi.jpeg?t=1741855304",
    "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s10-1.jpg",
    "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s10-2.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLtEuSp5A49mboPeXQFWAQridQYvK7YTovcRfsCqObH6bcm6GEgd_zYN5J_c7hYZ5ai7M&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1s6mkoo-mWKbcyptZQzl6505wZhJyJq_W7MArRJvVjx2SmL0cFKyWtRJvL450_AE2K9A&usqp=CAU",
  ];

  return (
    <>
  
    <section className="container mx-auto p-3 md:p-0 ">
        <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
               <BreadcrumbSeparator />
         <BreadcrumbItem>
            <BreadcrumbPage className='capitalize'>{device}</BreadcrumbPage>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className='capitalize'>{item}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Main Slider */}
          <div className="slider-box w-full h-full max-lg:mx-auto mx-0">
            <Swiper
              modules={[Thumbs]}
              spaceBetween={10}
              thumbs={{ swiper: thumbsSwiper }}
              className="main-slide-carousel mb-6"
            >
              {images.map((src, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={src}
                    alt={`Slide ${index + 1}`}
                    className=" rounded-2xl object-cover w-3/4  mx-auto"
                  />
                </SwiperSlide>
              ))}
            </Swiper>


            <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={10}
              slidesPerView={4}
                
              className="nav-for-slider"
            >
              {thumbs.map((src, index) => (
                <SwiperSlide key={index}>
                    <Card  className='h-36 w-28 bg-transparent border-0 '>
                  <img
                    src={src}
                    alt={`Thumb ${index + 1}`}
                    className="cursor-pointer h-full w-full object-cover"
                  />
                  </Card>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Product Details */}
          <div className="flex justify-center items-center">
        <div className="pro-detail w-full max-lg:max-w-[608px] lg:pl-8 xl:pl-16 max-lg:mx-auto max-lg:mt-8">
          <div className="flex items-center justify-between gap-6 mb-6">
            <div className="text">
              <h2 className="font-manrope font-bold text-3xl leading-10 text-foreground mb-2">
               {device}
              </h2>
              {/* <p className="font-normal text-base ">ABS LUGGAGE</p> */}
            </div>
            {/* <button className="group transition-all duration-500 p-0.5">
              <svg
                width={60}
                height={60}
                viewBox="0 0 60 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  className="fill-indigo-50 transition-all duration-500 group-hover:fill-indigo-100"
                  cx={30}
                  cy={30}
                  r={30}
                  fill=""
                />
                <path
                  className="stroke-indigo-600 transition-all duration-500 group-hover:stroke-indigo-700"
                  d="M21.4709 31.3196L30.0282 39.7501L38.96 30.9506M30.0035 22.0789C32.4787 19.6404 36.5008 19.6404 38.976 22.0789C41.4512 24.5254 41.4512 28.4799 38.9842 30.9265M29.9956 22.0789C27.5205 19.6404 23.4983 19.6404 21.0231 22.0789C18.548 24.5174 18.548 28.4799 21.0231 30.9184M21.0231 30.9184L21.0441 30.939M21.0231 30.9184L21.4628 31.3115"
                  stroke=""
                  strokeWidth="1.6"
                  strokeMiterlimit={10}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button> */}
          </div>
          {/* <div className="flex flex-col min-[400px]:flex-row min-[400px]:items-center mb-8 gap-y-3">
            <div className="flex items-center">
              <h5 className="font-manrope font-semibold text-2xl leading-9 ">
                $ 199.00{" "}
              </h5>
              <span className="ml-3 font-semibold text-lg text-indigo-600">
                30% off
              </span>
            </div>
            <svg
              className="mx-5 max-[400px]:hidden"
              xmlns="http://www.w3.org/2000/svg"
              width={2}
              height={36}
              viewBox="0 0 2 36"
              fill="none"
            >
              <path d="M1 0V36" stroke="#E5E7EB" />
            </svg>
            <button className="flex items-center gap-1 rounded-lg bg-amber-400 py-1.5 px-2.5 w-max">
              <svg
                width={18}
                height={18}
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_12657_16865)">
                  <path
                    d="M8.10326 2.26718C8.47008 1.52393 9.52992 1.52394 9.89674 2.26718L11.4124 5.33818C11.558 5.63332 11.8396 5.83789 12.1653 5.88522L15.5543 6.37768C16.3746 6.49686 16.7021 7.50483 16.1086 8.08337L13.6562 10.4738C13.4205 10.7035 13.313 11.0345 13.3686 11.3589L13.9475 14.7343C14.0877 15.5512 13.2302 16.1742 12.4966 15.7885L9.46534 14.1948C9.17402 14.0417 8.82598 14.0417 8.53466 14.1948L5.5034 15.7885C4.76978 16.1742 3.91235 15.5512 4.05246 14.7343L4.63137 11.3589C4.68701 11.0345 4.57946 10.7035 4.34378 10.4738L1.89144 8.08337C1.29792 7.50483 1.62543 6.49686 2.44565 6.37768L5.8347 5.88522C6.16041 5.83789 6.44197 5.63332 6.58764 5.33818L8.10326 2.26718Z"
                    fill="white"
                  />
                  <g clipPath="url(#clip1_12657_16865)">
                    <path
                      d="M8.10326 2.26718C8.47008 1.52393 9.52992 1.52394 9.89674 2.26718L11.4124 5.33818C11.558 5.63332 11.8396 5.83789 12.1653 5.88522L15.5543 6.37768C16.3746 6.49686 16.7021 7.50483 16.1086 8.08337L13.6562 10.4738C13.4205 10.7035 13.313 11.0345 13.3686 11.3589L13.9475 14.7343C14.0877 15.5512 13.2302 16.1742 12.4966 15.7885L9.46534 14.1948C9.17402 14.0417 8.82598 14.0417 8.53466 14.1948L5.5034 15.7885C4.76978 16.1742 3.91235 15.5512 4.05246 14.7343L4.63137 11.3589C4.68701 11.0345 4.57946 10.7035 4.34378 10.4738L1.89144 8.08337C1.29792 7.50483 1.62543 6.49686 2.44565 6.37768L5.8347 5.88522C6.16041 5.83789 6.44197 5.63332 6.58764 5.33818L8.10326 2.26718Z"
                      fill="white"
                    />
                  </g>
                </g>
                <defs>
                  <clipPath id="clip0_12657_16865">
                    <rect width={18} height={18} fill="white" />
                  </clipPath>
                  <clipPath id="clip1_12657_16865">
                    <rect width={18} height={18} fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <span className="text-base font-medium text-white">4.8</span>
            </button>
          </div> */}
          
       {/* <div className="flex items-center flex-col min-[400px]:flex-row gap-3 mb-3 min-[400px]:mb-8">
            <div className=" flex items-center justify-center border border-gray-400 rounded-full">
              <button className="group py-[14px] px-3 w-full border-r border-gray-400 rounded-l-full h-full flex items-center justify-center bg-white shadow-sm shadow-transparent transition-all duration-300 hover:bg-gray-50 hover:shadow-gray-300">
                <svg
                  className="stroke-black group-hover:stroke-black"
                  width={22}
                  height={22}
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.5 11H5.5"
                    stroke=""
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  <path
                    d="M16.5 11H5.5"
                    stroke=""
                    strokeOpacity="0.2"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  <path
                    d="M16.5 11H5.5"
                    stroke=""
                    strokeOpacity="0.2"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
              <input
                type="text"
                className="font-semibold text-accent-foreground   text-lg py-3 px-2 w-full min-[400px]:min-w-[75px] h-full  text-center  outline-0 "
                placeholder={'1'}
              />
              <button className="group py-[14px]  px-3 w-full border-l border-gray-400 rounded-r-full h-full flex items-center justify-center bg-white shadow-sm shadow-transparent transition-all duration-300 ">
                <svg
                  className="stroke-black group-hover:stroke-black"
                  width={22}
                  height={22}
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11 5.5V16.5M16.5 11H5.5"
                    stroke="#9CA3AF"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  <path
                    d="M11 5.5V16.5M16.5 11H5.5"
                    stroke="black"
                    strokeOpacity="0.2"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  <path
                    d="M11 5.5V16.5M16.5 11H5.5"
                    stroke="black"
                    strokeOpacity="0.2"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
            <button className=" py-3  px-5 rounded-full bg-indigo-50 text-indigo-600 font-semibold text-lg w-full flex items-center justify-center gap-2 shadow-sm shadow-transparent transition-all duration-500 hover:shadow-indigo-300 hover:bg-indigo-100">
              <svg
                className="stroke-indigo-600 transition-all duration-500 group-hover:stroke-indigo-600"
                width={22}
                height={22}
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.7394 17.875C10.7394 18.6344 10.1062 19.25 9.32511 19.25C8.54402 19.25 7.91083 18.6344 7.91083 17.875M16.3965 17.875C16.3965 18.6344 15.7633 19.25 14.9823 19.25C14.2012 19.25 13.568 18.6344 13.568 17.875M4.1394 5.5L5.46568 12.5908C5.73339 14.0221 5.86724 14.7377 6.37649 15.1605C6.88573 15.5833 7.61377 15.5833 9.06984 15.5833H15.2379C16.6941 15.5833 17.4222 15.5833 17.9314 15.1605C18.4407 14.7376 18.5745 14.0219 18.8421 12.5906L19.3564 9.84059C19.7324 7.82973 19.9203 6.8243 19.3705 6.16215C18.8207 5.5 17.7979 5.5 15.7522 5.5H4.1394ZM4.1394 5.5L3.66797 2.75"
                  stroke=""
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
              Add to cart
            </button>
          </div> */}
          <button className="text-center w-full px-5 py-4 rounded-[100px] bg-indigo-600 flex items-center justify-center font-semibold text-lg text-white shadow-sm shadow-transparent transition-all duration-500 hover:bg-indigo-700 hover:shadow-indigo-300">
           For Buy Contact Us
          </button>
        </div>
      </div>
        </div>
      </div>

      <h1 className='text-2xl font-semibold  text-foreground mt-10 capitalize '>Select Mobile Phone Brand</h1>
      <p className='mt-4 text-foreground/70'>
      In this busy world, mobile phones have become a part of our every minute activities. With access to them every minute we happen to drop them accidentally or get scratches by the regular uses. Being a well made and sturdy phone, such drops and accidents usually not cause any harm to the internal hardware of the "Vivo V15 Pro". But when it comes to the outer looks / body of the phone, it does require a makeover after a certain period of time. You can now easily change the back panel cover of the handset by buying this back cover housing & making your phone look back same as new and fresh.
              <br />
This brand new replacement back panel housing cover for your Vivo V15 Pro at an unbelievable price, is the perfect combination of superior protection, unmatched quality and stylish design and is used to replace your broken, damaged, scratched back panel for your Vivo V15 Pro. Characterized by shock resistance, buffer function and durable service, the panel is made of high quality material can offer dependable protection for your cell phone from daily wear and tear, so that it can ensure the long life of your cell phone.</p>
<ul className='text-foreground/70 mt-4 list-disc list-inside'>
  <li >Manufactured using high quality and excellent durable materials.</li>
  <li>Perfect replacement for the original cover and make the phone look like a new one.</li>
  <li>Specially manufactured for Vivo V15 Pro, Precision machining fits the cell phone perfectly.</li>
  <li>High quality OEM product, tested and quality checked for each piece before shipping.</li>
  <li>Replace your scratched, broken, old and unusable panel cover e with a new one.</li>
</ul>
    </section>
    </>
  );
};

export default AccessoriesOverview;
