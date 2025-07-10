import AgGridTable from '@/agGrid/table';
import { Button } from '@/components/ui/button';
import type { AgGridReactProps, CustomCellRendererProps } from 'ag-grid-react';
import { Edit2Icon, LoaderCircle, LoaderIcon, PlusCircle, Trash2Icon, TrendingDown, TrendingUp, X, XCircle } from 'lucide-react';
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


const Inventory = () => {
const [products, _] = useProducts();
const [inventory, setInventory] = useState<any>([])
const {fn:geInv ,data:getInvRes,loading:invLoading}= useFetch(InventoryServiceInstance.getInventoryProduct)
const [showHandleDelete,setShowHandleDelete] = useState(false)
const [selectedInventory, setSelectedInventory] = useState<any>(null);
const [isUpdateOpen, setIsUpdateOpen] = useState(false);
    const {fn:deleteInventory ,data:deleteInventoryRes,loading:deleteInventoryLoading,setData}= useFetch(InventoryServiceInstance.deleteInventoryProduct)
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
  console.log(inventory)
  if (getInvRes) {
    const transformedData = getInvRes.map((item: any) => ({
      ...item,
      productId: item?.productId?._id || '',
      productName: item?.productId?.itemName || '',
      productPartId: item?.productPartId?._id || '',
      productPartName: item?.productPartId?.partName || '',
      'Created On': new Date(item?.createdAt),
    }));
    setInventory(transformedData);
  }
}, [getInvRes]);
  //       ****************************************************     //


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
        productId: item?.productId?._id || '',
      productName: item?.productId?.itemName || '',
      productPartId: item?.productPartId?._id || '',
      productPartName: item?.productPartId?.partName || '',
      'Created On': new Date(item?.createdAt),
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

                {/* Product Part Select */}
                <div>
                  <Label htmlFor="productPartId" className="mb-3">Product Part</Label>
                  <SearchableDropdown
                    className="capitalize"
                    name="productPartId"
                    placeholder="Select Product Part"
                    options={getSpecificProductPartsRes?.productParts?.map((item: any) => ({
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
                      options={getSpecificProductPartsRes?.productParts?.map((item: any) => ({
                        value: item._id,
                        label: item.partName,
                      }))}
                      value={
                        getSpecificProductPartsRes
                          ?.productParts?.map((item: any) => ({
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



const UpdateInventoryDialog = ({
  open,
  setOpen,
  data,
  products,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: any;
  products: any[];
}) => {
  const [productId, setProductId] = useState(data?.productId || '');
  const [productPartId, setProductPartId] = useState(data?.productPartId || '');
  const [qty, setQty] = useState(data?.qty || '');
  const [remark, setRemark] = useState(data?.remark || '');
const {fn:updateInvFn ,data:updateInvRes,loading:updateInvLoading}= useFetch(InventoryServiceInstance.updateInventoryProduct)

  const updateInventoryQty = async() => {
  try {
    await updateInvFn(data._id,qty)
  } catch (error) {
    console.log('Error during update inventory',error)
  }
};
useEffect(()=>{
  if(updateInvRes){
    toast.success('Inventory updated successfully')
    setInventory((prev: any) =>{
      const findIndex = prev.findIndex((item: any) => item._id === updateInvRes._id);
      if (findIndex !== -1) {
        prev[findIndex].qty = updateInvRes.qty; 
      }
      return [...prev];
    });
    setOpen(false)
  }
},[updateInvRes])

  const { fn: getParts, data: partOptions } = useFetch(ProductPartServiceInstance.getSpecificProductPart);;
  useEffect(() => {
    if (productId){
       getParts(productId);
    }
  }, [productId]);

console.log(partOptions,12)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[80%]">
        <DialogHeader>
          <DialogTitle>Update Inventory</DialogTitle>
          <DialogDescription>* Only Allowed Quantity field Update</DialogDescription>
        </DialogHeader>

       

           <div className="flex items-center justify-between gap-3">
              <div className="grid grid-cols-4 gap-4 w-full">
                {/* Product Select */}
                <div>
                  <Label htmlFor="productId" className="mb-3">Product Name</Label>
                  <SearchableDropdown
                  isDisabled
                  className='capitalize'
              placeholder="Select Product"
              options={products.map((p) => ({ value: p._id, label: p.itemName }))}
              value={products.find((p) => p._id === productId) && {
                value: productId,
                label: products.find((p) => p._id === productId).itemName,
              }}
              onChange={(e) => {
                setProductId(e.value);
                setProductPartId('');
              }}
            />
                </div>

                {/* Brand Select */}
                <div>
                  <Label htmlFor="productPartId" className="mb-3">Product Part</Label>
                  <SearchableDropdown
                  isDisabled
                    className='capitalize'
              placeholder="Select Part"
              options={partOptions && partOptions?.productParts?.map((part: any) => ({ value: part._id, label: part.partName }))}
              value={
               partOptions && partOptions?.productParts?.find((p: any) => p._id === productPartId) && {
                  value: productPartId,
                  label: partOptions?.productParts.find((p: any) => p._id === productPartId)?.partName,
                }
              }
              onChange={(e) => setProductPartId(e.value)}
            />
                </div>

                <div>
                  <Label htmlFor="qty" className="mb-3">Quantity</Label>
                 <Input type="number" value={qty} onChange={(e) => setQty(e.target.value)} />
                </div>

                <div>
                  <Label htmlFor="remark" className="mb-3">Remark</Label>
                    <Input value={remark}
                    disabled
                     onChange={(e) => setRemark(e.target.value)} />
                </div>
              </div>
            </div>


        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={updateInventoryQty}>
            {
              updateInvLoading ? <LoaderIcon className='animate-spin'/> :'Update'
            }

          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};



const DeductInventory = () => {
  const formRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [deductInventoryRows, setDeductInventoryRows] = useState([
    { productId: "", productPartId: "", qty: "", remark: "" }
  ]);

  const [productPartOptions, setProductPartOptions] = useState<Record<number, any[]>>({});
  const [stockQuantities, setStockQuantities] = useState<Record<number, number>>({});
  const { fn: deductProductFn, data: deductProductRes, loading: deductProductLoading } = useFetch(InventoryServiceInstance.deductProductName);

   const { fn: deductInventoryFn, data: deductInventoryRes, loading: deductInventoryLoading } = useFetch(InventoryServiceInstance.deductInventory);

  useEffect(() => {
    deductProductFn();
  }, []);

  console.log(deductProductRes,12121)

  const handleClone = () => {
    setDeductInventoryRows((prev) => [
      ...prev,
      { productId: "", productPartId: "", qty: "", remark: "" },
    ]);
  };

  const updateRow = (index, field, value) => {
    setDeductInventoryRows((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  const removeElement = (idx) => {
    const newRows = [...deductInventoryRows];
    newRows.splice(idx, 1);
    setDeductInventoryRows(newRows);
  };


  const handleProductChange = async (option, index) => {
    updateRow(index, "productId", option?.value);

    if (option?.value) {
      try {
        const parts = await InventoryServiceInstance.deductProductPartNameById(option.value);
        setProductPartOptions((prev) => ({
          ...prev,
          [index]: parts || [],
        }));
      } catch (error) {
        console.error("Failed to fetch product parts:", error);
      }
    } else {
      setProductPartOptions((prev) => ({
        ...prev,
        [index]: [],
      }));
    }

    setStockQuantities((prev) => ({ ...prev, [index]: 0 }));
    updateRow(index, "productPartId", "");
  };

  const handleProductPartChange = async (option, index) => {
    updateRow(index, "productPartId", option?.value);

    const { productId } = deductInventoryRows[index];
    if (productId && option?.value) {
      try {
        const res = await InventoryServiceInstance.calculateStockQuanty(productId, option.value);
        setStockQuantities((prev) => ({ ...prev, [index]: res?.stockQuantity || 0 }));
      } catch (error) {
        console.error("Error fetching stock quantity", error);
      }
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      await deductInventoryFn(deductInventoryRows)
    } catch (error) {
      console.log('Error during the deduct Inventory:',error)
    }
  };

  console.log(deductInventoryRes,323)
  useEffect(()=>{
    if(deductInventoryRes){
      const transformedData = deductInventoryRes?.stockEntries?.map((item: any) => {
     return {
      ...item,
      productId: item?.productId?._id || '',
      productName: item?.productId?.itemName || '',
      productPartId: item?.productPartId?._id || '',
      productPartName: item?.productPartId?.partName || '',
      'Created On': new Date(item?.createdAt),
     }
        
    });
    setInventory((prev:any)=>[...prev, ...transformedData]);
      setOpen(false)
    }
  },[deductInventoryRes])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)}>Deduct Inventory</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[80%]">
        <form className="grid gap-4" ref={formRef} onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Deduct Inventory</DialogTitle>
            <DialogDescription />
          </DialogHeader>

          <div className="grid gap-3">
            {deductInventoryRows.map((row, index) => (
              <div key={index} className="flex items-center justify-between gap-3 customDiv">
                <div className="grid grid-cols-4 gap-4 w-full">
                  
                  {/* Product Select */}
                  <div>
                    {index === 0 && (
                      <Label htmlFor={`productId-${index}`} className="mb-3">
                        Product Name
                      </Label>
                    )}
                    <SearchableDropdown
                      className="capitalize"
                      placeholder="Select Product"
                      name={`productId-${index}`}
                      value={
                        deductProductRes
                          ?.map((item) => ({
                            value: item?._id,
                            label: item?.itemName,
                          }))
                          .find((option) => option.value === row.productId) || null
                      }
                      options={deductProductRes?.map((item) => ({
                        value: item?._id,
                        label: item?.itemName,
                      }))}
                      onChange={(option) => handleProductChange(option, index)}
                    />
                  </div>

                  {/* Product Part Select */}
                  <div>
                    {index === 0 && (
                      <Label htmlFor={`productPartId-${index}`} className="mb-3">
                        Product Part
                      </Label>
                    )}
                    <SearchableDropdown
                      className="capitalize"
                      name={`productPartId-${index}`}
                      placeholder="Select Product Part"
                      value={
                        (productPartOptions[index] || [])
                          .map((item) => ({
                            value: item?._id,
                            label: item?.partName,
                          }))
                          .find((option) => option.value === row.productPartId) || null
                      }
                      options={(productPartOptions[index] || []).map((item) => ({
                        value: item?._id,
                        label: item?.partName,
                      }))}
                      onChange={(option) => handleProductPartChange(option, index)}
                    />
                    <span className="inline-block font-semibold float-end text-[10px] mt-1 text-green-600 bg-gray-100 px-2 py-1 rounded-md">
                      Available Stock Qty: {stockQuantities[index] ?? 0}
                    </span>
                  </div>

                  {/* Quantity Input */}
                  <div>
                    {index === 0 && (
                      <Label htmlFor={`qty-${index}`} className="mb-3">
                        Quantity
                      </Label>
                    )}
                    <Input
                      id={`qty-${index}`}
                      name={`qty-${index}`}
                      type="number"
                      placeholder="e.g 1"
                      required
                      value={row.qty}
                      onChange={(e:any) => {
                      if(stockQuantities[index] < e.target.value){
                        toast.error(`Quantity cannot be greater than available stock ${stockQuantities[index]} quantity`)
                        return;
                      }  
                      updateRow(index, "qty", e.target.value)}}
                    />
                  </div>

                  {/* Remark Input */}
                  <div>
                    {index === 0 && (
                      <Label htmlFor={`remark-${index}`} className="mb-3">
                        Remark
                      </Label>
                    )}
                    <Input
                      id={`remark-${index}`}
                      name={`remark-${index}`}
                      placeholder="Remark..."
                      
                      value={row.remark}
                      onChange={(e) => updateRow(index, "remark", e.target.value)}
                    />
                  </div>
                </div>

                {index === 0 ? (
                  <PlusCircle className="mt-2 cursor-pointer" onClick={handleClone} />
                ) : (
                  <XCircle className="mt-2 cursor-pointer" onClick={() => removeElement(index)} />
                )}
              </div>
            ))}
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={deductProductLoading || deductInventoryLoading}>
              {deductProductLoading || deductInventoryLoading ? <LoaderCircle className="animate-spin" /> : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};


function HandleDeleteComponent({
  showHandleDelete,
  setShowHandleDelete,
  data,
}: {
  showHandleDelete: boolean;
  setShowHandleDelete: React.Dispatch<React.SetStateAction<boolean>>;
  data: any;
}){

    const handleDelete =async()=>{
      try {
    await deleteInventory(data._id)
  } catch (error) {
    console.log('Error during update inventory',error)
  }
  }

  console.log(deleteInventoryRes,3)

 useEffect(() => {
  if (deleteInventoryRes) {
 
    setInventory((prev: any) => prev.filter((item: any) => item._id !== data._id));
    setData(null)
  }
}, [deleteInventoryRes]);

    return(
    <AlertDialog open={showHandleDelete} onOpenChange={setShowHandleDelete}>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Do you want to delete Product?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={handleDelete} disabled={deleteInventoryLoading}>
        {
          deleteInventoryLoading ? <LoaderCircle className='animate-spin' /> : 'Delete'
        }
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
    )

  }

 const ActionButtons = (params: CustomCellRendererProps) => (
  <div className="flex justify-center items-center h-full space-x-3.5">
    <Button
      className="cursor-pointer"
      variant="secondary"
      size="icon"
      title="Edit"
      onClick={() => {
        setSelectedInventory(params.data);
        setIsUpdateOpen(true);
      }}
    >
      <Edit2Icon />
    </Button>
    <Button
    onClick={() => {
        setSelectedInventory(params.data);
        setShowHandleDelete(true);
      }}
    className="cursor-pointer" variant="destructive" size="icon" title="Delete">
      <Trash2Icon />
    </Button>
  </div>
);


const QuantityComponent =(params:CustomCellRendererProps)=>{
  if(params.data.stockType.toLowerCase() === 'out'){
    return <div className='flex items-center gap-3 text-red-500'>
      <span className='text'>{params.data.qty}</span>
      <TrendingUp/>
    </div>
  }else{
   return <div className='flex items-center gap-3 text-green-500'>
      <span>{params.data.qty}</span>
      <TrendingDown/>
    </div>
  }
}

const RemarkComponent =(params:CustomCellRendererProps)=>{
  return params.data.remark.length > 0 ? params.data.remark : '--'
}
  const colDefs = [
    {field:'productId',hide:true},
    {field:'productPartId',hide:true},
     { field: 'productName',headerName:'Product Name', flex: 2, minWidth: 150, sortable: true, filter: true, floatingFilter: true},
    { field: 'productPartName', headerName: 'Product Part Name', flex:2, minWidth: 150, sortable: true, filter: true, floatingFilter: true },
     { field: 'stockType', headerName: 'StockType', flex:1, minWidth: 150, sortable: true, filter: true, floatingFilter: true },
    { field: 'qty', headerName: 'Quantity', flex: 1, minWidth: 150, sortable: true, filter: true, floatingFilter: true ,cellRenderer:QuantityComponent },
    { field: 'remark', headerName: 'Remark', flex: 1, minWidth: 150, sortable: true, filter: true, floatingFilter: true ,cellRenderer:RemarkComponent},
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
       products && (<div className='flex gap-3 items-center'><AddInventory setInventory={setInventory}/>  <DeductInventory/></div>)
      }
       
       {isUpdateOpen && selectedInventory && (
  <UpdateInventoryDialog
    open={isUpdateOpen}
    setOpen={setIsUpdateOpen}
    data={selectedInventory}
    products={products}
  />
)}


 {selectedInventory && (
  <HandleDeleteComponent
    key={selectedInventory._id}
    showHandleDelete={showHandleDelete}
    setShowHandleDelete={setShowHandleDelete}
    data={selectedInventory}
  />
)}

      </div>
      <div className='overflow-y-auto'>
        <AgGridTable cols={colDefs} rows={inventory} loading={invLoading} />
      </div>
    </div>
  )
}

export default Inventory