import { CircleUserRound, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTheme } from "./theme-provider";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "./ui/card";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import logo1 from '@/assets/logo1.png'
import logo2 from '@/assets/logo2.png'
import ProductServiceInstance from "../../service/product.service"
import { useFetch } from "@/hooks/useFetch";
import Cookies from 'js-cookie';
import { VITE_BASE_URL } from "@/helper/instance";
interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface Navbar1Props {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  menu?: MenuItem[];
  auth?: {
    account: {
      title: string;
      url: string;
    };
  };
}

 const data =[
    {
      img:"https://d57avc95tvxyg.cloudfront.net/images/thumbnails/100/150/feature_variant/3211/Samsung_Galaxy_S10_Plus_spare_parts_accessories_by_maxbhi.jpeg?t=1731769325",
      name:"Samsung Galaxy S10 Plus"
    },
    {
      img:'https://d57avc95tvxyg.cloudfront.net/images/thumbnails/200/200/feature_variant/4922/Motorola_Moto_G60_spare_parts_accessories_by_maxbhi.jpeg?t=1741857284',
      name:'Motorola Moto G60'
    },
    {
      img:'https://d57avc95tvxyg.cloudfront.net/images/thumbnails/100/150/feature_variant/4585/Apple_iPhone_12_Pro_Max_spare_parts_accessories_by_maxbhi.jpeg?t=1731770251',
      name:'Apple iPhone 12 Pro Max'
    },
    {
      img:'https://d57avc95tvxyg.cloudfront.net/images/thumbnails/200/200/feature_variant/4274/OnePlus_Nord_spare_parts_accessories_by_maxbhi.jpeg?t=1741855260',
      name:'OnePlus Nord'
    },
    {
     img:'https://d57avc95tvxyg.cloudfront.net/images/thumbnails/200/200/feature_variant/6710/Google_Pixel_6a_spare_parts_accessories_by_maxbhi.jpeg?t=1741855434',
     name:'Google Pixel 6a' 
    },
    {
      img:'https://d57avc95tvxyg.cloudfront.net/images/thumbnails/200/200/feature_variant/2894/Apple_iPhone_XR_spare_parts_accessories_by_maxbhi.jpeg?t=1741856128',
      name:'Apple iPhone XR'
    }

  ]

