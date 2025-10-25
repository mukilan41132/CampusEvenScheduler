import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, Tooltip } from "@mui/material";
import HttpAxios from "../../utils/axiosInstance";
import CustomButton from "../../components/Button/CustomButton";

import FilterListIcon from "@mui/icons-material/FilterList";
import CreateEventForm from "./create-events";

interface Student {
  id: string;
  name: string;
  email: string;
  gender: string;
  age: string;
  department: string;
  rollNo: string;
}
const studentsdata: Student[] = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    gender: "Female",
    age: "20",
    department: "Computer Science",
    rollNo: "CS101",
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob.smith@example.com",
    gender: "Male",
    age: "21",
    department: "Mechanical Engineering",
    rollNo: "ME102",
  },
  {
    id: "3",
    name: "Charlie Brown",
    email: "charlie.brown@example.com",
    gender: "Male",
    age: "22",
    department: "Electrical Engineering",
    rollNo: "EE103",
  },
  {
    id: "4",
    name: "Diana Prince",
    email: "diana.prince@example.com",
    gender: "Female",
    age: "20",
    department: "Civil Engineering",
    rollNo: "CE104",
  },
  {
    id: "5",
    name: "Ethan Hunt",
    email: "ethan.hunt@example.com",
    gender: "Male",
    age: "23",
    department: "Computer Science",
    rollNo: "CS105",
  },
  {
    id: "6",
    name: "Fiona Gallagher",
    email: "fiona.gallagher@example.com",
    gender: "Female",
    age: "21",
    department: "Mechanical Engineering",
    rollNo: "ME106",
  },
  {
    id: "7",
    name: "George Martin",
    email: "george.martin@example.com",
    gender: "Male",
    age: "22",
    department: "Electrical Engineering",
    rollNo: "EE107",
  },
  {
    id: "8",
    name: "Hannah Baker",
    email: "hannah.baker@example.com",
    gender: "Female",
    age: "20",
    department: "Civil Engineering",
    rollNo: "CE108",
  },
  {
    id: "9",
    name: "Ian Somerhalder",
    email: "ian.somerhalder@example.com",
    gender: "Male",
    age: "23",
    department: "Computer Science",
    rollNo: "CS109",
  },
  {
    id: "10",
    name: "Julia Roberts",
    email: "julia.roberts@example.com",
    gender: "Female",
    age: "21",
    department: "Mechanical Engineering",
    rollNo: "ME110",
  },
];
const ManageEvents: React.FC = () => {
  const [students, setStudents] = useState<Student[]>(studentsdata);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await HttpAxios.axios().get("/Student/all");
      setStudents(res.data);
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
            onClick={() => handleEdit(rowData)}>
            <EditIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Delete">
          <IconButton
            size="small"
            color="error"
            onClick={() => handleDelete(rowData.id)}>
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
        <h3>Manage Events </h3>
        <div>
          <Tooltip title="Delete">
            <IconButton
              size="small"
              sx={{ marginRight: "15px" }}
              color="error"
              onClick={() => console.log("Filter clicked")}>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
          <CustomButton
            text={"Create Events"}
            onClick={() => {
              setVisible(true);
            }}
          />
        </div>
      </div>

      <DataTable
        value={students}
        rows={5}
        loading={loading}
        stripedRows
        size="small"
        responsiveLayout="scroll"
        paginator
        rowsPerPageOptions={[5, 10, 25, 50]}>
        <Column field="name" header="Name" sortable />
        <Column field="email" header="Email" sortable />
        <Column field="gender" header="Gender" sortable />
        <Column field="age" header="Age" sortable />
        <Column field="department" header="Department" sortable />
        <Column field="rollNo" header="Roll No" sortable />
        <Column header="Actions" body={actionBodyTemplate} />
      </DataTable>
      <CreateEventForm visible={visible} setVisible={setVisible} />
    </div>
  );
};

export default ManageEvents;
