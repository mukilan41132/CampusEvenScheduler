import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import HttpAxios from "../../utils/axiosInstance";
import CustomButton from "../../components/Button/CustomButton";
import CreateStudent, {
  initialStudentState,
  type Student,
} from "./create-student";
import FilterListIcon from "@mui/icons-material/FilterList";
import DynamicTable from "../../components/Table/DynamicTable";
import ActionIcon from "../../components/Button/ActionIconBtn";
import ActionColumn from "../../components/ActionBody/actionBodyTemplate";
import { registerStudent, updateByid } from "../../slices/create-student/thunk";
import type { AppDispatch } from "../../store/store";
import { useDispatch } from "react-redux";
import NoData from "../../components/NORecordFound/NoData";

const ManageStudent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [students, setStudents] = useState([]);
  const [filters, setFilters] = useState(null);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [studentState, setStudentState] =
    useState<Student>(initialStudentState);

  const fetchStudents = async (page: number, limit: number) => {
    setLoading(true);

    try {
      const res = await HttpAxios.axios().get(
        `Student/getAll?page=${page}&limit=${limit}`,
      );

      setStudents(res?.data?.content);
      setTotalRecords(res?.data?.totalElements);
    } catch (error) {
      console.error("Failed to fetch students:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents(0, rows);
  }, []);

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
  console.log("studentState", studentState);
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
    // setStudentState(initialStudentState);
    setVisible(false);
  };

  return (
    <div className="card">
      <div className="header-btn">
        <div>
          <ActionIcon
            title="Filter"
            icon={<FilterListIcon />}
            color="error"
            sx={{ marginRight: "15px" }}
            onClick={() => console.log("Filter clicked")}
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
        value={{ students } as any}
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
        registerOrUpdateById={registerOrUpdateById}
        clearState={clearState}
        setStudentState={setStudentState}
      />
    </div>
  );
};

export default ManageStudent;
