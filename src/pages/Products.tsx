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
import ProductServiceInstance from '../../service/product.service';
import { VITE_BASE_URL } from '@/helper/instance';
import { useEffect, useState } from 'react';

function useQuery() {
  const { search } = useLocation();
  return new URLSearchParams(search);
}

const Products = () => {
  const query = useQuery();
  const brand = query.get('brand') || '';
  
  const { fn: getProductsFn, data: getProductsRes, loading: productsLoading } = useFetch(ProductServiceInstance.getProducts);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (brand) {
      getProductsFn({ brand: brand });
    }
  }, [brand]);

  useEffect(() => {
    if (Array.isArray(getProductsRes)) {
      const formattedProducts = getProductsRes.map(item => ({
        brand: item.brand.brandName,
        img: `${VITE_BASE_URL}/uploads/${item.images[0] || ''}`,
        name: item.itemName || '',
      }));
      setProducts(formattedProducts);
    }
  }, [getProductsRes]);


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
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className='capitalize'>{products[0]?.brand}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className='mt-10'>
        <h1 className='text-2xl font-semibold text-foreground capitalize text-center'>Select {products[0]?.brand} Mobile Phone Model</h1>
        
        <div className='mx-auto w-1/2 relative'>
          <Input className="w-full placeholder:capitalize pr-8 border-accent-foreground/40 mt-5" placeholder={`Search your: ${products[0]?.brand} handset`} />
          <Search className='w-4 h-4 text-gray-500 absolute top-1/2 right-2 transform -translate-y-1/2' />
        </div>

        {/* Dynamic Products */}
        <div className='mt-10 grid grid-cols-2 container mx-auto sm:grid-cols-4 md:grid-cols-5 gap-4 '>
          {products.length > 0 ? (
            products.map((item, i) => (
              <div key={i}>
                <a href={`/accessories/${encodeURIComponent(item.name)}`} className='flex justify-center'>
                  <Card className='h-40 w-40 bg-transparent border-0'>
                    <img src={item.img} alt={item.name} className='w-full h-full rounded-xl object-contain' />
                  </Card>
                </a>
                <h1 className='text-center font-medium text-sm text-foreground capitalize mt-4'>{item.name}</h1>
              </div>
            ))
          ) : (
            !productsLoading && <p className="text-center col-span-full text-muted-foreground mt-10">No Models Found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
