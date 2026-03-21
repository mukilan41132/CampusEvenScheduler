import { memo } from "react";
import { Drawer, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Autocomplete from "@mui/material/Autocomplete";
import { TextField } from "@mui/material";

import CustomTextField from "../../components/Inputfield/CustomTextField";
import FileUpload from "../../components/FileUpload/FileUpload";
import CustomButton from "../../components/Button/CustomButton";
import "../../styles/create-student/createstudent.css";
export interface Student {
  id: string;
  profile: any;
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
  registerOrUpdateById: () => Promise<void>;
  clearState: () => void;
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
  profile: "",
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
    studentState,
    setStudentState,
    registerOrUpdateById,
    clearState,
  }: CreateStudentProps) => {
    const stateSetter = (name: string, value: any) => {
      setStudentState((prev) => ({
        ...prev,
        [name]: value,
      }));
    };
    const headerElement = (
      <div className="header_container">
        <FileUpload
          name="profile"
          value={studentState.profile}
          stateSetter={stateSetter}
        />
        <span>{studentState?.firstName}</span>
      </div>
    );

    return (
      <>
        <Drawer anchor="right" open={visible} onClose={clearState}>
          <Box
            sx={{
              width: { xs: "100vw", sm: 450 },
              p: "12px",
              marginTop: "15%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              {headerElement}

              <IconButton onClick={clearState}>
                <CloseIcon />
              </IconButton>
            </Box>

            <form className="students-container">
              <CustomTextField
                label="First Name"
                value={studentState.firstName}
                onChange={(e) =>
                  setStudentState({
                    ...studentState,
                    firstName: e.target.value,
                  })
                }
              />

              <CustomTextField
                label="Last Name"
                value={studentState.lastName}
                onChange={(e) =>
                  setStudentState({
                    ...studentState,
                    lastName: e.target.value,
                  })
                }
              />

              <CustomTextField
                label="Email"
                value={studentState.email}
                onChange={(e) =>
                  setStudentState({
                    ...studentState,
                    email: e.target.value,
                  })
                }
              />

              <CustomTextField
                label="Contact No"
                value={studentState.phoneNo}
                onChange={(e) =>
                  setStudentState({
                    ...studentState,
                    phoneNo: e.target.value,
                  })
                }
              />

              <Autocomplete
                disablePortal
                freeSolo
                size="small"
                options={["Male", "Female", "Other"]}
                value={studentState.gender || ""}
                onChange={(_, value: any) =>
                  setStudentState({
                    ...studentState,
                    gender: value,
                  })
                }
                renderInput={(params) => (
                  <TextField {...params} label="Gender" />
                )}
              />

              <CustomTextField
                label="Age"
                value={studentState.age}
                onChange={(e) =>
                  setStudentState({
                    ...studentState,
                    age: e.target.value,
                  })
                }
              />

              <Autocomplete
                disablePortal
                freeSolo
                size="small"
                options={departments}
                value={studentState.department || ""}
                onChange={(_, value: any) =>
                  setStudentState({
                    ...studentState,
                    department: value,
                  })
                }
                renderInput={(params) => (
                  <TextField {...params} label="Department" />
                )}
              />

              <CustomTextField
                label="Roll No"
                value={studentState.rollNo}
                onChange={(e) =>
                  setStudentState({
                    ...studentState,
                    rollNo: e.target.value,
                  })
                }
              />

              <CustomTextField
                label="Semester"
                value={studentState.semester}
                onChange={(e) =>
                  setStudentState({
                    ...studentState,
                    semester: e.target.value,
                  })
                }
              />

              <CustomTextField
                label="Year Of Study"
                value={studentState.yearOfStudy}
                onChange={(e) =>
                  setStudentState({
                    ...studentState,
                    yearOfStudy: e.target.value,
                  })
                }
              />

              <Box className="drawer-footer">
                <CustomButton
                  size="small"
                  color="primary"
                  onClick={clearState}
                  text={"Cancel"}
                />
                <CustomButton
                  size="small"
                  onClick={registerOrUpdateById}
                  color="secondary"
                  text={studentState?.id ? "Update" : "Register"}
                />
              </Box>
            </form>
          </Box>
        </Drawer>
      </>
    );
  },
);

export default CreateStudent;
