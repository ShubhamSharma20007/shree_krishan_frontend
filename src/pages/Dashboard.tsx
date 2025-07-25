import React, { useEffect, useState } from "react";
import ImageContainer from "@/components/ImageContainer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import Img1 from "@/assets/banner-img.webp";
import Img2 from "@/assets/banner-img2.webp";
const images = [{ image: Img1 }, { image: Img2 }];
import { useFetch } from "@/hooks/useFetch";
import BrandServiceInstance from "../../service/brand.service";
import { VITE_BASE_URL } from "@/helper/instance";
import Brand from "@/assets/brand.png";
import Mobile from "@/assets/mobile.png";
import Part from "@/assets/parts.png";
import Battery from "@/assets/battery.jpg";
import Screen from "@/assets/screen1.jpeg";
import Accessories from "@/assets/accessories.jpeg";
import PartImg from "@/assets/internal_parts.jpeg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";
// const parts = [
//   {
//     title: 'Spare Parts',
//     images: [
//       { img: 'https://d57avc95tvxyg.cloudfront.net/images/thumbnails/120/176/detailed/967/lcd_screen_for_samsung_galaxy_j7_replacement_display_by_maxbhi.com_68069.jpg?t=1731769242', title: 'Mobile Spare Parts' },
//       { img: 'https://d57avc95tvxyg.cloudfront.net/images/thumbnails/120/173/detailed/1517/lcd_with_touch_screen_for_samsung_galaxy_s7_edge_cdma_black_by_maxbhi.com_62135.jpg?t=1731769242', title: 'Display Screen' },
//       { img: 'https://d57avc95tvxyg.cloudfront.net/images/thumbnails/120/120/detailed/1800/s-l300.jpg?t=1731769242', title: 'Touch Screen' },
//       { img: 'https://d57avc95tvxyg.cloudfront.net/images/thumbnails/120/176/detailed/967/lcd_screen_for_samsung_galaxy_j7_replacement_display_by_maxbhi.com_68069.jpg?t=1731769242', title: 'LCD ' },
//       { img: 'https://d57avc95tvxyg.cloudfront.net/images/thumbnails/120/120/detailed/1765/full_body_housing_for_apple_iphone_8_plus_silver_maxbhi_com_62079.jpg?t=1731769243', title: 'Housing ' }
//     ]
//   },
//   {
//     title: 'Accessories',
//     images: [
//       { img: 'https://d57avc95tvxyg.cloudfront.net/images/thumbnails/120/79/detailed/486/battery_for_lava_iris_x1_by_maxbhi_com_3831.jpg?t=1731769384', title: 'Mobile Asscessories' },
//       { img: 'https://d57avc95tvxyg.cloudfront.net/images/thumbnails/120/120/detailed/2127/100-New-3-8V-1440mAh-Lithium-Polymer-Battery-Real-Capacity-Mobile-Phone-Batteries-With-8PCS-Tools-3.jpg?t=1731769384', title: 'Battery' },
//       { img: 'https://d57avc95tvxyg.cloudfront.net/images/thumbnails/120/120/detailed/1023/flip-cover-for-samsung-galaxy-j7-gold-maxbhi-1-1-1.jpg?t=1731769266', title: 'Caeses & Covers' },
//       { img: 'https://d57avc95tvxyg.cloudfront.net/images/thumbnails/120/188/detailed/20/gorilla-glass-for-samsung-galaxy-s3-i9300-with-tool-kit-maxbhi-1-7-1.jpg?t=1731769294', title: 'Protective Films and Glasses ' },
//       { img: 'https://d57avc95tvxyg.cloudfront.net/images/thumbnails/120/54/detailed/1114/charger-for-letv-le-1s-usb-mobile-phone-wall-charger-maxbhi-5-0-1.jpg?t=1731769384', title: 'Cargers ' }
//     ]
//   },
//   {
//     title: 'Repair Tools',
//     images: [
//       { img: 'https://d57avc95tvxyg.cloudfront.net/images/thumbnails/120/120/detailed/3/tools.JPG?t=1731769384', title: 'Mobile Tool Kits' },
//       { img: 'https://d57avc95tvxyg.cloudfront.net/images/thumbnails/120/145/detailed/3/jackly-6032.jpg?t=1731769384', title: 'Screw Driver' },
//       { img: 'https://d57avc95tvxyg.cloudfront.net/images/thumbnails/120/159/detailed/8/ET-TOOLS-GLUE-01.JPG?t=1731769384', title: 'Glue' },
//       { img: 'https://d57avc95tvxyg.cloudfront.net/images/thumbnails/120/120/detailed/4/958-8-LCD-Touch-Screen-Vacuum-Separator-Cellphone-Repair-Machine-220V_600x600.jpg?t=1731769385', title: 'Touch Changing Machine ' },
//       { img: 'https://d57avc95tvxyg.cloudfront.net/images/thumbnails/120/120/detailed/843/opening_tool_kit_for_infocus_m810_with_screwdriver_set_by_maxbhi.com_33445.jpg?t=1731769385', title: 'Opening Tool Set ' }
//     ]
//   },
//   {
//     title: 'Solar & LED',
//     images: [
//       { img: 'https://d57avc95tvxyg.cloudfront.net/images/thumbnails/120/120/detailed/3/solar-panels-250x250.jpg?t=1731769385', title: 'Solar, Lighting & Essentials' },
//       { img: 'https://d57avc95tvxyg.cloudfront.net/images/thumbnails/120/103/detailed/3/solar-led-street-light-500x500.jpg?t=1731769326', title: 'Street Light Fixtures' },
//       { img: 'https://d57avc95tvxyg.cloudfront.net/images/thumbnails/120/85/detailed/3/solar-panels.jpg?t=1731769326', title: 'Solar Panel' },
//       { img: 'https://d57avc95tvxyg.cloudfront.net/images/thumbnails/120/80/detailed/3/indoor-led-light.jpg?t=1731769326', title: 'Indoor LED Lighting' },

