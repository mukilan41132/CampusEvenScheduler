import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import HttpAxios from "../../utils/axiosInstance";
import CustomButton from "../../components/Button/CustomButton";
 
import FilterListIcon from "@mui/icons-material/FilterList";
import DynamicTable from "../../components/Table/DynamicTable";
import ActionIcon from "../../components/Button/ActionIconBtn";
import ActionColumn from "../../components/ActionBody/actionBodyTemplate";
import { registerStudent, updateByid } from "../../slices/create-student/thunk";
import type { AppDispatch } from "../../store/store";
import { useDispatch } from "react-redux";
import NoData from "../../components/NORecordFound/NoData";
import SearchFilter from "../../components/SearchFilter/SearchFilter";
import { useDebounce } from "../../hooks/useDebounce";
import CreateStudent, { initialStudentState, type Student } from "./create-student";

const ManageStudent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [students, setStudents] = useState([]);
  const [filters, setFilters] = useState(null);
  const [first, setFirst] = useState<number>(0);
  const [rows, setRows] = useState<number>(10);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [toggle, setToggle] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const debounceSearch = useDebounce(search);
  const [studentState, setStudentState] =
    useState<Student>(initialStudentState);

  const fetchStudents = async (page: number, limit: number) => {
    setLoading(true);

    try {
      const res = await HttpAxios.axios().get(
        `Student/getAll?page=${page}&limit=${limit}&search=${debounceSearch}`,
      );

      setStudents(res?.data?.content || []);
      setTotalRecords(res?.data?.totalElements);
    } catch (error) {
      setStudents([]);
      console.error("Failed to fetch students:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents(0, rows);
  }, [debounceSearch]);

  const onPage = (event: any) => {
    const page = event.page;
    const limit = event.rows;

    setFirst(event.first);
    setRows(limit);

    fetchStudents(page, limit);
  };

  const actionBodyTemplate = (rowData: Student) => (
    <ActionColumn
      rowData={rowData}
      actions={[
        {
          title: "Edit",
          icon: <EditIcon />,
          color: "warning",
          onClick: handleEdit,
        },
        {
          title: "Delete",
          icon: <DeleteIcon />,
          color: "error",
          onClick: (data) => handleDelete(data.id),
        },
      ]}
    />
  );
  const columns = [
    {
      header: "S.No",
      body: (_: any, options: { rowIndex: number }) => options.rowIndex + 1,
      style: { width: "6rem" },
    },
    {
      field: "firstName",
      header: "Name",
      filter: true,
      filterPlaceholder: "Search by Name",
    },
    {
      field: "gender",
      header: "Gender",
    },
    {
      field: "age",
      header: "Age",
    },
    {
      field: "department",
      header: "Department",
      filter: true,
      filterPlaceholder: "Search by Department",
    },
    {
      field: "rollNo",
      header: "Roll No",
    },
    {
      header: "Actions",
      body: (row: any) => actionBodyTemplate(row),
      style: { width: "8rem" },
    },
  ];
  const handleEdit = (student: Student) => {
    setVisible(true);
    setStudentState(student);
  };

  const handleDelete = async (id: string) => {
    try {
      await HttpAxios.axios().delete(`/Student/deleteStudentById/${id}`);
      fetchStudents(0, rows);
    } catch (err) {
      console.error("Error deleting student:", err);
    }
  };

  const registerOrUpdateById = async () => {
    try {
      if (studentState?.id) {
        await dispatch(updateByid(studentState)).unwrap();
      } else {
        await dispatch(registerStudent(studentState)).unwrap();
      }

      fetchStudents(0, rows);
    } catch (error) {
      console.error("Operation failed", error);
    }
  };

  const clearState = () => {
    setStudentState(initialStudentState);
    setVisible(false);
  };
  const toggleField = () => {
    setToggle((prev) => !prev);
    setSearch("");
  };
  return (
    <div className="card">
      <div className="header-btn">
        {toggle && (
          <SearchFilter
            labelObj={{
              label1: "Search ..",
            }}
            value1={search}
            onChange1={setSearch}
          />
        )}

        <div>
          <ActionIcon
            title="Filter"
            icon={<FilterListIcon />}
            color="error"
            sx={{ marginRight: "15px" }}
            onClick={toggleField}
          />

          <CustomButton
            text={"Create Students"}
            onClick={() => {
              setVisible(true);
            }}
          />
        </div>
      </div>
      <DynamicTable
        value={students}
        loading={loading}
        emptyMessage={<NoData message="No Data Found" />}
        columns={columns}
        first={first}
        rows={rows}
        totalRecords={totalRecords}
        onPage={onPage}
        filters={filters}
        onFilter={(e: any) => setFilters(e.filters)}
        globalFilterFields={["firstName", "rollNo", "department", "gender"]}
      />

      <CreateStudent
        visible={visible}
        studentState={studentState}
        onSubmit={registerOrUpdateById}
        clearState={clearState}
        setStudentState={setStudentState}
      />
    </div>
  );
};

export default ManageStudent;
