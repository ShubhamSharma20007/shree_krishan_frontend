import React, { useMemo, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';

// Register modules (required by AG Grid)
ModuleRegistry.registerModules([AllCommunityModule]);

interface AgGridTableProps {
  cols: any[];
  rows: any[];
  loading?: boolean;
  gridRef?: any; 
  onFilter?: (filteredRows: any[]) => void;
}

const AgGridTable: React.FC<AgGridTableProps> = ({ cols, rows, loading, gridRef, onFilter }) => {
  const paginationPageSizeSelector = useMemo(() => [10, 20, 50, 100], []);

  const handleFilterChanged = useCallback(() => {
    if (gridRef?.current && onFilter) {
      const filteredData: any[] = [];
      const api = gridRef.current.api;
      const rowCount = api.getDisplayedRowCount();
      for (let i = 0; i < rowCount; i++) {
        const row = api.getDisplayedRowAtIndex(i);
        if (row) filteredData.push(row.data);
      }
      onFilter(filteredData);
    }
  }, [onFilter, gridRef]);

  return (
    <div id="myGrid" className="ag-theme-alpine grid-wrapper capitalize " style={{ width: '100%',height: 'calc(100vh - 185px)' }}>
      <AgGridReact
      
        ref={gridRef}
        colResizeDefault="shift"
        loading={loading}
        rowData={rows}
        columnDefs={cols}
        rowHeight={50}
        pagination
        paginationPageSizeSelector={paginationPageSizeSelector}
        paginationPageSize={10}
        onFilterChanged={handleFilterChanged}
      />
    </div>
  );
};

export default AgGridTable;
