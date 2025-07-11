import AgGridTable from '@/agGrid/table'
import { Button } from '@/components/ui/button'
import { BookAIcon, BookCopy, PrinterCheck } from 'lucide-react'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import * as XLSX from 'xlsx';
import { useFetch } from '@/hooks/useFetch'
import ContactServiceInstance from "../../../service/contact.service"
import { useReactToPrint } from "react-to-print";
import type { AgGridReact } from 'ag-grid-react'
import type { GridApi } from 'ag-grid-community'

const Contact = () => {
  const [contacts, setContacts] = useState([]);
  const { fn: reportContactsFn, data: reportContactsRes, loading: reportContactsLoading } = useFetch(ContactServiceInstance.getContactReport);
  const [filteredData, setFilteredData] = useState([]);
  const contentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    reportContactsFn();
  }, []);

  useEffect(() => {
    if (reportContactsRes) {
      setContacts(reportContactsRes);
    }
  }, [reportContactsRes]);

  const handleFilteredData = (filteredRows: any[]) => {
    setFilteredData(filteredRows);
    console.log("Filtered data:", filteredRows);
  };

  const donwloadReport = () => {
    const data = filteredData.length > 0 ? filteredData : contacts;
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "contact_report.xlsx");
  }

  const gridRef = useRef<AgGridReact>(null);

  const onBtPrint = useCallback(() => {
    window.print();
  }, []);

  const cols = [
    { headerName: "Contact Name", field: "name", sortable: true, filter: true, flex: 1, floatingFilter: true },
    { headerName: "Email", field: "email", sortable: true, filter: true, flex: 1, floatingFilter: true },
    { headerName: "Contact No", field: "contactNo", sortable: true, filter: true, flex: 1, floatingFilter: true },
    { headerName: "Subject", field: "subject", sortable: true, filter: true, flex: 1 },
    { headerName: "Message", field: "message", sortable: true, filter: true, flex: 1 }
  ];

  // Get the data to display (filtered or all)
  const dataToDisplay = filteredData.length > 0 ? filteredData : contacts;

  return (
    <div className="w-full p-3">
      {/* Screen view */}
      <div className="print:hidden">
        <div className="flex justify-between items-center my-6">
          <h1 className="text-2xl font-semibold">Report</h1>
          <div className="flex items-center space-x-2">
            <Button type="button" onClick={donwloadReport} disabled={!reportContactsRes?.length || reportContactsLoading}>
              <BookCopy className="mr-2" />
              Report
            </Button>
            <Button type="button" disabled={!reportContactsRes?.length || reportContactsLoading} onClick={onBtPrint}>
              <PrinterCheck className="mr-2" />
              Print
            </Button>
          </div>
        </div>

        <AgGridTable
          gridRef={gridRef}
          cols={cols}
          rows={contacts}
          loading={reportContactsLoading}
          onFilter={handleFilteredData}
        />
      </div>


      <div className="hidden print:block" ref={contentRef}>
        <style>{`
          @media print {
            body {
              margin: 0;
              padding: 0;
            }
            .print-table {
              page-break-inside: auto;
              border-collapse: collapse;
              width: 100%;
            }
            .print-table thead {
              display: table-header-group;
              break-inside: avoid;
            }
            .print-table tbody tr {
              page-break-inside: avoid;
              break-inside: avoid;
            }
            .print-table thead tr {
              break-after: auto;
            }
            .print-table th {
              background-color: #f3f4f6 !important;
              -webkit-print-color-adjust: exact;
              color-adjust: exact;
              padding-top: 20px !important;
            }
            .print-table th:first-child {
              padding-top: 30px !important;
            }
            .print-header {
              margin-bottom: 30px;
            }
            @page {
              margin: 0.75in;
              size: A4;
            }
            @page:first {
              margin-top: 0.75in;
            }
            @page:not(:first) {
              margin-top: 1in;
            }
          }
        `}</style>
        
        
        <div className="print-container">
          <div className="text-center mb-6 print-header">
            <h1 className="text-3xl font-bold mb-2">Contact Report</h1>
            <p className="text-gray-500">Generated on {new Date().toLocaleDateString()}</p>
          </div>

          <table className="w-full border-collapse border border-gray-300 print-table">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                  Contact Name
                </th>
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                  Email
                </th>
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                  Contact No.
                </th>
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                  Subject
                </th>
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                  Message
                </th>
              </tr>
            </thead>
            <tbody>
              {dataToDisplay.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="border border-gray-300 px-4 py-3">
                    {item.name || '-'}
                  </td>
                  <td className="border border-gray-300 px-4 py-3">
                    {item.email || '-'}
                  </td>
                  <td className="border border-gray-300 px-4 py-3">
                    {item.contactNo || '-'}
                  </td>
                  <td className="border border-gray-300 px-4 py-3">
                    {item.subject || '-'}
                  </td>
                  <td className="border border-gray-300 px-4 py-3">
                    {item.message || '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {dataToDisplay.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No data available</p>
            </div>
          )}

          <div className="mt-6 text-right text-sm text-gray-600">
            <p>Total Records: {dataToDisplay.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;