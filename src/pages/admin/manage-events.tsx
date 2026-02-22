import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, Tooltip } from "@mui/material";
import HttpAxios from "../../utils/axiosInstance";
import CustomButton from "../../components/Button/CustomButton";

import FilterListIcon from "@mui/icons-material/FilterList";
import CreateEventForm from "./create-events";
import CommonTable from "../../components/Table/DynamicTable";

import SearchFilter from "../../components/SearchFilter/SearchFilter";
import type { AppDispatch } from "../../store/store";
import { getAllEvents } from "../../slices/manage-events/thunk";

const columns = [
  {
    field: "organizationName",
    header: "organizationName",
    filter: true,
    filterPlaceholder: "Search by organizationName",
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
    field: "department",
    header: "Department",
    style: { minWidth: "8rem" },
  },
  {
    field: "eventType",
    header: "EventType",
    style: { minWidth: "6rem" },
  },
  {
    field: "venue",
    header: "Venue",
    filter: true,
    filterPlaceholder: "Search by venue",
    style: { minWidth: "12rem" },
  },
];
const ManageEvents: React.FC = () => {
  const eventsLists = useSelector((state: any) => state?.eventsList);
  console.log("eventsLists", eventsLists?.events);

  const [visible, setVisible] = useState(false);
  const [filters, setFilters] = useState(null);
  const [findByName, setFindByName] = useState<string>("");
  const [findByDepartment, setFindByDepartment] = useState<string>("");
  const [findByRollNo, setFindByRollNo] = useState<string>("");
  const [toggle, setToggle] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
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
  const fetchEvents = async () => {
    dispatch(getAllEvents());
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleEdit = (student: any) => {
    setVisible(true);
    console.log("Edit student", student);
  };

  const handleDelete = async (id: string) => {
    try {
      await HttpAxios.axios().delete(`/Student/delete/${id}`);
      fetchEvents();
    } catch (err) {
      console.error("Error deleting student:", err);
    }
  };

  return (
    <div className="card">
      <div className="header-btn">
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
        value={eventsLists?.events}
        loading={eventsLists?.loading}
        columns={columns}
        filters={filters}
        onFilter={(e: any) => setFilters(e.filters)}
        globalFilterFields={["organizationName"]}
      />
      <CreateEventForm visible={visible} setVisible={setVisible} />
    </div>
  );
};

export default ManageEvents;
