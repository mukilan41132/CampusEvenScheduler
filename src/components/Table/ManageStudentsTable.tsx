import React, { useState } from "react";
import { DataTable, type DataTableFilterMeta } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { FilterMatchMode, FilterOperator } from "primereact/api";


interface Student {
  id: number;
  name: string;
  email: string;
  gender: string;
  age: string;
  department: string;
  rollNo: string;
}


const defaultFilters: DataTableFilterMeta = {
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  name: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
  },
  email: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
  },
  department: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
  },
};

interface ManageStudentsTableProps {
  students: Student[];
  loading?: boolean;
}

const ManageStudentsTable: React.FC<ManageStudentsTableProps> = ({
  students,
  loading = false,
}) => {
  const [filters, setFilters] = useState<DataTableFilterMeta>(defaultFilters);
  const [globalFilterValue, setGlobalFilterValue] = useState<string>("");

  const clearFilter = () => {
    setFilters(defaultFilters);
    setGlobalFilterValue("");
  };

  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let _filters = { ...filters };

    // @ts-ignore
    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-content-between">
        <Button
          type="button"
          icon="pi pi-filter-slash"
          label="Clear"
          outlined
          onClick={clearFilter}
        />
        <IconField iconPosition="left">
          <InputIcon className="pi pi-search" />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Keyword Search"
          />
        </IconField>
      </div>
    );
  };

  const header = renderHeader();

  return (
    <div className="card">
      <DataTable
        value={students}
        paginator
        showGridlines
        rows={10}
        loading={loading}
        dataKey="id"
        filters={filters}
        globalFilterFields={["name", "email", "department", "gender", "rollNo"]}
        header={header}
        emptyMessage="No students found."
        onFilter={(e) => setFilters(e.filters)}
      >
        <Column
          field="name"
          header="Name"
          filter
          filterPlaceholder="Search by name"
          style={{ minWidth: "12rem" }}
        />
        <Column
          field="email"
          header="Email"
          filter
          filterPlaceholder="Search by email"
          style={{ minWidth: "14rem" }}
        />
        <Column field="gender" header="Gender" style={{ minWidth: "8rem" }} />
        <Column field="age" header="Age" style={{ minWidth: "6rem" }} />
        <Column
          field="department"
          header="Department"
          filter
          filterPlaceholder="Search by department"
          style={{ minWidth: "12rem" }}
        />
        <Column field="rollNo" header="Roll No" style={{ minWidth: "10rem" }} />
      </DataTable>
    </div>
  );
};

export default ManageStudentsTable;
