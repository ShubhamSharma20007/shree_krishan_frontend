// AgGridTable.tsx
import React from 'react';
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

  return (
    
    <div className="ag-theme-alpine grid-wrapper capitalize" style={{ height: '100%', width: '100%' }}>
      <AgGridReact
      colResizeDefault='shift'
        loading={loading}
        rowData={rows}
        columnDefs={cols}
         rowHeight={60}  
         domLayout='autoHeight'

      />
    </div>
  );
};

export default AgGridTable;
