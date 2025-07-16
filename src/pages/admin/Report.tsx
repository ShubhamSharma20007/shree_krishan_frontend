import AgGridTable from '@/agGrid/table';
import { Button } from '@/components/ui/button';
import { useProducts } from '@/context/productContext';
import { BookCopy, PrinterCheck } from 'lucide-react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as XLSX from 'xlsx';
import { useFetch } from '@/hooks/useFetch';
import ReportServiceInstance from "../../../service/report.service";
import { useReactToPrint } from "react-to-print";
import type { AgGridReact } from 'ag-grid-react';

const Report = () => {
  const [stockItems, setStockItems] = useState([]);
  const { fn: reportProductsFn, data: reportProductsRes, loading: reportProductsLoading } = useFetch(ReportServiceInstance.getStockReport);
  const [filteredData, setFilteredData] = useState([]);
  const contentRef = useRef<HTMLDivElement>(null);

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
  };

  const donwloadReport = () => {
    const data = filteredData.length > 0 ? filteredData : stockItems;
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "report.xlsx");
  };

  const gridRef = useRef<AgGridReact>(null);

  const onBtPrint = useCallback(() => {
    window.print();
  }, []);

  const cols = [
    {
      headerName: "Product Name",
      field: "productName",
      sortable: true,
      filter: true,
      flex: 1,
      floatingFilter: true,
    },
    {
      headerName: "Product Part Name",
      field: "productPartName",
      sortable: true,
      filter: true,
      flex: 2,
      floatingFilter: true,
      cellRenderer: (params) => {
        const isBattery = params.data?.productPartName?.toLowerCase() === 'battery';
        const expDate = params.data?.expDate;
    
        return (
          <div className="flex items-center space-x-2 leading-snug h-full">
            <span className="text-gray-800">{params.value || "-"}</span>
            {isBattery && expDate && (
              <sup className="text-[10px] md:text-xs text-white bg-red-500 rounded-full px-2 py-[2px] leading-none">
                Exp Date: {new Date(expDate).toLocaleDateString()}
              </sup>
            )}
          </div>
        );
      }
    }
    ,
    
    {
      headerName: "Stock Quantity",
      field: "stockQty",
      sortable: true,
      filter: true,
      flex: 1,
    },
  ];
  
  

  const dataToDisplay = filteredData.length > 0 ? filteredData : stockItems;

  return (
    <div className="w-full p-3">
      {/* Screen View */}
      <div className="print:hidden">
        <div className="flex justify-between items-center my-6">
          <h1 className="text-2xl font-semibold">Report</h1>
          <div className="flex items-center space-x-2">
            <Button type="button" onClick={donwloadReport} disabled={!reportProductsRes?.length || reportProductsLoading}>
              <BookCopy className="mr-2" />
              Report
            </Button>
            <Button type="button" disabled={!reportProductsRes?.length || reportProductsLoading} onClick={onBtPrint}>
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
{/* Print View */}
<div className="hidden print:block" ref={contentRef}>
<style>{`
  @media print {
    html, body {
      margin: 0 !important;
      padding: 0 !important;
    }

    .print-container {
      padding: 0 !important;
      margin: 0 !important;
    }

    .print-header {
      margin-bottom: 10px !important;
    }

    .print-table {
      width: 100%;
      border-collapse: collapse;
      page-break-inside: auto;
    }

    .print-table th,
    .print-table td {
      border: 1px solid #d1d5db;
      padding: 6px 8px;
      vertical-align: top;
      text-align: left;
    }

    .print-table th {
      background-color: #f3f4f6 !important;
      -webkit-print-color-adjust: exact;
      color-adjust: exact;
    }

    @page {
      margin: 0.5in;
      size: A4 portrait;
    }
  }
`}</style>


  <div className="print-container">
    {/* Header */}
    <div className="text-center mb-6 print-header">
      <h1 className="text-3xl font-bold mb-2">Stock Report</h1>
      <p className="text-gray-500 text-sm">Generated on {new Date().toLocaleDateString()}</p>
    </div>

    {/* Table */}
    <table className="print-table">
      <thead>
        <tr>
          <th>Product Name</th>
          <th>Product Part Name</th>
          <th>Stock Quantity</th>
        </tr>
      </thead>
      <tbody>
        {dataToDisplay.map((item, index) => {
          const isBattery = item.productPartName?.toLowerCase() === 'battery';
          return (
            <tr key={index}>
              <td>{item.productName || '-'}</td>
              <td>
                <div className="flex flex-col">
                  <span>{item.productPartName || '-'}</span>
                  {isBattery && item.expDate && (
                    <span className="text-[11px] text-gray-600 mt-1">
                      Exp: {new Date(item.expDate).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </td>
              <td>{item.stockQty || '0'}</td>
            </tr>
          );
        })}
      </tbody>
    </table>

    {/* No data fallback */}
    {dataToDisplay.length === 0 && (
      <div className="text-center py-8">
        <p className="text-gray-500">No data available</p>
      </div>
    )}

    {/* Footer */}
    <div className="mt-6 text-right text-sm text-gray-600">
      <p>Total Records: {dataToDisplay.length}</p>
    </div>
  </div>
</div>

    </div>
  );
};

export default Report;
