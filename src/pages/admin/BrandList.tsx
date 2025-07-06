import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Edit2Icon, LoaderCircle, Trash2Icon } from 'lucide-react';
import { useFetch } from '@/hooks/useFetch';
import AgGridTable from '@/agGrid/table';
import toast from 'react-hot-toast';
import { VITE_BASE_URL } from '@/helper/instance';
import BrandServiceInstance from '../../../service/brand.service';
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
import type { CustomCellRendererProps } from 'ag-grid-react';

const AddBrandDialog = ({ onSuccess }: { onSuccess: () => void }) => {
  const { fn: createBrandFn, data: createBrandRes, loading } = useFetch(BrandServiceInstance.createBrand);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(formRef.current as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    try {
      await createBrandFn(data);
    } catch (error) {
      console.log("Error during creating brand:", error);
    }
  };

  useEffect(() => {
    if (createBrandRes) {
      toast.success("Brand created successfully");
      formRef.current?.reset();
      onSuccess();
    }
  }, [createBrandRes]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button >Add Brand</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form className="grid gap-4" ref={formRef} onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add Brand</DialogTitle>
            <DialogDescription>
              Fill in the brand details below. Click save when you're done.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-3">
            <Label htmlFor="brandName">Brand Name</Label>
            <Input id="brandName" name="brandName" placeholder="Apple" required />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="image">Brand Logo</Label>
            <Input id="image" name="image" type="file" accept="image/*" required />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>
            <Button disabled={loading} type="submit">
              {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};




const UpdateBrandDialog = ({
  open,
  onOpenChange,
  brand,
  onSuccess,
}: {
  open: boolean;
  onOpenChange: (state: boolean) => void;
  brand: any;
  onSuccess: () => void;
}) => {
  const formRef = useRef<HTMLFormElement>(null);
  const { fn: updateBrandFn, data: updateRes, loading } = useFetch(BrandServiceInstance.updateBrand);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(formRef.current!);
    const payload = Object.fromEntries(formData.entries());
    try {
      await updateBrandFn(brand._id,payload );
    } catch (err) {
      console.error('Update error:', err);
    }
  };

  useEffect(() => {
    if (updateRes) {
      toast.success('Brand updated successfully!');
      onSuccess();
      onOpenChange(false);
    }
  }, [updateRes]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form className="grid gap-4" ref={formRef} onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Update Brand</DialogTitle>
            <DialogDescription>Modify brand details below.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-3">
            <Label htmlFor="brandName">Brand Name</Label>
            <Input id="brandName" name="brandName" defaultValue={brand.Name} required />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="image">Brand Logo</Label>
            <Input id="image" name="image" type="file" accept="image/*" />
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


// Cell renderer: brand logo
const CompanyLogo = (params: CustomCellRendererProps) => (
  <div className="mx-auto h-full w-full rounded-lg overflow-hidden flex justify-center items-center ">
    {params.value && (
      <img
        src={params.value}
        alt="Brand Logo"
        className="object-contain h-full w-full m-auto"
      />
    )}
  </div>
);



// Main component
const BrandList = () => {
  const [brands, setBrands] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<any>(null);
const [isUpdateOpen, setIsUpdateOpen] = useState(false);
const [showHandleDelete,setShowHandleDelete] = useState(false)
const [deleteId,setDeleteId] = useState('')
const { fn:getBrandsFn, data: getBrandsRes, loading:getBrandsLoading } = useFetch(BrandServiceInstance.getAllBrand);
const { fn:deleteBrandsFn, data: deleteBrandsRes, loading:deleteBrandsLoading } = useFetch(BrandServiceInstance.deleteBrand);
  const fetchBrands = async () => {
    setLoading(true);
    try {
    await getBrandsFn()
    } catch (error) {
      console.error("Error fetching brands:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  console.log(getBrandsRes);
  



  
  async function handleDelete(){
       try {
        await deleteBrandsFn(deleteId);
      } catch (err) {
        console.error(err);
        toast.error('Error delete product');
      }
  }


   function HandleDeleteComponent(){
    return(
    <AlertDialog open={showHandleDelete} onOpenChange={setShowHandleDelete}>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Do you want to delete this Brand?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={handleDelete} disabled={deleteBrandsLoading}>
        {
          deleteBrandsLoading ? <LoaderCircle className='animate-spin' /> : 'Delete'
        }
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
    )

  }

  
  useEffect(()=>{
    if(deleteBrandsRes){
      toast.success('Product deleted successfully');
      fetchBrands()
    }
  },[deleteBrandsRes])




  // Cell renderer: actions
const ActionButtons = (params: CustomCellRendererProps) => (
  <div className="flex justify-center items-center h-full space-x-3.5">
    <Button
      className="cursor-pointer"
      variant="secondary"
      size="icon"
      title="Edit"
      onClick={() => {
        setSelectedBrand(params.data);
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
  useEffect(()=>{
    if(getBrandsRes){
     const result = getBrandsRes.map((brand: any) => ({
      ...brand,
        Name: brand.brandName,
        Image: brand.image,
        'Created On': new Date(brand.createdAt),
      })).filter((b:any)=> !b.isDeleted)
      console.log(result)
      setBrands(result);
    }
  },[getBrandsRes])

  const colDefs = [
     { field: '_id', flex: 1, maxWidth: 100 ,hide:true},
    { field: 'Name', headerName: 'Brand Name', flex: 3, minWidth: 150, sortable: true, filter: true, floatingFilter: true },
    { field: 'Image', flex: 1, maxWidth: 100, cellRenderer: CompanyLogo },
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
    <div className="h-screen w-full p-3">
      {selectedBrand && (
  <UpdateBrandDialog
    open={isUpdateOpen}
    onOpenChange={setIsUpdateOpen}
    brand={selectedBrand}
    onSuccess={fetchBrands}
  />
)}
      <div className="flex justify-between items-center my-6">
        <h1 className="text-2xl font-semibold">Brand List</h1>
        <AddBrandDialog onSuccess={fetchBrands} />
        <HandleDeleteComponent/>
      </div>
      <AgGridTable cols={colDefs} rows={brands} loading={loading} />
    </div>
  );
};

export default BrandList;
