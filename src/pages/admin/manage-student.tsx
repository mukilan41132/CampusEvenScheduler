import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, Tooltip } from "@mui/material";
import HttpAxios from "../../utils/axiosInstance";
import CustomButton from "../../components/Button/CustomButton";
import CreateStudent from "./create-student";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../store/store";
import { getAllStudents } from "../../slices/create-student/thunk";

interface Student {
  id: string;
  name: string;
  email: string;
  gender: string;
  age: string;
  department: string;
  rollNo: string;
}

const ManageStudent: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
    const records = useSelector((state: any) => state?.students);
    console.log("records",records.students)
  useEffect(() => {
    fetchStudents();
  }, [dispatch ,visible]);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      dispatch(getAllStudents());

    } catch (err) {
      console.error("Error fetching students:", err);
    } finally {
      setLoading(false);
    }
  };

  const actionBodyTemplate = (rowData: Student) => {
    return (
      <div style={{ display: "flex", gap: "8px" }}>
        <Tooltip title="Edit">
          <IconButton
            size="small"
            color="warning"
            onClick={() => handleEdit(rowData)}
          >
            <EditIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Delete">
          <IconButton
            size="small"
            color="error"
            onClick={() => handleDelete(rowData.id)}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </div>
    );
  };

  const handleEdit = (student: Student) => {
    setVisible(true);
    console.log("Edit student", student);
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
        <h3>Manage Students </h3>
        <div>
          <Tooltip title="Delete">
            <IconButton
              size="small"
              sx={{ marginRight: "15px" }}
              color="error"
              onClick={() => console.log("Filter clicked")}
            >
              <FilterListIcon />
            </IconButton>
          </Tooltip>
          <CustomButton
            text={"Create Students"}
            onClick={() => {
              setVisible(true);
            }}
          />
        </div>
      </div>

      <DataTable
        value={records?.students||[]}
        rows={5}
        loading={loading}
        stripedRows
        size="small"
        responsiveLayout="scroll"
        paginator
        rowsPerPageOptions={[5, 10, 25, 50]}
      >
        <Column field="firstName" header="Name" sortable />
                <Column field="lastName" header="Name" sortable />
                        
        <Column field="email" header="Email" sortable />
        <Column field="gender" header="Gender" sortable />
        <Column field="age" header="Age" sortable />
        <Column field="department" header="Department" sortable />
        <Column field="rollNo" header="Roll No" sortable />
        <Column header="Actions" body={actionBodyTemplate} />
      </DataTable>
      <CreateStudent visible={visible} setVisible={setVisible} />
    </div>
  );
};

export default ManageStudent;
