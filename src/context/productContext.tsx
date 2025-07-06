import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  type SetStateAction,
  type Dispatch,
  type ReactNode,
} from "react";

import { useFetch } from "@/hooks/useFetch";
import ProductServiceInstance from "../../service/product.service";

// Define your Product type
type ProductType = {
  Name: string;
  Brand: string;
  Image: string;
  Description: string;
  'Created On': Date;
};

type ProductContextType = [
  ProductType[],
  Dispatch<SetStateAction<ProductType[]>>,
  boolean, // loading
  string | null // error
];

export const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductContextProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const {
    fn: getProductsFN,
    data: getProductsRes,
    loading,
    error,
  } = useFetch(ProductServiceInstance.getProducts);

  useEffect(() => {
    (async () => {
      try {
        await getProductsFN();
      } catch (err) {
        console.error("Error getting products:", err);
      }
    })();
  }, []);

  useEffect(() => {
    if (getProductsRes) {
      const newData = Array.isArray(getProductsRes) ? getProductsRes : [getProductsRes];
      const formattedData: ProductType[] = newData.map((item: any) => ({
        ...item,
        Name: item.itemName,
        Model: item.model,
        Brand: item.brand?.brandName || '',
        Image: item.images?.pop() || '',
        Description: item.description,
        'Created On': new Date(item.createdAt),
      })).filter(item => !item.isDeleted);
      setProducts(formattedData.reverse());
    }
  }, [getProductsRes]);

  return (
    <ProductContext.Provider value={[products, setProducts, loading, error ?? null]}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductContextProvider");
  }
  return context;
};
