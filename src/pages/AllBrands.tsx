import { useLocation } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { HashLink } from 'react-router-hash-link';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Search } from 'lucide-react';
import { useFetch } from '@/hooks/useFetch';
import BrandServiceInstance from '../../service/brand.service';
import { VITE_BASE_URL } from '@/helper/instance';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';


function useQuery() {
  const { search } = useLocation();
  return new URLSearchParams(search);
}

const Products = () => {
  const query = useQuery();
  const brand = query.get('brand') || '';
  const [inputValue, setInputValue] = useState('');
  const [debouncedText] = useDebounce(inputValue, 800);
  const {fn: getBrandsFn,data: getBrandsRes,loading: brandsLoading} = useFetch(BrandServiceInstance.getAllBrand);

  const [brandData, setBrandData] = useState([]);
  const [allBrands, setAllBrands] = useState([]); // original data
  const [filteredBrands, setFilteredBrands] = useState([]); // search filtered data

  useEffect(() => {
      getBrandsFn();
  }, []);

  useEffect(() => {
    if (Array.isArray(getBrandsRes)) {
      const formattedProducts = getBrandsRes.map(brand => ({
        id: brand._id,
        brandName: brand.brandName,
        img: `${VITE_BASE_URL}/uploads/${brand.image || ""}`,
      }));
      setBrandData(formattedProducts);
      setAllBrands(formattedProducts);
    }
  }, [getBrandsRes]);

  useEffect(() => {
    const trimmed = debouncedText.trim().toLowerCase();
    if (!trimmed) {
      setFilteredBrands([]);
      return;
    }

    const result = allBrands.filter(item =>
      item.brandName.toLowerCase().includes(trimmed)
    );
    setFilteredBrands(result);
  }, [debouncedText, allBrands]);

  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const displayBrands = filteredBrands.length > 0 || inputValue.trim()
    ? filteredBrands
    : brandData;

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
                All Brands
              </HashLink>
            </BreadcrumbLink>
            </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className='mt-10'>
        <h1 className='text-2xl font-semibold text-foreground capitalize text-center'>
          Select Brand for Your Mobile
        </h1>

        <div className='mx-auto w-full md:w-1/2 relative'>
          <Input
            value={inputValue}
            onChange={handleInputValue}
            className="w-full placeholder:capitalize pr-8 border-accent-foreground/40 mt-5"
            placeholder={`Search Brand for your mobile`}
          />
          <Search className='w-4 h-4 text-gray-500 absolute top-1/2 right-2 transform -translate-y-1/2' />
        </div>

        <div className='mt-10 grid grid-cols-2 container mx-auto sm:grid-cols-4 md:grid-cols-5 gap-4'>
          {displayBrands.length > 0 ? (
            displayBrands.map((item, i) => (
              <div key={i}>
               <a href={"/products?brand=" + item.id}>
                  <Card className="h-40 w-40 bg-transparent border-0 ">
                    <img
                      src={item.img}
                      alt={item.brandName}
                      className="w-full h-full rounded-xl object-contain "
                    />
                  </Card>
                </a>
              </div>
            ))
          ) : (
            !brandsLoading && (
              <p className="text-center col-span-full text-muted-foreground mt-10">
                No Brands Found
              </p>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
