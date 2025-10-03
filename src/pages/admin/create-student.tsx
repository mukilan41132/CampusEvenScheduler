import CustomTextField from "../../components/Inputfield/CustomTextField";
import { useState } from "react";
import "../../styles/create-student/createstudent.css";
import CustomButton from "../../components/Button/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../store/store";
import { registerStudent } from "../../slices/create-student/studentSlice";

interface Student {
  name: string;
  email: string;
  gender: string;
  age: string;
  department: string;
  rollNo: string;
}
const CreateStudent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const records = useSelector((state: any) => state?.students);
  const [createstudents, setCreatestudent] = useState<Student>({
    name: "",
    email: "",
    gender: "",
    age: "",
    department: "",
    rollNo: "",
  });
  const register = async () => {
    dispatch(registerStudent(createstudents));
  };
  return (
    <>
      <div>
        <h4>Student Register</h4>
        {records.loading && <h4>loading...</h4>}

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
            label={"Gender"}
            value={createstudents.gender}
            onChange={(e) =>
              setCreatestudent({ ...createstudents, gender: e.target.value })
            }
          />

          <CustomTextField
            label={"Age"}
            value={createstudents.age}
            onChange={(e) =>
              setCreatestudent({ ...createstudents, age: e.target.value })
            }
          />

          <CustomTextField
            label={"Department"}
            value={createstudents.department}
            onChange={(e) =>
              setCreatestudent({
                ...createstudents,
                department: e.target.value,
              })
            }
          />
          <CustomTextField
            label={"RollNo"}
            value={createstudents.rollNo}
            onChange={(e) =>
              setCreatestudent({ ...createstudents, rollNo: e.target.value })
            }
          />
        </form>
        <footer className="footer-btn">
          <CustomButton
            onClick={() => register()}
            type="submit"
            text={"Register"}
          />
        </footer>
      </div>
    </>
  );
};

export default CreateStudent;
