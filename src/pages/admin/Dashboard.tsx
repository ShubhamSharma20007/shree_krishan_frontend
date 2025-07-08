import { Button } from '@/components/ui/button';
import AgGridTable from '../../agGrid/table';

import type { CustomCellRendererProps } from 'ag-grid-react';
import { Edit2Icon, LoaderCircle, Trash2Icon } from 'lucide-react';



const Dashboard = () => {

const rowData = [
  {
    Name: 'Screen',
    Brand: 'Samsung',
    Qty: 45,
    Image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTBkTZxk5uOTFlZJrRuthdAemmKvMpqW1vNdgxwgOUm8Skny9vgzNHA2IcnIDD2HDPkpWVdtT4_pe3QGiG5R2VHmYNCsW6QxaTf5jYsAXaTASvaj5_ohP0a',
    Description: 'Replacement front OLED display panel',
    'Created On': '2025-06-15',
  },
  {
    Name: 'Charger Pin',
    Brand: 'Apple',
    Qty: 60,
    Image: 'https://5.imimg.com/data5/VM/QC/JJ/SELLER-8729138/android-to-apple-iphone-charging-connector.jpg',
    Description: 'Lightning charging connector assembly',
    'Created On': '2025-05-30',
  },
  {
    Name: 'Power Button',
    Brand: 'Google',
    Qty: 75,
    Image: 'https://m.media-amazon.com/images/I/512PubEo+5L.jpg',
    Description: 'Side-mounted power key tactile switch',
    'Created On': '2025-06-01',
  },
  {
    Name: 'Battery',
    Brand: 'OnePlus',
    Qty: 30,
    Image: 'https://www.zeposhop.com/images/detailed/46/oneplus-battery-blp945-for-1-1684750964_tkgv-0y.jpg',
    Description: 'Rechargeable Li‑ion battery pack',
    'Created On': '2025-05-20',
  },
];

 
const CompanyLogo =  (params: CustomCellRendererProps) => (
    <span className=" block mx-auto h-20 w-20">
        {params.value && (
            <img
                alt={`${params.value} Flag`}
                  src={`${params.value}`}
                className=" object-contain"
            />
        )}
    </span>
);

const buttonComponent = () =>(
  <div className='flex justify-center items-center h-full space-x-3.5'>
    <Button variant={'secondary'} size={'icon'} title='Edit'  className='cursor-pointer opacity-80'>
    <Edit2Icon/>
  </Button>
    <Button variant={'destructive'} size={'icon'} title='Edit'  className='cursor-pointer opacity-60'>
    <Trash2Icon/>
  </Button>
  </div>
)

const colDefs = [
  { field: 'Name', headerName: 'Product Part Name', flex: 3, minWidth: 150, sortable: true, filter: true, floatingFilter: true },
  { field: 'Qty', headerName: 'Quantity', flex: 1, minWidth: 100, sortable: true, filter: true, floatingFilter: true },
  { field: 'Brand', flex: 1, minWidth: 100, sortable: true, filter: true, floatingFilter: true },
  {
    field: 'Image',
    flex: 1,
    minWidth: 100,
    cellRenderer: CompanyLogo,
  },
  { field: 'Description', flex: 2, minWidth: 150, sortable: true, filter: true },
  { field: 'Created On', flex: 1, minWidth: 120, sortable: true, filter: 'agDateColumnFilter', floatingFilter: true },
  {
    field: 'Action',
    flex: 1,
    minWidth: 100,
    cellRenderer: buttonComponent,
  }
];


  return (
    <div className="h-screen w-full p-3">
    
      <AgGridTable cols={colDefs} rows={rowData} />
    </div>
  );
};

export default Dashboard;