//     ]
//   }
// ]
const reviews = [
  {
    name: "Amit Sharma",
    review:
      "Amazing service! Got my phone fixed in under 30 minutes. Highly recommend Amazing service! Got my phone fixed in under 30 minutes. Highly recommend Amazing service! Got my phone fixed in under 30 minutes. Highly recommend ",
    rating: 5,
  },
  {
    name: "Priya Verma",
    review: "Great support and high-quality parts. Will come again.",
    rating: 4,
  },
  {
    name: "Rahul Mehta",
    review: "Affordable and reliable. The team was very professional.",
    rating: 4,
  },
  {
    name: "Sneha Joshi",
    review: "Loved the quick response and transparency. 5 stars from me!",
    rating: 5,
  },
  {
    name: "Priya Verma",
    review: "Great support and high-quality parts. Will come again.",
    rating: 4,
  },
  {
    name: "Rahul Mehta",
    review: "Affordable and reliable. The team was very professional.",
    rating: 4,
  },
  {
    name: "Sneha Joshi",
    review: "Loved the quick response and transparency. 5 stars from me!",
    rating: 5,
  },
];

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [brandData, setBrandData] = React.useState<any>([]);
  const {
    fn: getBrandsFn,
    data: getBrandsRes,
    loading: getBrandsLoading,
  } = useFetch(BrandServiceInstance.getAllBrand);
  const fetchBrands = async () => {
    setLoading(true);
    try {
      await getBrandsFn();
    } catch (error) {
      console.error("Error fetching brands:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  useEffect(() => {
    if (Array.isArray(getBrandsRes)) {
      const formattedBrands = getBrandsRes.map((brand) => ({
        id: brand._id,
        brandName: brand.brandName,
        image: `${VITE_BASE_URL}/uploads/${brand.image || ""}`,
      }));
      setBrandData(formattedBrands);
    } else {
      setBrandData([]);
    }
  }, [getBrandsRes]);

  const navigate = useNavigate();

  const [expanded, setExpanded] = useState<{ [key: number]: boolean }>({});

  const handleToggle = (index: number) => {
    setExpanded((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <>
      {/* sell buton */}
      {/* <div className='container mx-auto place-content-center flex'> 
      <Button onClick={()=>navigate('/sellproduct')} variant={'default'} className=' mt-5 mb-5'>Sell Your Mobile</Button>
    </div> */}
      <div className="p-3 md:p-0">
        {/* image Container */}
        {images.map((img, i) => (
          <div key={i} className="mt-5 container mx-auto px-2">
            {i === 1 ? (
              // Second image (index 1) is clickable
              <Link to="/allBrands">
                <ImageContainer images={img.image} className="cursor-pointer" />
              </Link>
            ) : (
              // Other images
              <ImageContainer images={img.image} className="" />
            )}
          </div>
        ))}
        {/* branding partner's */}
        <div className="mt-20 mx-auto container" id="all_brand">
          <h1 className="text-3xl font-bold  text-foreground my-10 capitalize text-center">
            Select Mobile Phone Brand
          </h1>
          <div className="grid  grid-cols-2 container mx-auto sm:grid-cols-4 md:grid-cols-5 gap-4 ">
            {brandData.map((item: any, j: number) => (
              <div key={j} className="flex justify-center items-center">
                <a href={"/products?brand=" + item.id}>
                  <Card className="h-40 w-40 bg-transparent border-0 ">
                    <img
                      src={item.image}
                      alt={item.brandName}
                      className="w-full h-full rounded-xl object-contain "
                    />
                  </Card>
                </a>
              </div>
            ))}
          </div>
        </div>
        {/* SPARE PARTS SECTION */}
        <div className="mt-20 container  mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">
            Find Genuine Spare Parts
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                title: "Battery",
                img: Battery,
              },
              {
                title: "Screen",
                img: Screen,
              },
              {
                title: "Accessories",
                img: Accessories,
              },
              {
                title: "Internal Parts",
                img: PartImg,
              },
            ].map((part, index) => (
              <Card
                key={index}
                className="p-4 text-center shadow-md rounded-xl bg-white dark:bg-zinc-900"
              >
                <img
                  src={part.img}
                  alt={part.title}
                  className="w-full h-50 object-cover  rounded-xl"
                />
                <button className="bg-black text-white dark:bg-white dark:text-black font-semibold px-6 py-2 rounded-xl">
                  {part.title}
                </button>
              </Card>
            ))}
          </div>
        </div>
      </div>
      {/* HOW TO SEARCH SECTION */}
      <div className="mt-20 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10 text-foreground">
          How to Search for Your Product
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-md border border-gray-200 dark:border-zinc-700 text-center">
            <img
              src={Brand}
              alt="Select Brand"
              className="h-16 w-16 mx-auto mb-4 "
            />
            <h3 className="text-xl font-semibold mb-2">1. Select Brand</h3>
            <p className="text-sm text-muted-foreground">
              Choose the brand of the handset you're looking for. Use the search
              box or alphabet if it's not listed.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-md border border-gray-200 dark:border-zinc-700 text-center">
            <img
              src={Mobile}
              alt="Select Model"
              className="h-16 w-16 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">2. Select Model</h3>
            <p className="text-sm text-muted-foreground">
              After selecting the brand, pick your handset model. Use the search
              if you don’t find it directly.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-md border border-gray-200 dark:border-zinc-700 text-center">
            <img
              src={Part}
              alt="Select Product Type"
              className="h-16 w-16 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">
              3. Select Product Type
            </h3>
            <p className="text-sm text-muted-foreground">
              View all available products for your model and select the part you
              need.
            </p>
          </div>
        </div>
      </div>
      {/* What customer says */}
      <div className="mt-20 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-6 text-foreground">
          What Our Customers Say
        </h2>

        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={16}
          slidesPerView={2}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          loop={true}
          breakpoints={{
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3.5,
            },
          }}
        >
          {reviews.map((item, i) => (
            <SwiperSlide key={i}>
              <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-md border border-gray-200 dark:border-zinc-700 h-64 md:h-54 flex flex-col justify-between">
                <div className="flex-1 flex flex-col justify-between">
                  <div className="text-sm text-muted-foreground relative overflow-hidden">
                    <p
                      className={`transition-all duration-300 ${
                        item.review.length > 150 && !expanded[i]
                          ? "line-clamp-3"
                          : ""
                      }`}
                    >
                      "{item.review}"
                    </p>

                    {item.review.length > 150 && (
                      <button
                        className="text-xs text-blue-500 hover:underline mt-1"
                        onClick={() => handleToggle(i)}
                      >
                        {expanded[i] ? "Show less" : "Show more"}
                      </button>
                    )}
                  </div>

                  {/* Stars */}
                  <div className="flex justify-center space-x-1 mt-4">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        className={`w-4 h-4 ${
                          index < item.rating
                            ? "text-yellow-400"
                            : "text-gray-300 dark:text-gray-600"
                        }`}
                        fill={index < item.rating ? "#facc15" : "none"}
                      />
                    ))}
                  </div>
                </div>

                {/* Name */}
                <h4 className="text-sm font-semibold text-foreground text-center mt-3">
                  {item.name}
                </h4>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* VIDEO SECTION — Showcase Your Work */}
      <div className="mt-20 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-6 text-foreground">
          Watch Our Repair Work in Action
        </h2>

        <div className="max-w-4xl mx-auto rounded-xl overflow-hidden shadow-lg border dark:border-zinc-700">
          <video
            controls
            className="w-full h-auto rounded-xl"
            poster="https://via.placeholder.com/600x400.png?text=Mobile+Repair+Preview"
          >
            <source
              src="https://download.blender.org/peach/bigbuckbunny_movies/BigBuckBunny_320x180.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      {/* cards */}
      {/* <div className="px-2  mt-20 container mx-auto">
        {parts.map(
          (
            part: { title: string; images: { img: string; title: string }[] },
            i: number
          ) => {
            return (
              <div key={i} className="mt-5">
                <h1 className="text-2xl font-bold  text-foreground my-10  uppercase">
                  {part.title}
                </h1>
                <div className="grid content-center-safe grid-cols-1 container mx-auto sm:grid-cols-4 md:grid-cols-5 gap-4 ">
                  {part.images.map(
                    (item: { img: string; title: string }, j: number) => (
                      <div key={j} className="">
                        <Card className="">
                          <img
                            src={item.img.trim()}
                            alt={item.title}
                            className="w-full h-60 object-contain "
                          />
                        </Card>
                        <h1 className="text-md font-regular mt-5">
                          {item.title}
                        </h1>
                      </div>
                    )
                  )}
                </div>
              </div>
            );
          }
        )}
      </div> */}
    </>
  );
};

export default Dashboard;
