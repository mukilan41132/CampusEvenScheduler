import React from "react";
import { DataTable, type DataTablePageEvent } from "primereact/datatable";
import { Column } from "primereact/column";
import "../../styles/Table/table.css";
interface TableColumn {
  field?: string;
  header: string;
  filter?: boolean;
  filterPlaceholder?: string;
  style?: React.CSSProperties;
  body?: (rowData: any, options: any) => React.ReactNode;
}

interface CommonTableProps {
  value: any[];
  columns: TableColumn[];
  loading?: boolean;
  filters?: any;
  onPage?: (event: DataTablePageEvent) => void;
  onFilter?: (e: any) => void;
  globalFilterFields?: string[];
  header?: React.ReactNode;
  totalRecords?: number;
  first?: number;
  rows?: number;
  stripedRows?: boolean;
  responsiveLayout?: "scroll" | "stack";
  size?: "small" | "large" | "normal";
  emptyMessage?: any;
}

const DynamicTable: React.FC<CommonTableProps> = ({
  value = [],
  columns = [],
  loading = false,
  filters,
  onFilter,
  globalFilterFields = [],
  header,
  totalRecords = 0,
  first = 0,
  onPage,
  rows = 10,
  stripedRows = true,
  responsiveLayout = "scroll",
  size = "small",
  emptyMessage,
  ...rest
}) => {
  return (
    <DataTable
      value={value}
      paginator
      rows={rows}
      first={first}
      lazy
      totalRecords={totalRecords}
      loading={loading}
      onPage={onPage}
      stripedRows={stripedRows}
      className="custom-table"
      size={size}
      responsiveLayout={responsiveLayout}
      emptyMessage={emptyMessage}
      header={header}
      rowsPerPageOptions={[5, 10, 25, 50]}
      {...rest}
    >
      {columns.map((col, index) => (
        <Column
          key={index}
          field={col.field}
          header={col.header}
          style={col.style}
          filter={col.filter}
          filterPlaceholder={col.filterPlaceholder}
          body={col.body}
        />
      ))}
    </DataTable>
  );
};

export default DynamicTable;
