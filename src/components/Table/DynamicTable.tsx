import React from "react";
import "../../styles/Table/table.css";

interface TableColumn {
  field?: string;
  header: string;
  filter?: boolean;
  filterPlaceholder?: string;
  style?: React.CSSProperties;
  body?: (rowData: any, options: any) => React.ReactNode;
}

interface PageEvent {
  first: number;
  rows: number;
  page: number;
}

interface CommonTableProps {
  value: any[];
  columns: TableColumn[];
  loading?: boolean;
  filters?: any;
  onPage?: (event: PageEvent) => void;
  onFilter?: (e: { field: string; value: string }) => void;
  globalFilterFields?: string[];
  header?: React.ReactNode;
  totalRecords?: number;
  first?: number;
  rows?: number;
  stripedRows?: boolean;
  size?: "small" | "large" | "normal";
  emptyMessage?: React.ReactNode;
}

const DynamicTable: React.FC<CommonTableProps> = ({
  value = [],
  columns = [],
  loading = false,
  // filters = {},
  // onFilter,
  header,
  totalRecords = 0,
  first = 0,
  onPage,
  rows = 10,
  stripedRows = true,
  size = "small",
  emptyMessage = "No records found",
}) => {
  const currentPage = Math.floor(first / rows);
  const totalPages = Math.max(Math.ceil(totalRecords / rows), 1);
  const rowsPerPageOptions = [5, 10, 25, 50];

  const goToPage = (page: number) => {
    if (page < 0 || page >= totalPages) return;
    onPage?.({ first: page * rows, rows, page });
  };

  const handleRowsChange = (newRows: number) => {
    onPage?.({ first: 0, rows: newRows, page: 0 });
  };

  // const handleFilterChange = (field: string, val: string) => {
  //   onFilter?.({ field, value: val });
  // };

  return (
    <div className={`custom-table-wrapper custom-table--${size}`}>
      {header && <div className="custom-table-header">{header}</div>}

      <div className="custom-table-scroll">
        <table className="custom-table">
          <thead>
            <tr>
              {columns.map((col, index) => (
                <th key={index} style={col.style}>
                  <div className="th-content">{col.header}</div>
                  {/* {col.filter && (
                    <input
                      type="text"
                      className="th-filter-input"
                      placeholder={col.filterPlaceholder || `Search ${col.header}`}
                      value={col.field ? filters[col.field] || "" : ""}
                      onChange={(e) =>
                        col.field && handleFilterChange(col.field, e.target.value)
                      }
                    />
                  )} */}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columns.length} className="custom-table-status">
                  Loading...
                </td>
              </tr>
            ) : value.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="custom-table-status">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              value.map((rowData, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={stripedRows && rowIndex % 2 === 1 ? "striped" : ""}
                >
                  {columns.map((col, colIndex) => (
                    <td key={colIndex} style={col.style}>
                      {col.body
                        ? col.body(rowData, { rowIndex, field: col.field })
                        : col.field
                          ? rowData[col.field]
                          : null}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="custom-table-paginator">
        <div className="rows-per-page">
          <span>Rows per page:</span>
          <select
            value={rows}
            onChange={(e) => handleRowsChange(Number(e.target.value))}
          >
            {rowsPerPageOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div className="page-controls">
          <button
            type="button"
            disabled={currentPage === 0}
            onClick={() => goToPage(currentPage - 1)}
          >
            Prev
          </button>
          <span>
            Page {currentPage + 1} of {totalPages}
          </span>
          <button
            type="button"
            disabled={currentPage >= totalPages - 1}
            onClick={() => goToPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default DynamicTable;