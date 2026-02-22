import CustomTextField from "../../components/Inputfield/CustomTextField";
import { memo } from "react";
import "../../styles/create-student/createstudent.css";
import CustomButton from "../../components/Button/CustomButton";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store/store";
import { Dialog } from "primereact/dialog";
import Autocomplete from "@mui/material/Autocomplete";
import { TextField } from "@mui/material";
import {
  getAllStudents,
  registerStudent,
  updateByid,
} from "../../slices/create-student/thunk";
import FileUpload from "../../components/FileUpload/FileUpload";

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
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

  studentState: Student;
  setStudentState: React.Dispatch<React.SetStateAction<Student>>;
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
export const initialStudentState = {
  id: "",
  firstName: "",
  lastName: "",
  phoneNo: "",
  email: "",
  yearOfStudy: "",
  semester: "",
  gender: "",
  age: "",
  department: "",
  rollNo: "",
};
const CreateStudent = memo(
  ({
    visible,
    setVisible,
    studentState,
    setStudentState,
  }: CreateStudentProps) => {
    const dispatch = useDispatch<AppDispatch>();
    // studentState.age = "30";Uncaught TypeError: Cannot assign to read only property 'age' of object '#<Object>'
    const registerOrUpdateById = async () => {
      try {
        if (studentState?.id) {
          await dispatch(updateByid(studentState)).unwrap();
        } else {
          await dispatch(registerStudent(studentState)).unwrap();
        }

        dispatch(getAllStudents());
      } catch (error) {
        console.error("Operation failed", error);
      }
    };

    const clearState = () => {
      setStudentState(initialStudentState);
      setVisible(false);
    };
    const footerContent = (
      <div className="footer-btn">
        <CustomButton
          size="small"
          color="primary"
          onClick={clearState}
          type="submit"
          text={"Cancel"}
        />
        <CustomButton
          size="small"
          onClick={() => registerOrUpdateById()}
          color="secondary"
          type="submit"
          text={"Register"}
        />
      </div>
    );
    const headerElement = (
      <div className="inline-flex align-items-center justify-content-center gap-2">
        <FileUpload />
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
            clearState();
          }}
        >
          <form className="students-container">
            <CustomTextField
              label={"First Name"}
              value={studentState.firstName}
              onChange={(e) =>
                setStudentState({
                  ...studentState,
                  firstName: e.target.value,
                })
              }
            />
            <CustomTextField
              label={"Last Name"}
              value={studentState.lastName}
              onChange={(e) =>
                setStudentState({
                  ...studentState,
                  lastName: e.target.value,
                })
              }
            />
            <CustomTextField
              label={"Email"}
              value={studentState.email}
              onChange={(e) =>
                setStudentState({ ...studentState, email: e.target.value })
              }
            />
            <CustomTextField
              label={"Contact No"}
              value={studentState.phoneNo}
              onChange={(e) =>
                setStudentState({ ...studentState, phoneNo: e.target.value })
              }
            />
            <Autocomplete
              disablePortal
              size="small"
              options={["Male", "Female", "Other"]}
              value={studentState.gender || ""}
              onChange={(_, value: any) =>
                setStudentState({ ...studentState, gender: value })
              }
              renderInput={(params) => <TextField {...params} label="Gender" />}
            />

            <CustomTextField
              label={"Age"}
              value={studentState.age}
              onChange={(e) =>
                setStudentState({ ...studentState, age: e.target.value })
              }
            />
            <Autocomplete
              disablePortal
              size="small"
              options={departments}
              value={studentState.department || ""}
              onChange={(_, value: any) =>
                setStudentState({ ...studentState, department: value })
              }
              renderInput={(params) => (
                <TextField {...params} label="Department" />
              )}
            />
            <CustomTextField
              label={"RollNo"}
              value={studentState.rollNo}
              onChange={(e) =>
                setStudentState({ ...studentState, rollNo: e.target.value })
              }
            />
            <CustomTextField
              label={"Semester"}
              value={studentState.semester}
              onChange={(e) =>
                setStudentState({
                  ...studentState,
                  semester: e.target.value,
                })
              }
            />
            <CustomTextField
              label={"YearOfStudy"}
              value={studentState.yearOfStudy}
              onChange={(e) =>
                setStudentState({
                  ...studentState,
                  yearOfStudy: e.target.value,
                })
              }
            />
          </form>
        </Dialog>
      </>
    );
  },
);

export default CreateStudent;
