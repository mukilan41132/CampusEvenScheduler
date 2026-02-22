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
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../store/store";
import { getAllStudents } from "../../slices/create-student/thunk";
import DynamicTable from "../../components/Table/DynamicTable";
import ActionIcon from "../../components/Button/ActionIconBtn";

const ManageStudent: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const records = useSelector((state: any) => state?.students);
  const [filters, setFilters] = useState(null);

  const [studentState, setStudentState] =
    useState<Student>(initialStudentState);
  useEffect(() => {
    fetchStudents();
  }, [dispatch]);

  const fetchStudents = async () => {
    try {
      await dispatch(getAllStudents());
    } catch (err) {
      console.error("Error fetching students:", err);
    } finally {
    }
  };

  const actionBodyTemplate = (rowData: Student) => {
    return (
      <div style={{ display: "flex", gap: "8px" }}>
        <ActionIcon
          title="Filter"
          icon={<EditIcon />}
          color="warning"
          size="small"
          sx={{ marginRight: "15px" }}
          onClick={() => handleEdit(rowData)}
        />
        <ActionIcon
          title="Filter"
          icon={<DeleteIcon />}
          color="error"
          size="small"
          sx={{ marginRight: "15px" }}
          onClick={() => handleDelete(rowData?.id)}
        />
      </div>
    );
  };
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
      await HttpAxios.axios().delete(`/Student/delete/${id}`);
      fetchStudents();
    } catch (err) {
      console.error("Error deleting student:", err);
    }
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
        value={records?.students || []}
        loading={loading}
        columns={columns}
        filters={filters}
        onFilter={(e: any) => setFilters(e.filters)}
        globalFilterFields={["firstName", "rollNo", "department", "gender"]}
      />
      <CreateStudent
        visible={visible}
        setVisible={setVisible}
        studentState={studentState}
        setStudentState={setStudentState}
      />
    </div>
  );
};

export default ManageStudent;