const Navbar = ({
  
  logo = {
    url: "https://www.shadcnblocks.com",
    src: "https://shadcnblocks.com/images/block/logos/shadcnblockscom-icon.svg",
    alt: "logo",
    title: "Shree Mobile",
  },
  auth = {
    account: { title: "login", url: "/login" },
  },
}: Navbar1Props) => {

  const { setTheme, theme } = useTheme();
  const [mobiles,setMobiles]= useState<any>([])
    const token = Cookies.get('token');
  const [inputValue,setInputValue]= useState('')
  const [debouncedText,{isPending}] = useDebounce(inputValue, 800);
  const navigate = useNavigate()
    const { fn: getProductsFn, data: getProductsRes, loading: productsLoading } = useFetch(ProductServiceInstance.getProducts);
const handleInputValue = async(e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    const trimmed = debouncedText.trim();

    if (!trimmed) {
      setMobiles([]);
      return;
    }

     try {
      getProductsFn({itemName:inputValue })
    } catch (error) {
      console.log('Error during the error',error)
    }
    // const filtered = data.filter((mobile) =>
    //   mobile.name.toLowerCase().includes(trimmed.toLowerCase())
    // );
    setMobiles([]);
  }, [debouncedText]);

  useEffect(()=>{
    if(getProductsRes){
      setMobiles(getProductsRes)
    }
  },[getProductsRes])

  function redirectTo(_id:string){
    setInputValue('')
    setMobiles([])
    return navigate("/accessories/"+_id)
  }


  return (
    <section className="mb-5">
      <div className="shadow-sm px-4">
    <nav className="grid grid-cols-1 lg:grid-cols-3 items-center gap-2 px-4 py-2">
  {/* Logo */}
  <div className="flex justify-between items-center w-full lg:col-span-1">
    <Link to="/" className="flex items-center gap-2">
      <img
        src={theme === "light" ? logo2 : logo1}
        className="text-lg h-20 w-25 font-semibold tracking-tighter"
        alt="logo"
      />
    </Link>

    {/* Right Side Buttons (mobile stacked beside logo) */}
    <div className="flex gap-2 items-center lg:hidden">
      <Button
        variant="outline"
        size="icon"
        className="border-accent-foreground/40"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        {theme === "light" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </Button>

      <Button asChild variant="outline" size="sm" className="border-accent-foreground/40">
        {token ? (
          <Link to="/admin/dashboard" className="flex items-center gap-1">
            <CircleUserRound className="w-5 h-5" />
            <span className="hidden md:inline">Dashboard</span>
          </Link>
        ) : (
          <Link to={auth.account.url} className="flex items-center gap-1">
            <CircleUserRound className="w-5 h-5" />
            <span className="hidden md:inline">{auth.account.title}</span>
          </Link>
        )}
      </Button>
    </div>
  </div>

  {/* Search bar for desktop */}
  <div className="hidden lg:block lg:col-span-1 relative w-full">
    <Input
      type="search"
      value={inputValue}
      onChange={handleInputValue}
      className="w-full border-accent-foreground/40"
      placeholder="Search your mobile phone.."
    />
    {inputValue.trim().length > 0 && (
      <Card className="w-full mt-2 absolute gap-2 overflow-y-auto rounded-lg max-h-64 border z-50 p-0 bg-background">
        {mobiles.length > 0 ? (
          mobiles.map((mobile: any, i: number) => (
            <Card
              onClick={() => redirectTo(mobile._id)}
              key={i}
              className="h-20 px-4 hover:bg-accent cursor-pointer"
            >
              <div className="flex gap-2 items-center h-full w-full">
                <div className="w-16 h-16">
                  <img
                    className="w-full h-full object-contain"
                    src={`${VITE_BASE_URL}/uploads/${mobile.images?.[0] || ''}`}
                    alt={mobile.itemName}
                  />
                </div>
                <p className="text-sm">{mobile.itemName}</p>
              </div>
            </Card>
          ))
        ) : (
          !isPending() && (
            <p className="p-4 text-sm text-muted-foreground text-center border-0">
              No results found
            </p>
          )
        )}
      </Card>
    )}
  </div>

  {/* Right side buttons for desktop */}
  <div className="hidden lg:flex gap-2 items-center justify-end lg:col-span-1">
    <Button
      variant="outline"
      size="icon"
      className="border-accent-foreground/40"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "light" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>

    <Button asChild variant="outline" size="sm" className="border-accent-foreground/40">
      {token ? (
        <Link to="/admin/dashboard" className="flex items-center gap-1">
          <CircleUserRound className="w-5 h-5" />
          <span className="hidden md:inline">Dashboard</span>
        </Link>
      ) : (
        <Link to={auth.account.url} className="flex items-center gap-1">
          <CircleUserRound className="w-5 h-5" />
          <span className="hidden md:inline">{auth.account.title}</span>
        </Link>
      )}
    </Button>
  </div>

  {/* Search bar for mobile (below logo + buttons) */}
  <div className="lg:hidden w-full mt-2 relative">
    <Input
      type="search"
      value={inputValue}
      onChange={handleInputValue}
      className="w-full border-accent-foreground/40"
      placeholder="Search your mobile phone.."
    />
    {inputValue.trim().length > 0 && (
      <Card className="w-full mt-2 absolute gap-2 overflow-y-auto rounded-lg max-h-64 border z-50 p-0 bg-background">
        {mobiles.length > 0 ? (
          mobiles.map((mobile: any, i: number) => (
            <Card
              onClick={() => redirectTo(mobile._id)}
              key={i}
              className="h-20 px-4 hover:bg-accent cursor-pointer"
            >
              <div className="flex gap-2 items-center h-full w-full">
                <div className="w-16 h-16">
                  <img
                    className="w-full h-full object-contain"
                    src={`${VITE_BASE_URL}/uploads/${mobile.images?.[0] || ''}`}
                    alt={mobile.itemName}
                  />
                </div>
                <p className="text-sm">{mobile.itemName}</p>
              </div>
            </Card>
          ))
        ) : (
          !isPending() && (
            <p className="p-4 text-sm text-muted-foreground text-center border-0">
              No results found
            </p>
          )
        )}
      </Card>
    )}
  </div>
</nav>


      </div>
    </section>
  );
};

export { Navbar };