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
import ProductPartDetailsServiceInstance from '../../service/part.service';
import ProductPartServiceInstance from '../../service/part.service';
import { VITE_BASE_URL } from '@/helper/instance';

const AccessoriesOverview = () => {
  const { device, partDetail, partId } = useParams();

  const { fn: getProductAndItsPartDetail, data: getProductAndItsPartDetailRes } = useFetch(ProductPartDetailsServiceInstance.getSpecificProductPartDetail);
  const { fn: getProductAndItsParts, data: getProductAndItsPartsRes } = useFetch(ProductPartServiceInstance.getSpecificProductPart);

  const [product, setProduct] = useState<any>(null);
  const [productPart, setProductPart] = useState<any>(null);
  const [productParts, setProductParts] = useState<any>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (partId) {
      getProductAndItsPartDetail(partId);
    }
  }, [partId]);
  useEffect(() => {
    if (getProductAndItsPartDetailRes) {
      const { productDetails, productPart } = getProductAndItsPartDetailRes;
      setProduct(productDetails[0]);
      setProductPart(productPart);

      if (productDetails[0]?.itemName) {
        setLoading(true);
        getProductAndItsParts(productDetails[0]._id).finally(() => setLoading(false));
      }
    }
  }, [getProductAndItsPartDetailRes]);

  useEffect(() => {
    if (getProductAndItsPartsRes) {
      const { productParts } = getProductAndItsPartsRes;
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

  const whatsappNumber = '919785133200';
  const phoneNumber = '9785133200';

  return (
    <section className="container mx-auto p-4 md:p-6">

      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className='capitalize'>{product?.itemName || device}</BreadcrumbPage>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className='capitalize'>{productPart?.partName || partDetail}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Main Product Part Detail */}
      <div className="mt-10 flex flex-col lg:flex-row items-start gap-10">
        {productPart?.images?.[0] && (
          <Card className='w-100 h-100 bg-transparent border-0'>
            <img
              src={`${VITE_BASE_URL}/uploads/${productPart.images[0]}`}
              alt={productPart.partName}
              className="w-full h-full object-contain rounded-xl"
            />
          </Card>
        )}

        <div className="flex-1">
          <h2 className="text-3xl font-bold text-foreground mb-2 capitalize flex items-center gap-5">
            {productPart?.partName}
            {
              Boolean(0)  && <img className='h-12' src="https://t4.ftcdn.net/jpg/02/65/83/15/360_F_265831541_RUAcAGkikMs2WJOZ40D1BzjWqyp0MRze.jpg" alt="" />
            }
          </h2>
          <h3 className="text-lg text-foreground/70 mb-6 capitalize">
            {product?.itemName}
          </h3>

          <p className="text-foreground/70 leading-relaxed mb-6">
            {`This ${productPart?.partName} for ${product?.itemName} is designed to restore your phone's look and durability.`}
          </p>

          <ul className='list-disc list-inside text-foreground/70 space-y-2 mb-8'>
            <li>High-quality, durable materials</li>
            <li>Perfect replacement for the original part</li>
            <li>Precision fit for {product?.itemName}</li>
            <li>Tested for quality before shipping</li>
            <li>Restores your phone’s original appearance</li>
          </ul>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-1/2 py-4 rounded-full bg-green-500 hover:bg-green-600 text-white font-semibold text-lg text-center"
            >
              WhatsApp Us
            </a>
            <a
              href={`tel:${phoneNumber}`}
              className="w-full sm:w-1/2 py-4 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-lg text-center"
            >
              Call Us
            </a>
          </div>
        </div>
      </div>

      {/* Other Spare Parts */}
      {Object.keys(productParts).length > 1 && (
        <div className='mt-16'>
          <h1 className='text-2xl font-semibold text-foreground mb-4 capitalize'>
            Other Spare Parts for {product.itemName}
          </h1>

          {Object.keys(productParts).length > 0 ? (
            Object.keys(productParts).map((category, index) => (
              <div key={index} className='mt-10'>
                <h2 className='text-xl font-semibold text-foreground mb-6 capitalize'>{category}</h2>
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4'>
                  {productParts[category]
                    .filter((p: any) => p._id !== partId) // Exclude the current part
                    .map((item: any, i: number) => (
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
            !loading && <p className="text-center text-muted-foreground mt-10">No other parts available.</p>
          )}
        </div>
      )}

      {loading && <p className="text-center mt-10 text-foreground">Loading spare parts...</p>}
    </section>
  );
};

export default AccessoriesOverview;
