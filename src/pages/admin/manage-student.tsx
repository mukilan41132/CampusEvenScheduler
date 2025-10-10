import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import HttpAxios from "../../utils/axiosInstance"; // adjust path
import CustomButton from "../../components/Button/CustomButton";
import { useNavigate } from "react-router-dom";

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
    const navigate = useNavigate();
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await HttpAxios.axios().get("/Student/all"); // API endpoint
      setStudents(res.data);
    } catch (err) {
      console.error("Error fetching students:", err);
    } finally {
      setLoading(false);
    }
  };

  const actionBodyTemplate = (rowData: Student) => {
    return (
      <div className="flex gap-2">
        <Button
          label="Edit"
          icon="pi pi-pencil"
          className="p-button-sm p-button-warning"
          onClick={() => handleEdit(rowData)}
        />
        <Button
          label="Delete"
          icon="pi pi-trash"
          className="p-button-sm p-button-danger"
          onClick={() => handleDelete(rowData.id)}
        />
      </div>
    );
  };

  const handleEdit = (student: Student) => {
    console.log("Edit student", student);
    // open dialog / navigate to edit page
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
      <div>
        <h3>Manage Students </h3>
        <CustomButton text={"Create Students"} onClick={() => {}} />
      </div>

      <DataTable
        value={students}
        paginator
        rows={5}
        loading={loading}
        stripedRows
        responsiveLayout="scroll">
        <Column field="name" header="Name" sortable />
        <Column field="email" header="Email" sortable />
        <Column field="gender" header="Gender" sortable />
        <Column field="age" header="Age" sortable />
        <Column field="department" header="Department" sortable />
        <Column field="rollNo" header="Roll No" sortable />
        <Column header="Actions" body={actionBodyTemplate} />
      </DataTable>
    </div>
  );
};

export default ManageStudent;
