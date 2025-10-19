import CustomTextField from "../../components/Inputfield/CustomTextField";
import { useState } from "react";
import "../../styles/create-student/createstudent.css";
import CustomButton from "../../components/Button/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../store/store";

import { Dialog } from "primereact/dialog";
import { Avatar } from "primereact/avatar";
import Autocomplete from "@mui/material/Autocomplete";
import { TextField } from "@mui/material";
import { registerStudent } from "../../slices/create-student/thunk";

interface Student {
  name: string;
  email: string;
  phoneNo: string;
  gender: string;
  yearOfStudy: string;
  semester: string;
  age: string;
  department: string;
  rollNo: string;
}
interface CreateStudentProps {
  visible: boolean;
  setVisible: (value: boolean) => void;
}
const departments = [
  "Computer Science Engineering",
  "Information Technology",
  "Electronics and Communication Engineering",
  "Electrical and Electronics Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Automobile Engineering",
  "Chemical Engineering",
  "Biomedical Engineering",
  "Aerospace Engineering",

  "Physics",
  "Chemistry",
  "Mathematics",
  "Biotechnology",
  "Microbiology",
  "Environmental Science",

  "Commerce",
  "Accounting and Finance",
  "Business Administration",
  "Economics",
  "Banking and Insurance",
  "Management Studies",

  "English",
  "History",
  "Political Science",
  "Sociology",
  "Psychology",
  "Philosophy",
  "Public Administration",

  "Computer Applications (BCA/MCA)",
  "Data Science",
  "Artificial Intelligence",
  "Cyber Security",
  "Medicine",
  "Nursing",
  "Pharmacy",
  "Physiotherapy",
  "Public Health",
  "Education (B.Ed/M.Ed)",
  "Law (LLB/LLM)",
  "Social Work",
  "Agriculture",
  "Horticulture",
  "Forestry",
  "Fisheries Science",
  "Architecture",
  "Interior Design",
  "Fashion Design",
  "Graphic Design",
];

const CreateStudent: React.FC<CreateStudentProps> = ({
  visible,
  setVisible,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const records = useSelector((state: any) => state?.students);
  const [createstudents, setCreatestudent] = useState<Student>({
    name: "",
    email: "",
    phoneNo: "",
    yearOfStudy: "",
    semester: "",
    gender: "",
    age: "",
    department: "",
    rollNo: "",
  });
  const register = async () => {
    dispatch(registerStudent(createstudents));
  };
  const footerContent = (
    <div className="footer-btn">
      <CustomButton
        size="small"
        color="primary"
        onClick={() => register()}
        type="submit"
        text={"Cancel"}
      />
      <CustomButton
        size="small"
        onClick={() => register()}
        color="secondary"
        type="submit"
        text={"Register"}
      />
    </div>
  );
  const headerElement = (
    <div className="inline-flex align-items-center justify-content-center gap-2">
      <Avatar
        image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png"
        shape="circle"
      />
      <span className="font-bold white-space-nowrap">Amy Elsner</span>
    </div>
  );
  return (
    <>
      <Dialog
        visible={visible}
        modal
        header={headerElement}
        footer={footerContent}
        style={{ width: "50rem" }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}>
        <form className="students-container">
          <CustomTextField
            label={"Name"}
            value={createstudents.name}
            onChange={(e) =>
              setCreatestudent({ ...createstudents, name: e.target.value })
            }
          />
          <CustomTextField
            label={"Email"}
            value={createstudents.email}
            onChange={(e) =>
              setCreatestudent({ ...createstudents, email: e.target.value })
            }
          />
          <CustomTextField
            label={"Contact No"}
            value={createstudents.phoneNo}
            onChange={(e) =>
              setCreatestudent({ ...createstudents, phoneNo: e.target.value })
            }
          />
          <Autocomplete
            disablePortal
            size="small"
            options={["Male", "Female", "Other"]}
            value={createstudents.gender || ""}
            onChange={(_, value: any) =>
              setCreatestudent({ ...createstudents, gender: value })
            }
            renderInput={(params) => <TextField {...params} label="Gender" />}
          />

          <CustomTextField
            label={"Age"}
            value={createstudents.age}
            onChange={(e) =>
              setCreatestudent({ ...createstudents, age: e.target.value })
            }
          />
          <Autocomplete
            disablePortal
            size="small"
            options={departments}
            value={createstudents.department || ""}
            onChange={(_, value: any) =>
              setCreatestudent({ ...createstudents, department: value })
            }
            renderInput={(params) => (
              <TextField {...params} label="Department" />
            )}
          />
          <CustomTextField
            label={"RollNo"}
            value={createstudents.rollNo}
            onChange={(e) =>
              setCreatestudent({ ...createstudents, rollNo: e.target.value })
            }
          />
          <CustomTextField
            label={"Semester"}
            value={createstudents.semester}
            onChange={(e) =>
              setCreatestudent({ ...createstudents, semester: e.target.value })
            }
          />
          <CustomTextField
            label={"YearOfStudy"}
            value={createstudents.yearOfStudy}
            onChange={(e) =>
              setCreatestudent({
                ...createstudents,
                yearOfStudy: e.target.value,
              })
            }
          />
        </form>
      </Dialog>
    </>
  );
};

export default CreateStudent;
