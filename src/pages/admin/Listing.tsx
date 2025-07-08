import { Button } from '@/components/ui/button';
import type { CustomCellRendererProps } from 'ag-grid-react';
import { Edit2Icon, LoaderCircle, Trash2Icon } from 'lucide-react';
import { useProducts } from '@/context/productContext';
import AgGridTable from '@/agGrid/table';
import { useEffect, useRef, useState } from 'react';
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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { VITE_BASE_URL } from '@/helper/instance';
import toast from 'react-hot-toast';
import BrandServiceInstance from './../../../service/brand.service';
import ProductServiceInstance from './../../../service/product.service';
import { useFetch } from '@/hooks/useFetch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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





const UpdateProductDialog = ({
  open,
  onOpenChange,
  product,
  onSuccess,
}: {
  open: boolean;
  onOpenChange: (state: boolean) => void;
  product: any;
  onSuccess: () => void;
}) => {

  const formRef = useRef<HTMLFormElement>(null);
  const [brand, setBrand] = useState(product.brandId || '');
  const { fn: getBrands, data: brandRes } = useFetch(BrandServiceInstance.getAllBrand);
  const { fn: updateProductFn, data: updateRes, loading } = useFetch(ProductServiceInstance.updateProduct);
  const [products, setProducts] = useProducts();
  useEffect(() => {
    getBrands();
  }, []);

useEffect(() => {
  if (brandRes && product.Brand) {
    const matchedBrand = brandRes.find(
      (b: any) => b.brandName.toLowerCase() === product.Brand.toLowerCase()
    );
    if (matchedBrand) {
      setBrand(matchedBrand._id);
    }
  }
}, [brandRes, product.Brand]);


console.log(updateRes)
  useEffect(() => {
    if (updateRes) {
      setProducts((prev: any[]) =>
        prev.map((p) => (p._id === updateRes._id ? {
        ...p,
        Name: updateRes.itemName,
        Brand: updateRes.brand?.brandName || '',
        Image: `${VITE_BASE_URL}/uploads/${updateRes.images?.[0] || ''}`,
        Description: updateRes.description,
        Model: updateRes.model,
        'Created On': new Date(updateRes.updatedAt || updateRes.createdAt),
        _id: updateRes._id,
      } : p))
    );

      toast.success('Product updated successfully');
      onOpenChange(false);
      onSuccess();
    }
  }, [updateRes]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(formRef.current!);
    formData.append('brand', brand);

    try {
      await updateProductFn(product._id,formData);
    } catch (error) {
      console.error(error);
      toast.error('Failed to update product');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form ref={formRef} onSubmit={handleSubmit} className="grid gap-4">
          <DialogHeader>
            <DialogTitle>Update Product</DialogTitle>
            <DialogDescription>
              Modify the product details below. Click save when you're done.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-3">
            <Label htmlFor="itemName">Product Name</Label>
            <Input
              id="itemName"
              name="itemName"
              defaultValue={product.Name}
              required
            />
          </div>

          <div className="grid gap-3">
            <Label>Brand</Label>
            <Select onValueChange={setBrand} value={brand} defaultValue={product.Brand.toLowerCase()}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a brand" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {brandRes?.map((item: any) => (
                    <SelectItem key={item._id} value={item._id} >
                      {item.brandName}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-3">
            <Label htmlFor="images">Product Images</Label>
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
            <p className="text-xs text-muted-foreground">
              You can upload up to 5 images.
            </p>
          </div>

          <div className="grid gap-3">
            <Label htmlFor="model">Model</Label>
            <Input id="model" name="model" defaultValue={product.Model} />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              name="description"
              defaultValue={product.Description}
            />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={loading}>
              {loading ? <LoaderCircle className="animate-spin" /> : 'Update'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const Listing = () => {
  const [products, setProducts, loading] = useProducts();
  const { fn: createProductFN, data: productRes,loading:productCreateLoading } = useFetch(ProductServiceInstance.createProduct);
  const { fn: deleteProductFN, data: deleteRes,loading:productDeleteLoading } = useFetch(ProductServiceInstance.deleteProduct);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
const [isUpdateOpen, setIsUpdateOpen] = useState(false);
const [showHandleDelete,setShowHandleDelete] = useState(false)
const [deleteId,setDeleteId] = useState('')
  useEffect(() => {
    if (productRes) {

      setProducts((prev) => [
        {
          Name: productRes.itemName,
          Model:productRes?.model,
          Brand: productRes.brand?.brandName || '',
          Image: `${VITE_BASE_URL}/uploads/${productRes.images?.[0] || ''}`,
          Description: productRes.description,
          'Created On': new Date(productRes.createdAt),
        },
        ...prev,
      ]);
      toast.success('Product added successfully');
    }
  }, [productRes, setProducts]);

  

  const AddProductDialog = () => {
    const { fn: getBrands, data: brandRes } = useFetch(BrandServiceInstance.getAllBrand);
    const [brand, setBrand] = useState('');
    const formRef = useRef<HTMLFormElement>(null);
    useEffect(()=>{
      (async()=>{
        await getBrands();
      })()
    },[])


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      formData.append('brand', brand);
      const data = Object.fromEntries(formData.entries());
      if((data.images as any).size === 0) return toast.error('Image is required');

      try {
        await createProductFN(data);
        formRef.current?.reset();
        setBrand('');
      } catch (err) {
        console.error(err);
        toast.error('Error adding product');
      }
    };

    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="default">Add Product</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <form ref={formRef} onSubmit={handleSubmit} className="grid gap-4">
            <DialogHeader>
              <DialogTitle>Add Product</DialogTitle>
              <DialogDescription>
                Fill in the product details below. Click save when you're done.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-3">
              <Label htmlFor="itemName">Product Name</Label>
              <Input id="itemName" name="itemName" placeholder="Samsung Galaxy M33" required />
            </div>

            <div className="grid gap-3">
              <Label>Brand</Label>
              <Select onValueChange={setBrand} value={brand}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a brand" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {brandRes?.map((item: any) => (
                      <SelectItem key={item._id} value={item._id}>
                        {item.brandName}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-3">
              <Label htmlFor="images">Product Images</Label>
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
              <p className="text-xs text-muted-foreground">
                You can upload up to 5 images.
              </p>
            </div>

            <div className="grid gap-3">
              <Label htmlFor="model">Model</Label>
              <Input id="model" name="model" placeholder="SM-M336BU" />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                name="description"
                placeholder="Samsung's mid‑range power performer with large battery"
              />
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={productCreateLoading}>
                {productCreateLoading ? <LoaderCircle className="animate-spin" /> : 'Save'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    );
  };

  const CompanyLogo = (params: CustomCellRendererProps) => (
    <div className="mx-auto h-full w-full rounded-lg overflow-hidden flex justify-center items-center">
      {params.value && <img src={params.value} alt="Product" className="object-contain h-full w-full" />}
    </div>
  );


  async function handleDelete(){
       try {
        await deleteProductFN(deleteId);
      } catch (err) {
        console.error(err);
        toast.error('Error delete product');
      }
  }


  useEffect(()=>{
    if(deleteRes){
      setProducts((prev:any)=>{
        return prev.filter((item:any)=>item._id.toString() !== deleteId.toString())
      }
      )
    }
  },[deleteRes])



  function HandleDeleteComponent(){
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
      <AlertDialogAction onClick={handleDelete} disabled={productDeleteLoading}>
        {
          productDeleteLoading ? <LoaderCircle className='animate-spin' /> : 'Delete'
        }
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
    )

  }


  const ActionButtons = (params:CustomCellRendererProps) => (
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
    <Button className="cursor-pointer" variant="destructive" size="icon" title="Delete" onClick={()=>{
      setShowHandleDelete(true);
      setDeleteId(params.data._id);
    }}>
      <Trash2Icon />
    </Button>
  </div>
  );

  const colDefs = [
    { field: 'Name', headerName: 'Product Name', flex: 3, minWidth: 150, sortable: true, filter: true, floatingFilter: true },
    { field: 'Brand', flex: 1, minWidth: 100, sortable: true, filter: true, floatingFilter: true },
    { field: 'Model',headerName:'Model', flex: 1, minWidth: 100, sortable: true, filter: true, floatingFilter: true },

    { field: 'Image', flex: 1, maxWidth: 100, cellRenderer: CompanyLogo },
    { field: 'Description', flex: 2, minWidth: 150, sortable: true, filter: true },
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
    <div className=" w-full p-3">
{selectedProduct && (
  <UpdateProductDialog
    open={isUpdateOpen}
    onOpenChange={setIsUpdateOpen}
    product={selectedProduct}
    onSuccess={() => {
      setIsUpdateOpen(false);
    }}
    
  />
)}
      <div className="flex justify-between items-center my-6">
        <h1 className="text-2xl font-semibold">Product List</h1>
        <AddProductDialog />
        <HandleDeleteComponent/>
      </div>
      <AgGridTable cols={colDefs} rows={products} loading={loading} />
    </div>
  );
};

export default Listing;
