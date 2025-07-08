import AgGridTable from '@/agGrid/table';
import { Button } from '@/components/ui/button';
import type { CustomCellRendererProps } from 'ag-grid-react';
import { Edit2Icon, LoaderCircle, PlusCircle, Trash2Icon, X, XCircle } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import SearchableDropdown from 'react-select'
import { Label } from '@/components/ui/label';
import { useProducts } from '@/context/productContext';
import InventoryServiceInstance from '../../../service/inventory.service';
import { useFetch } from '@/hooks/useFetch';
import toast from 'react-hot-toast';
import ProductPartServiceInstance from '../../../service/part.service';


const Inventory = () => {
const [products, _] = useProducts();
const [inventory, setInventory] = useState<any>([])
const {fn:geInv ,data:getInvRes,loading:invLoading}= useFetch(InventoryServiceInstance.getInventoryProduct)

useEffect(()=>{
  (async()=>{
    try {
      await geInv()
    } catch (error) {
      console.log(error)
    }
  })()
},[])

useEffect(() => {
  if (getInvRes) {
    const transformedData = getInvRes.map((item: any) => ({
      ...item,
      productId: item?.productId?.itemName || '',
      productPartId: item?.productPartId?.partName || '',
      'Created On': new Date(item?.createdAt).toLocaleString(),
    }));
    setInventory(transformedData);
  }
}, [getInvRes]);
console.log(getInvRes)
  //       ****************************************************     //
  const deTectacInventory = ()=>{


  }

const AddInventory = ({ setInventory }: { setInventory: React.Dispatch<React.SetStateAction<any[]>> }) => {
  const formRef = useRef(null);
  const [open, setOpen] = useState(false);
const { fn:createBulkProduct, data: createBulkRes, loading: createBulkLoading } = useFetch(InventoryServiceInstance.createBulkInventoryProduct);
  const [inventoryRows, setInventoryRows] = useState<any>([]);
    const { fn: getSpecificProductPartsFN, data: getSpecificProductPartsRes,loading:productSpecificPartLoading } = useFetch(ProductPartServiceInstance.getSpecificProductPart);

  const handleSubmit = () => {
    // handle form submit
  };


  useEffect(()=>{
    if(getSpecificProductPartsRes){
      
  console.log(getSpecificProductPartsRes,121212)
    }
  },[getSpecificProductPartsRes])

  const handleClone = () => {
    setInventoryRows((prev: any) => [
      ...prev,
      { productId: "", productPartId: "", qty: "", remark: "" },
    ]);
  };

  const specificProductParts =async(value)=>{
    try {
      await getSpecificProductPartsFN(value)
    } catch (error) {
      console.log({error})
      
    }
  }

  const updateRow = async(index: number, field: string, value: any) => {
   
    setInventoryRows((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  const removeElement = (idx: number) => {
    const newRows = [...inventoryRows];
    newRows.splice(idx, 1);
    setInventoryRows(newRows);
  };

  const createBulkInventoryProject =async ()=>{
    try {
      await createBulkProduct(inventoryRows)
    } catch (error) {
      console.log('Errro to create bulk inventory project',error)
      
    }
  }

  console.log(createBulkRes,22)

useEffect(() => {
  if (createBulkRes) {
    console.log({ createBulkRes });
    setOpen(false);
    toast.success('Inventory created successfully');
    setInventory((prev: any) => [
      ...prev,
      ...createBulkRes?.stockEntries.map((item: any) => ({
        ...item,
        productId: item?.productId?.itemName || '',
        productPartId: item?.productPartId?.partName || '',
        'Created On': new Date(item?.createdAt).toLocaleString(),
      })),
    ]);
  }
}, [createBulkRes]);



  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)}>Add Inventory</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[80%]">
        <form className="grid gap-4" ref={formRef} onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add Inventory</DialogTitle>
            <DialogDescription />
          </DialogHeader>

          <div className="grid gap-3">
            {/* Initial row */}
            <div className="flex items-center justify-between gap-3 customDiv">
              <div className="grid grid-cols-4 gap-4 w-full">
                {/* Product Select */}
                <div>
                  <Label htmlFor="productId" className="mb-3">Product Name</Label>
                  <SearchableDropdown
                    className="capitalize"
                    placeholder="Select Product"
                    name="productId"
                    options={products.map((item: any) => ({
                      value: item._id,
                      label: item.itemName,
                    }))}
                    onChange={(option: any) =>{
                      specificProductParts(option?.value)
                      setInventoryRows([
                        {
                          productId: option?.value,
                          productPartId: "",
                          qty: "",
                          remark: "",
                        },
                      ])
                    }
                    }
                     
                  />
                </div>

                {/* Brand Select */}
                <div>
                  <Label htmlFor="productPartId" className="mb-3">Product Part</Label>
                  <SearchableDropdown
                    className="capitalize"
                    name="productPartId"
                    placeholder="Select Product Part"
                    options={getSpecificProductPartsRes?.map((item: any) => ({
                      value: item._id,
                      label: item.partName,
                    }))}
                    onChange={(option: any) =>
                    
                      updateRow(0, "productPartId", option?.value)
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="qty" className="mb-3">Quantity</Label>
                  <Input
                    id="qty"
                    name="qty"
                    type="number"
                    placeholder="e.g 1"
                    required
                    onChange={(e) => updateRow(0, "qty", e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="remark" className="mb-3">Remark</Label>
                  <Input
                    id="remark"
                    name="remark"
                    placeholder="Remark..."
                    required
                    onChange={(e) => updateRow(0, "remark", e.target.value)}
                  />
                </div>
              </div>
              <PlusCircle className="mt-2 cursor-pointer" onClick={handleClone} />
            </div>

            {/* Cloned rows */}
            {inventoryRows.slice(1).map((row, index) => (
              <div key={index} className="flex items-center justify-between gap-3 customDiv">
                <div className="grid grid-cols-4 gap-4 w-full">
                  <div>
                    <SearchableDropdown
                      className="capitalize"
                      placeholder="Select Product"
                      name={`productId-${index + 1}`}
                      options={products.map((item: any) => ({
                        value: item._id,
                        label: item.itemName,
                      }))}
                      value={
                        products
                          .map((item: any) => ({
                            value: item._id,
                            label: item.itemName,
                          }))
                          .find((option) => option.value === row.productId) || null
                      }
                      onChange={(option: any) =>{
                        specificProductParts(option?.value)
                        updateRow(index + 1, "productId", option?.value)
                      }
                        
                      }
                    />
                  </div>

                  <div>
                    <SearchableDropdown
                      className="capitalize"
                      name={`productPartId-${index + 1}`}
                      placeholder="Select Product Part"
                      options={getSpecificProductPartsRes?.map((item: any) => ({
                        value: item._id,
                        label: item.partName,
                      }))}
                      value={
                        getSpecificProductPartsRes
                          ?.map((item: any) => ({
                            value: item._id,
                            label: item.partName,
                          }))
                          .find((option) => option.value === row.productPartId) || null
                      }
                      onChange={(option: any) =>
                        updateRow(index + 1, "productPartId", option?.value)
                      }
                    />
                  </div>

                  <div>
                    <Input
                      id={`qty-${index + 1}`}
                      name={`qty-${index + 1}`}
                      type="number"
                      placeholder="e.g 1"
                      required
                      value={row.qty}
                      onChange={(e) => updateRow(index + 1, "qty", e.target.value)}
                    />
                  </div>

                  <div>
                    <Input
                      id={`remark-${index + 1}`}
                      name={`remark-${index + 1}`}
                      placeholder="Remark..."
                      required
                      value={row.remark}
                      onChange={(e) => updateRow(index + 1, "remark", e.target.value)}
                    />
                  </div>
                </div>

                <XCircle className="mt-2 cursor-pointer" onClick={() => removeElement(index + 1)} />
              </div>
            ))}
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="button" onClick={createBulkInventoryProject} disabled={createBulkLoading}>
              {createBulkLoading ? <LoaderCircle className="animate-spin" /> : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};


  const ActionButtons = (params: CustomCellRendererProps) => (
  <div className="flex justify-center items-center h-full space-x-3.5">
    <Button
      className="cursor-pointer"
      variant="secondary"
      size="icon"
      title="Edit"
      onClick={() => {
        // setSelectedBrand(params.data);
        // setIsUpdateOpen(true);
      }}
    >
      <Edit2Icon />
    </Button>
  <Button className="cursor-pointer" variant="destructive" size="icon" title="Delete" onClick={()=>{
      // setShowHandleDelete(true);
      // setDeleteId(params.data._id);
    }}>
      <Trash2Icon />
    </Button>
  </div>
);
  
  const colDefs = [
     { field: 'productId',headerName:'Product Name', flex: 2, minWidth: 150, sortable: true, filter: true, floatingFilter: true},
    { field: 'productPartId', headerName: 'Product Part Name', flex:2, minWidth: 150, sortable: true, filter: true, floatingFilter: true },
    { field: 'qty', headerName: 'Quantity', flex: 1, minWidth: 150, sortable: true, filter: true, floatingFilter: true },
    { field: 'remark', headerName: 'Remark', flex: 1, minWidth: 150, sortable: true, filter: true, floatingFilter: true },
    {
      field: 'Created On',
      flex: 1,
      minWidth: 120,
      sortable: true,
      filter: 'agDateColumnFilter',
      floatingFilter: true,
    },
    {
      field: 'Action',
      flex: 1,
      maxWidth: 150,
      cellRenderer: ActionButtons,
      pinned: 'right',
      suppressMovable: true,
    },
  ];

  return (
    <div className=" w-full p-3 ">

      <div className="flex justify-between items-center my-6">
        <h1 className="text-2xl font-semibold">Inventory</h1>
      {
       products &&  <AddInventory setInventory={setInventory}/>
      }
       
      </div>
      <div className='overflow-y-auto'>
        <AgGridTable cols={colDefs} rows={inventory} loading={invLoading} />
      </div>
    </div>
  )
}

export default Inventory