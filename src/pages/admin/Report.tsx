import AgGridTable from '@/agGrid/table'
import { Button } from '@/components/ui/button'
import { useProducts } from '@/context/productContext'
import { BookAIcon, BookCopy } from 'lucide-react'
import React, { useEffect } from 'react'
import SearchableDropdown from 'react-select'
import ProductPartServiceInstance from "../../../service/part.service"
import { useFetch } from '@/hooks/useFetch'
import ReportServiceInstance from "../../../service/report.service"
const Report = () => {
const [products, _] = useProducts();
const [selectedProduct, setSelectedProduct] = React.useState<any>(null);
const [selectedPart, setSelectedPart] = React.useState<any>(null);
const { fn: getProductPartsFN, data: getProductPartsRes,loading } = useFetch(ProductPartServiceInstance.getProductParts);
const { fn: getStockFN, data: getStockRes,loading: getStockLoading } = useFetch(ReportServiceInstance.getStockReport);
useEffect(()=>{
  (async()=>{
    await getProductPartsFN();
  })()
},[])

useEffect(() => {
if (selectedProduct?.value && selectedPart?.value) {
  (async () => {
    try {
      await getStockFN(selectedProduct.value, selectedPart.value);
    } catch (error) {
      console.log('Error during the create stock report:', error);
    }
  })();
}
}, [selectedProduct, selectedPart]);

 useEffect(() => {
  if (getStockRes) {
    console.log(getStockRes);
    setSelectedProduct(null);
    setSelectedPart(null);
  }
}, [getStockRes]);



const cols = [
  { headerName: "Product Name", field: "productName", sortable: true, filter: true,flex:1 },
  { headerName: "Product Part Name", field: "productPartName", sortable: true, filter: true,flex:1 },
  { headerName: "Stock Quantity", field: "stockQty", sortable: true, filter: true,flex:1 }
];

return (
  <div className="w-full p-3">
    <div className="flex justify-between items-center my-6">
      <h1 className="text-2xl font-semibold">Report</h1>
      <div className="flex items-center space-x-2">
        <SearchableDropdown
  className="capitalize z-9 relative"
  placeholder="Select Product"
  name="productId"
  value={selectedProduct}
  options={products.map((item: any) => ({
    value: item._id,
    label: item.itemName,
  }))}
  onChange={(option: any) => {
    setSelectedProduct(option);
  }}
/>
      <SearchableDropdown
  className="capitalize z-9 relative"
  name="productPartId"
  placeholder="Select Product Part"
  value={selectedPart}
  options={getProductPartsRes?.productParts?.map((item: any) => ({
    value: item._id,
    label: item.partName,
  }))}
  onChange={(option: any) => {
    setSelectedPart(option);
  }}
/>

        <Button type="button">
          <BookCopy className="mr-2" />
          Report
        </Button>
      </div>
    </div>

    <AgGridTable cols={cols} rows={getStockRes || []} loading={getStockLoading} />
  </div>
);

}

export default Report