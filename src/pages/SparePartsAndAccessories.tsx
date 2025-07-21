import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card } from '@/components/ui/card';
import { useFetch } from '@/hooks/useFetch';
import ProductPartServiceInstance from '../../service/part.service';
import { VITE_BASE_URL } from '@/helper/instance';

const SparePartsAndAccessories = () => {
  const { device } = useParams();
  const { fn: getProductAndItsParts, data: getProductAndItsPartsRes, loading } = useFetch(ProductPartServiceInstance.getSpecificProductPart);
  const [product, setProduct] = useState<any>(null);
  const [productParts, setProductParts] = useState<any>({});

  useEffect(() => {
    if (device) {
      getProductAndItsParts(device);
    }
  }, [device]);

  useEffect(() => {
    if (getProductAndItsPartsRes) {
      const { product, productParts } = getProductAndItsPartsRes;
      setProduct(product);

      // Group productParts by category
      const groupedParts = productParts?.reduce((acc: any, part: any) => {
        if (!acc[part.category]) {
          acc[part.category] = [];
        }
        acc[part.category].push(part);
        return acc;
      }, {});
      setProductParts(groupedParts || {});
    }
  }, [getProductAndItsPartsRes]);

  return (
    <div className='container mx-auto p-3 md:p-0'>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href='/allBrands' className='capitalize'>All Brands</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/products?brand=${product?.brand.brandId}`} className='capitalize'>{product?.brand?.brandName}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className='capitalize'>{product?.itemName || decodeURIComponent(device || '')}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {product && (
        <div className='mt-10'>
          <div className='flex items-center gap-5'>
            <Card className='h-40 w-40 bg-transparent border-0'>
              <img
                src={`${VITE_BASE_URL}/uploads/${product.images?.[0] || ''}`}
                alt={product.itemName}
                className='w-full h-full rounded-xl object-contain'
              />
            </Card>
            <div>
              <h1 className='text-xl font-semibold text-foreground capitalize'>{product.itemName} Spare Parts</h1>
              <p className='text-sm my-2 text-foreground'>Brand: {product.brand?.brandName || 'N/A'}</p>
              <p className='text-sm my-2 text-foreground'>Model: {product.model || 'N/A'}</p>
              <p className='text-sm my-2 text-foreground'>Description: {product.description || 'No description available'}</p>
            </div>
          </div>

          <div className='mt-5 px-2 container mx-auto'>
            {Object.keys(productParts).length > 0 ? (
              Object.keys(productParts).map((category, index) => (
                <div key={index} className='mt-5'>
                  <h1 className='text-xl font-semibold text-foreground my-10 capitalize'>{category}</h1>
                  <div className='grid grid-cols-2 container mx-auto sm:grid-cols-3 md:grid-cols-6 gap-2 justify-items-center'>
                    {productParts[category].map((item: any, i: number) => (
                      <div key={i}>
                        <a href={`/${encodeURIComponent(product.itemName)}/${encodeURIComponent(category)}/${encodeURIComponent(item._id)}`}>
                          <Card className='p-2'>
                            <img
                              src={`${VITE_BASE_URL}/uploads/${item.images?.[0] || ''}`}
                              alt={item.partName}
                              className='w-full h-36 object-contain mx-auto'
                            />
                          </Card>
                          <h1 className='text-sm font-medium mt-2 text-center'>{item.partName}</h1>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              !loading && <p className="text-center text-muted-foreground mt-10">No parts available.</p>
            )}
          </div>
        </div>
      )}

      {loading && <p className="text-center mt-10 text-foreground">Loading...</p>}
    </div>
  );
};

export default SparePartsAndAccessories;
