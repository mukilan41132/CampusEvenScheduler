import React, { useEffect, useRef, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, Tooltip } from "@mui/material";
import HttpAxios from "../../utils/axiosInstance";
import CustomButton from "../../components/Button/CustomButton";

import FilterListIcon from "@mui/icons-material/FilterList";
import CreateEventForm from "./create-events";
import CommonTable from "../../components/Table/DynamicTable";
import ActionIcon from "../../components/Button/ActionIconBtn";
import SearchFilter from "../../components/SearchFilter/SearchFilter";

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

const columns = [
  {
    field: "name",
    header: "Name",
    filter: true,
    filterPlaceholder: "Search by name",
    style: { minWidth: "12rem" },
  },
  {
    field: "email",
    header: "Email",
    filter: true,
    filterPlaceholder: "Search by email",
    style: { minWidth: "14rem" },
  },
  {
    field: "gender",
    header: "Gender",
    style: { minWidth: "8rem" },
  },
  {
    field: "age",
    header: "Age",
    style: { minWidth: "6rem" },
  },
  {
    field: "department",
    header: "Department",
    filter: true,
    filterPlaceholder: "Search by department",
    style: { minWidth: "12rem" },
  },
  {
    field: "rollNo",
    header: "Roll No",
    style: { minWidth: "10rem" },
  },
];
const ManageEvents: React.FC = () => {
  const [students, setStudents] = useState<Student[]>(studentsdata);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [filters, setFilters] = useState(null);
  const [findByName, setFindByName] = useState<string>("");
  const [findByDepartment, setFindByDepartment] = useState<string>("");
  const [findByRollNo, setFindByRollNo] = useState<string>("");
  const [toggle, setToggle] = useState<boolean>(false);

  const popup = useRef<HTMLParagraphElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (popup.current == null || buttonRef.current == null) return;
    popup.current.style.transition =
      "margin-right 300ms ease, opacity 300ms ease";
    popup.current.style.marginRight = toggle ? "25px" : "0px";
    popup.current.style.opacity = toggle ? "1" : "0";
    return () => {
      if (popup.current) {
        popup.current.style.transition = "";
      }
    };
  }, [toggle]);

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
        {toggle && (
          <SearchFilter
            popup={popup}
            labelObj={{
              label1: "FindByName",
              label2: "FindByDepartment",
              label3: "FindByRollNo",
            }}
            value1={findByName}
            onChange1={setFindByName}
            onChange2={setFindByDepartment}
            onChange3={setFindByRollNo}
            value2={findByDepartment}
            value3={findByRollNo}
          />
        )}

        <div>
          <Tooltip title="Delete">
            <IconButton
              ref={buttonRef}
              size="small"
              sx={{ marginRight: "15px" }}
              color="error"
              onClick={() => setToggle((prev) => !prev)}
            >
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
      <CommonTable
        value={students}
        loading={loading}
        columns={columns}
        filters={filters}
        onFilter={(e: any) => setFilters(e.filters)}
        globalFilterFields={["name", "email", "department", "gender", "rollNo"]}
        header={<h3>Student List</h3>}
      />
      <CreateEventForm visible={visible} setVisible={setVisible} />
    </div>
  );
};

export default ManageEvents;
