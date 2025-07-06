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
  const [inputValue,setInputValue]= useState('')
  const [debouncedText,{isPending}] = useDebounce(inputValue, 800);
  const navigate = useNavigate()
const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    const trimmed = debouncedText.trim();

    if (!trimmed) {
      setMobiles([]);
      return;
    }

    const filtered = data.filter((mobile) =>
      mobile.name.toLowerCase().includes(trimmed.toLowerCase())
    );
    setMobiles(filtered);
  }, [debouncedText]);

  function redirectTo(device:string){
    setInputValue('')
    setMobiles([])
    return navigate("/accessories/"+encodeURIComponent(device))
  }


  return (
    <section className="mb-5">
      <div className="shadow-sm px-4">
        <nav className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 items-center gap-4">
          {/* Logo */}
          <div className="flex justify-between lg:col-span-1">
            <Link to={'/'} className="flex items-center gap-2">
              <img src={theme === 'light' ? logo2 : logo1} className="text-lg h-20 w-25  font-semibold tracking-tighter"/>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="sm:col-span-1 lg:col-span-2 relative">
            <Input type="search" value={inputValue} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
              handleInputValue(e)
            }} className="w-full border-accent-foreground/40" placeholder="Search..." />
            {inputValue.trim().length > 0 && (
        <Card className="w-full mt-2 mobile-container absolute gap-2 overflow-y-auto rounded-lg max-h-64 border z-50 p-0 bg-background">
          {mobiles.length > 0 ? (
            mobiles.map((mobile:any, i:number) => (
              <Card onClick={()=>{
                redirectTo(mobile.name)
              }} key={i} className="h-20 px-4 hover:bg-accent cursor-pointer">
                <div className="flex gap-2 items-center h-full w-full">
                  <div className="w-16 h-16">
                    <img className="w-full h-full object-contain" src={mobile.img} alt={mobile.name} />
                  </div>
                  <p className="text-sm">{mobile.name}asd</p>
                </div>
              </Card>
            ))
          ) : (
          !isPending() && <p className="p-4 text-sm text-muted-foreground text-center border-0">No results found</p>
          )}
        </Card>
      )}
          </div>

          {/* Right Side Buttons */}
          <div className="flex gap-2 items-center justify-end  sm:col-span-1 lg:col-span-2">
            <Button
              variant="outline"
              size="icon"
              className="border-accent-foreground/40"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              {theme === "light" ? (
                <Sun className="h-5 w-5 " />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>

            <Button asChild variant="outline" size="sm" className="border-accent-foreground/40">
              <Link to={auth.account.url} className="flex items-center gap-1">
                <CircleUserRound className="w-5 h-5" />
                <span className="hidden md:inline">{auth.account.title}</span>
              </Link>
            </Button>

          </div>
        </nav>
      </div>
    </section>
  );
};

export { Navbar };
