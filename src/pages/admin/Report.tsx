import AgGridTable from '@/agGrid/table'
import { Button } from '@/components/ui/button'
import { useProducts } from '@/context/productContext'
import { BookAIcon, BookCopy, PrinterCheck } from 'lucide-react'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import * as XLSX from 'xlsx';
import { useFetch } from '@/hooks/useFetch'
import ReportServiceInstance from "../../../service/report.service"
import { useReactToPrint } from "react-to-print";
import type { AgGridReact } from 'ag-grid-react'
import type { GridApi } from 'ag-grid-community'
const Report = () => {
  const [stockItems, setStockItems] = useState([]);
  const { fn: reportProductsFn, data: reportProductsRes, loading: reportProductsLoading } = useFetch(ReportServiceInstance.getStockReport);
  const [filteredData, setFilteredData] = useState([]);
  const contentRef = useRef<HTMLDivElement>(null);
  // const reactToPrintFn = useReactToPrint({contentRef});
  useEffect(() => {
    reportProductsFn();
  }, []);

  useEffect(() => {
    if (reportProductsRes) {
      setStockItems(reportProductsRes);
    }
  }, [reportProductsRes]);

  const handleFilteredData = (filteredRows: any[]) => {
    setFilteredData(filteredRows);
    console.log("Filtered data:", filteredRows);
  };

  const donwloadReport =()=>{
    const data = filteredData.length > 0 ? filteredData : stockItems;
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "report.xlsx");

  }
const gridRef = useRef<AgGridReact>(null);


function setPrinterFriendly(api: GridApi) {
  const eGridDiv = document.querySelector<HTMLElement>("#myGrid")! as any;
  eGridDiv.style.width = "";
  eGridDiv.style.height = "";
  api.setGridOption("domLayout", "print");
}

function setNormal(api: GridApi) {
  const eGridDiv = document.querySelector<HTMLElement>("#myGrid")! as any;
  eGridDiv.style.width = "100%";
  eGridDiv.style.height =  'calc(100vh - 185px)';
  api.setGridOption("domLayout", undefined);
}

const onBtPrint = useCallback(() => {
  if (!gridRef.current) return;
  setPrinterFriendly(gridRef.current.api);
  setTimeout(() => {
    print();
    setNormal(gridRef.current.api);
  }, 2000);
}, []);



  const cols = [
    { headerName: "Product Name", field: "productName", sortable: true, filter: true, flex: 1 , floatingFilter: true},
    { headerName: "Product Part Name", field: "productPartName", sortable: true, filter: true, flex: 1,floatingFilter: true },
    { headerName: "Stock Quantity", field: "stockQty", sortable: true, filter: true, flex: 1 }
  ];

  return (
    <div className="w-full p-3">
      <div className="flex justify-between items-center my-6 print:hidden">
        <h1 className="text-2xl font-semibold">Report</h1>
        <div className="flex items-center space-x-2">
          <Button type="button" onClick={donwloadReport} disabled={!reportProductsRes?.length || reportProductsLoading}>
            <BookCopy className="mr-2" />
            Report
          </Button>
          <Button type="button" disabled={!reportProductsRes?.length || reportProductsLoading} onClick={onBtPrint }>
            <PrinterCheck className="mr-2" />
            Print
          </Button>
        </div>
      </div>


        <AgGridTable
        gridRef={gridRef}
        cols={cols}
        rows={stockItems}
        loading={reportProductsLoading}
        onFilter={handleFilteredData}
      />
  
    </div>
  );
};

export default Report;
