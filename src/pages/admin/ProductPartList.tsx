import { useFetch } from '@/hooks/useFetch';
import React, { useEffect, useRef, useState } from 'react'
import ProductPartServiceInstance from "../../../service/part.service"
import AgGridTable from '@/agGrid/table';
import { Button } from '@/components/ui/button';
import { Edit2Icon, LoaderCircle, Trash2Icon } from 'lucide-react';
import type { CustomCellRendererProps } from 'ag-grid-react';
import { VITE_BASE_URL } from '@/helper/instance';
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import toast from 'react-hot-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import SearchableDropdown from 'react-select'
import { useProducts } from '@/context/productContext';

const categoryOptions = [
  { value: "Display & Screens", label: "Display & Screens" },
  { value: "Body & Housings", label: "Body & Housings" },
  { value: "Battery", label: "Battery" },
  { value: "Internal Components", label: "Internal Components" },
  { value: "Repairing Tools", label: "Repairing Tools" },
  { value: "Accessories", label: "Accessories" },
  { value: "Others", label: "Others" },
];


const ProductPartList = () => {
  const [parts, setParts] = useState<any>([])
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [showHandleDelete, setShowHandleDelete] = useState(false)
  const [deleteId, setDeleteId] = useState('')
  const { fn: getProductPartsFN, data: getProductPartsRes, loading } = useFetch(ProductPartServiceInstance.getProductParts);
  const { fn: updateProductPartFn, data: updateProductPartRes, loading: updateProductPartLoading } = useFetch(ProductPartServiceInstance.updateProductPart);
  const { fn: deleteProductPartFn, data: deleteProductPartRes, loading: deleteProductPartLoading } = useFetch(ProductPartServiceInstance.deleteProductPart);
  useEffect(() => {
    (async () => {
      try {
        await getProductPartsFN()
      } catch (error) {
        console.log('Error during the get parts:', error)
      }
    })()
  }, [])

  useEffect(() => {

    if (getProductPartsRes) {
      const result = getProductPartsRes?.productParts.map((item: any) => {
        return {
          ...item,
          ItemName: item?.productId?.itemName,
          Category: item?.category,
          PartName: item?.partName,
          Image: `${VITE_BASE_URL}/uploads/${item?.images[0]}`,
          'Created On': new Date(item?.createdAt)

        }
      }).filter((e: any) => !e.isDeleted)
      setParts(result)
    }

  }, [getProductPartsRes])


  const CompanyLogo = (params: CustomCellRendererProps) => (
    <div className="mx-auto h-full w-full rounded-lg overflow-hidden flex justify-center items-center">
      {params.value && <img src={params.value} alt="Product" className="object-contain h-full w-full" />}
    </div>
  );



  async function handleDelete() {
    if (!deleteId) throw new Error('No id provided')
    try {
      await deleteProductPartFn(deleteId);
    } catch (err) {
      console.error(err);
      toast.error('Error delete parts');
    }
  }


  useEffect(() => {
    if (deleteProductPartRes) {
      setParts((prev: any) => {
        return prev.filter((item: any) => item._id.toString() !== deleteId.toString())
      }
      )
    }
  }, [deleteProductPartRes])



  function HandleDeleteComponent() {
    return (
      <AlertDialog open={showHandleDelete} onOpenChange={setShowHandleDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Do you want to delete Product Part?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your account
              and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={deleteProductPartLoading}>
              {
                deleteProductPartLoading ? <LoaderCircle className='animate-spin' /> : 'Delete'
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
          setSelectedProduct(params.data);
          setIsUpdateOpen(true);
        }}
      >
        <Edit2Icon />
      </Button>
      <Button className="cursor-pointer" variant="destructive" size="icon" title="Delete" onClick={() => {
        setShowHandleDelete(true);
        setDeleteId(params.data._id);
      }}>
        <Trash2Icon />
      </Button>
    </div>
  );

  const colDefs = [
    { field: 'ItemName', headerName: 'Product Name', flex: 3, minWidth: 150, sortable: true, filter: true, floatingFilter: true },
    { field: 'Category', flex: 1, minWidth: 100, sortable: true, filter: true, floatingFilter: true },
    { field: 'PartName', flex: 1, minWidth: 150, sortable: true, filter: true, floatingFilter: true },
    { field: 'Image', headerName: 'Part Image', flex: 2, maxWidth: 100, cellRenderer: CompanyLogo },
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

  const AddProductPartdDialog = () => {
    const { fn: createProductPartFn, data: createProductPartRes, loading: createProductPartLoading } = useFetch(ProductPartServiceInstance.createProductPart);

    const formRef = useRef<HTMLFormElement>(null);
    const [products, _, loading] = useProducts();
    const [category, setCategory] = useState('');
    const [selectedProductId, setSelectedProductId] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(formRef.current as HTMLFormElement);
      formData.delete('productId');
      formData.delete('expDate');
      formData.append('productId', selectedProductId);
      formData.append('category', category);


      try {
        await createProductPartFn(formData);
      } catch (error) {
        console.log("Error during creating part:", error);
      }
    };

    useEffect(() => {
      if (createProductPartRes) {
        setParts((prev: any) => [
          ...prev,
          {
            ...createProductPartRes,
            _id: createProductPartRes._id,
            ItemName: createProductPartRes?.productId?.itemName || '',
            Category: createProductPartRes?.category || '',
            PartName: createProductPartRes?.partName || '',
            Image: `${VITE_BASE_URL}/uploads/${createProductPartRes?.images?.[0] || ''}`,
            'Created On': new Date(createProductPartRes?.createdAt || Date.now())
          }
        ]);

        console.log(parts,555)
        toast.success("Part created successfully");
        formRef.current?.reset();
      }
    }, [createProductPartRes]);




    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button >Add Product Part</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <form className="grid gap-4" ref={formRef} onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Add Product Part</DialogTitle>
              <DialogDescription>
                Fill in the brand details below. Click save when you're done.
              </DialogDescription>
            </DialogHeader>

            <div className='grid gap-3'>
              <Label htmlFor="brandName">Product Name</Label>
              <SearchableDropdown
                className="capitalize"
                name="productId"
                options={
                  products.length > 0
                    ? products.map((item: any) => ({ value: item._id, label: item.itemName }))
                    : []
                }
                onChange={(option: any) => setSelectedProductId(option?.value)}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="brandName">Category</Label>
              <Select onValueChange={setCategory}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categoryOptions.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="brandName">Part Name</Label>
              <Input id="brandName" name="partName" placeholder="Screen" required />
            </div>

            <div className="grid gap-3">
            <Label htmlFor="compatibleWith">Compatible With</Label>
            <SearchableDropdown
              name="compatibleWith[]"
              options={
                products.length > 0
                  ? products.map((item: any) => ({ value: item._id, label: item.itemName }))
                  : []
              }
              isMulti
            />
          </div>

            <div className="grid gap-3">
              <Label htmlFor="description">Description</Label>
              <Input id="description" name="description" placeholder="Description..." required />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="images">Part Image</Label>
              <Input
                id="images"
                name="images"
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => {
                  const files = Array.from(e.target.files || []);
                  if (files.length > 5) {
                    toast.error('You can upload a maximum of 5 images.');
                    e.currentTarget.value = '';
                  }
                }}
              />
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">Cancel</Button>
              </DialogClose>
              <Button disabled={createProductPartLoading} type="submit">
                {createProductPartLoading ? <LoaderCircle className="animate-spin" /> : "Save"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    );
  };

  const UpdateProductPartdDialog = ({
    isUpdateOpen,
    setIsUpdateOpen,
    selectedProduct,
    updateProductPartFn,
    updateProductPartLoading,
  }: {
    isUpdateOpen: boolean;
    setIsUpdateOpen: React.Dispatch<React.SetStateAction<boolean>>;
    selectedProduct: any;
    updateProductPartFn: (id: string, data: FormData) => Promise<any>;
    updateProductPartLoading: boolean;
  }) => {
    const formRef = useRef<HTMLFormElement>(null);
    const [products] = useProducts();
    const [category, setCategory] = useState('');
    const [selectedProductId, setSelectedProductId] = useState('');
    const [compatibleProducts, setCompatibleProducts] = useState<string[]>([]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(formRef.current as HTMLFormElement);
      formData.delete('productId');
      formData.delete('expDate');
      formData.set('productId', selectedProductId);
      formData.set('category', category);

      try {
        await updateProductPartFn(selectedProduct._id, formData);
        toast.success("Product part updated successfully");
        setIsUpdateOpen(false);
      } catch (error) {
        console.error("Error updating product part:", error);
        toast.error("Failed to update product part");
      }
    };
    useEffect(() => {
      if (selectedProduct) {
        setSelectedProductId(selectedProduct?.productId?._id);
        setCategory(selectedProduct?.Category);
        setCompatibleProducts(selectedProduct?.compatibleWith || []);
      }
    }, [selectedProduct, updateProductPartRes]);


    return (
      <Dialog open={isUpdateOpen} onOpenChange={setIsUpdateOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <form className="grid gap-4" ref={formRef} onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Update Product Part</DialogTitle>
              <DialogDescription>
                Fill in the part details below. Click save when you're done.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-3">
              <Label htmlFor="productId">Product Name</Label>
              <SearchableDropdown
                className="capitalize"
                name="productId"
                value={
                  products
                    .map((item: any) => ({ value: item._id, label: item.itemName }))
                    .find((opt) => opt.value === selectedProductId) || null
                }
                options={products.map((item: any) => ({
                  value: item._id,
                  label: item.itemName,
                }))}
                onChange={(option: any) => setSelectedProductId(option?.value)}
              />
            </div>

            <div className="grid gap-3">
              <Label>Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categoryOptions.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-3">
              <Label htmlFor="partName">Part Name</Label>
              <Input
                id="partName"
                name="partName"
                defaultValue={selectedProduct?.partName}
                required
              />
            </div>

          {/* Compatible products */}
          <div className="grid gap-3">
            <Label>Compatible Products</Label>
            <SearchableDropdown
              name="compatibleWith[]"
              className="capitalize"
              isMulti
              value={products
                .filter((p:any) => compatibleProducts.includes(p._id))
                .map((p:any) => ({ value: p._id, label: p.itemName }))}
              options={products.map((item: any) => ({
                value: item._id,
                label: item.itemName,
              }))}
              onChange={(selected: any[]) => {
                const ids = selected.map((s: any) => s.value);
                setCompatibleProducts(ids);
              }}
            />
          </div>

            <div className="grid gap-3">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                name="description"
                defaultValue={selectedProduct?.description}
                required
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="images">Part Image</Label>
              <Input
                id="images"
                name="images"
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => {
                  const files = Array.from(e.target.files || []);
                  if (files.length > 5) {
                    toast.error("You can upload a maximum of 5 images.");
                    e.currentTarget.value = '';
                  }
                }}
              />
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button disabled={updateProductPartLoading} type="submit">
                {updateProductPartLoading ? (
                  <LoaderCircle className="animate-spin" />
                ) : (
                  "Save"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    );
  };



  useEffect(() => {
    if (updateProductPartRes) {
      (async () => {
        await getProductPartsFN()
      })()
    }
  }, [updateProductPartRes]);



  return (
    <div className=" w-full p-3">
      <div className="flex justify-between items-center my-6">
        <h1 className="text-2xl font-semibold">Product Part List</h1>
        <AddProductPartdDialog />
        <UpdateProductPartdDialog
          isUpdateOpen={isUpdateOpen}
          setIsUpdateOpen={setIsUpdateOpen}
          selectedProduct={selectedProduct}
          updateProductPartFn={updateProductPartFn}
          updateProductPartLoading={updateProductPartLoading}
        />
        <HandleDeleteComponent />


      </div>
      <AgGridTable cols={colDefs} rows={parts} loading={loading} />
    </div>
  )
}

export default ProductPartList