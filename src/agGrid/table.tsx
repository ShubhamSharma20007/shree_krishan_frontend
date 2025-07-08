// AgGridTable.tsx
import React, { useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';

// Register grid modules globally (once)
ModuleRegistry.registerModules([AllCommunityModule]);

interface AgGridTableProps {
  cols: any[];
  rows: any[];
  loading?:boolean
}

const AgGridTable: React.FC<AgGridTableProps> = ({ cols, rows,loading }) => {

  const paginationPageSizeSelector = useMemo(() => {
    return [10, 20, 50, 100];
  }, []);

  return (
    
    <div className="ag-theme-alpine grid-wrapper capitalize h-[calc(100vh-185px)]" style={{ width: '100%' }}>
      <AgGridReact
      colResizeDefault='shift'
        loading={loading}
        rowData={rows}
        columnDefs={cols}
         rowHeight={50}  
        //  domLayout='autoHeight'
         pagination
         paginationPageSizeSelector={paginationPageSizeSelector}
         paginationPageSize={10}
        //  noRowsOverlayComponent='No data to display'
      />
    </div>
  );
};

export default AgGridTable;
