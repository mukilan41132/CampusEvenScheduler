import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

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
  onFilter?: (e: any) => void;
  globalFilterFields?: string[];
  header?: React.ReactNode;
  rows?: number;
  stripedRows?: boolean;
  responsiveLayout?: "scroll" | "stack";
  size?: "small" | "large" | "normal";
}

const DynamicTable: React.FC<CommonTableProps> = ({
  value = [],
  columns = [],
  loading = false,
  filters,
  onFilter,
  globalFilterFields = [],
  header,
  rows = 10,
  stripedRows = true,
  responsiveLayout = "scroll",
  size = "small",
  ...rest
}) => {
  return (
    <DataTable
      value={value}
      paginator
      rows={rows}
      loading={loading}
      stripedRows={stripedRows}
      size={size}
      responsiveLayout={responsiveLayout}
      filters={filters}
      globalFilterFields={globalFilterFields}
      header={header}
      onFilter={onFilter}
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
