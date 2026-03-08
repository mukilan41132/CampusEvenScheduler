import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconButton, Tooltip } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateEventForm, { type EventFormData } from "./create-events";
import type { AppDispatch } from "../../store/store";
import {
  getAllEvents,
  register,
  updateByid,
} from "../../slices/manage-events/thunk";
import CustomButton from "../../components/Button/CustomButton";
import CommonTable from "../../components/Table/DynamicTable";
import SearchFilter from "../../components/SearchFilter/SearchFilter";
import HttpAxios from "../../utils/axiosInstance";
import ActionColumn from "../../components/ActionBody/actionBodyTemplate";
import NoData from "../../components/NORecordFound/NoData";
const initialEvents = {
  id: "",
  eventName: "",
  eventType: "",
  description: "",
  date: "",
  startTime: "",
  endTime: "",
  venue: "",
  department: "",
  organizerName: "",
  contactEmail: "",
  contactNumber: "",
  maxParticipants: "",
  registrationFee: "",
  status: "Upcoming",
};
const ManageEvents: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const popup = useRef<HTMLParagraphElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [loading, setLoading] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);
  const [visible, setVisible] = useState(false);
  const [filters, setFilters] = useState(null);
  const [findByName, setFindByName] = useState<string>("");
  const [findByDepartment, setFindByDepartment] = useState<string>("");
  const [findByRollNo, setFindByRollNo] = useState<string>("");
  const [toggle, setToggle] = useState<boolean>(false);
  const [event, setEvent] = useState<EventFormData>(initialEvents);
  const [eventsList, setEventList] = useState([]);

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

  const fetchStudents = async (page: number, limit: number) => {
    setLoading(true);
    try {
      const res = await HttpAxios.axios().get(
        `ManageEvents/getAllEvents?page=${page}&limit=${limit}`,
      );
      setEventList(res?.data?.content);
      setTotalRecords(res?.data?.totalElements);
    } catch (error) {
      console.error("Failed to fetch students:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchStudents(0, rows);
  }, []);
  const onPage = (event: any) => {
    const page = event?.page;
    const limit = event?.rows;
    setFirst(event?.first);
    setRows(limit);

    fetchStudents(page, limit);
  };

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
    {
      header: "Actions",
      body: (row: any) => actionBodyTemplate(row),
      style: { width: "8rem" },
    },
  ];
  const actionBodyTemplate = (rowData: EventFormData) => (
    <ActionColumn
      rowData={rowData}
      actions={[
        {
          title: "Edit",
          icon: <EditIcon />,
          color: "warning",
          onClick: handleEdit,
        },
        {
          title: "Delete",
          icon: <DeleteIcon />,
          color: "error",
          onClick: (data) => handleDelete(data.id),
        },
      ]}
    />
  );
  const handleEdit = (row: any) => {
    setVisible(true);
    setEvent(row);
  };

  const handleDelete = async (id: string) => {
    try {
      await HttpAxios.axios().delete(`/ManageEvents/deleteEventById/${id}`);
      fetchStudents(0, rows);
    } catch (err) {
      console.error("Error deleting student:", err);
    }
  };

  const registerOrUpdateById = async () => {
    try {
      if (event?.id) {
        await dispatch(updateByid(event)).unwrap();
      } else {
        await dispatch(register(event)).unwrap();
      }

      fetchStudents(0, rows);
    } catch (error) {
      console.error("Operation failed", error);
    }
  };

  const clearState = () => {
    setEvent(initialEvents);
    setVisible(false);
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
              setEvent(initialEvents);
            }}
          />
        </div>
      </div>

      <CommonTable
        value={eventsList}
        loading={loading}
        columns={columns}
        filters={filters}
        emptyMessage={<NoData message="No Data Found" />}
        first={first}
        rows={rows}
        totalRecords={totalRecords}
        onPage={onPage}
        onFilter={(e: any) => setFilters(e.filters)}
        globalFilterFields={["organizationName"]}
      />

      <CreateEventForm
        visible={visible}
        setVisible={setVisible}
        event={event}
        registerOrUpdateById={registerOrUpdateById}
        clearState={clearState}
        setEvent={setEvent}
      />
    </div>
  );
};

export default ManageEvents;
