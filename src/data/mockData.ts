import type { User, Event, ApprovalItem, ActivityItem } from "../Types";



export const users: Record<string, User> = {
  admin: { name: "Priya Anand", initials: "PA", role: "ADMIN" },
  faculty: { name: "Dr. Ramesh Kumar", initials: "RK", role: "faculty" },
  student: { name: "Arjun Verma", initials: "AV", role: "STUDENT" },
};

export const events: Event[] = [
  {
    id: "1",
    title: "AI & ML Workshop",
    description: "Hands-on workshop covering machine learning fundamentals and practical AI applications.",
    date: "Jun 12, 2026",
    venue: "CSE Lab 3",
    organizer: "Dr. Ramesh Kumar",
    department: "CSE",
    category: "workshop",
    status: "approved",
    capacity: 100,
    registered: 85,
    iconColor: "#534AB7",
    iconBg: "#EEEDFE",
  },
  {
    id: "2",
    title: "Hackathon 2026",
    description: "36-hour coding marathon open to all students. Build innovative solutions.",
    date: "Jun 20–21, 2026",
    venue: "Main Hall",
    organizer: "Dr. Ramesh Kumar",
    department: "CSE",
    category: "technical",
    status: "live",
    capacity: 150,
    registered: 142,
    iconColor: "#0F6E56",
    iconBg: "#E1F5EE",
  },
  {
    id: "3",
    title: "Cultural Night 2026",
    description: "Annual cultural celebration with music, dance, and drama performances.",
    date: "Jun 24, 2026",
    venue: "Open Amphitheatre",
    organizer: "Prof. Anita Singh",
    department: "Humanities",
    category: "cultural",
    status: "upcoming",
    capacity: 500,
    registered: 445,
    iconColor: "#993556",
    iconBg: "#FBEAF0",
  },
  {
    id: "4",
    title: "Cybersecurity Seminar",
    description: "Industry expert talk on modern cybersecurity threats and defense strategies.",
    date: "Jul 5, 2026",
    venue: "Auditorium",
    organizer: "Dr. Ramesh Kumar",
    department: "CSE",
    category: "seminar",
    status: "upcoming",
    capacity: 80,
    registered: 28,
    iconColor: "#185FA5",
    iconBg: "#E6F1FB",
  },
  {
    id: "5",
    title: "Robotics Workshop",
    description: "Learn to build and program robots using Arduino and Raspberry Pi.",
    date: "Jun 28, 2026",
    venue: "ECE Lab",
    organizer: "Dr. Meera Nair",
    department: "ECE",
    category: "workshop",
    status: "pending",
    capacity: 60,
    registered: 0,
    iconColor: "#854F0B",
    iconBg: "#FAEEDA",
  },
];

export const approvals: ApprovalItem[] = [
  { id: "a1", eventTitle: "National Science Symposium", submittedBy: "Dr. Ramesh Kumar", department: "CSE Dept", date: "Jun 15", status: "pending" },
  { id: "a2", eventTitle: "Inter-college Debate", submittedBy: "Prof. Anita Singh", department: "Humanities", date: "Jun 18", status: "pending" },
  { id: "a3", eventTitle: "Alumni Networking Meet", submittedBy: "Admin Office", department: "All Depts", date: "Jun 22", status: "pending" },
  { id: "a4", eventTitle: "Robotics Workshop", submittedBy: "Dr. Meera Nair", department: "ECE Dept", date: "Jun 28", status: "pending" },
];

export const adminActivity: ActivityItem[] = [
  { id: "1", text: "Annual Tech Fest approved — 280 registrations so far", time: "10 min ago", dotColor: "#7F77DD" },
  { id: "2", text: "Cultural Night registration closed — 198 attendees", time: "1 hour ago", dotColor: "#1D9E75" },
  { id: "3", text: "New event submitted by Dr. Meera Nair (Robotics Workshop)", time: "3 hours ago", dotColor: "#EF9F27" },
  { id: "4", text: "42 new students registered for Hackathon 2026", time: "Yesterday", dotColor: "#378ADD" },
  { id: "5", text: "Sports Day event flagged for venue conflict — Jun 20", time: "Yesterday", dotColor: "#D85A30" },
];

export const facultyActivity: ActivityItem[] = [
  { id: "1", text: "Riya Sharma registered for AI & ML Workshop", time: "25 min ago", dotColor: "#7F77DD" },
  { id: "2", text: 'Team "ByteForce" registered for Hackathon 2026', time: "1 hour ago", dotColor: "#1D9E75" },
  { id: "3", text: "12 students registered for Hackathon 2026", time: "3 hours ago", dotColor: "#1D9E75" },
];

export const eventBreakdown = [
  { label: "Technical", count: 54, total: 142, color: "#7F77DD" },
  { label: "Cultural", count: 38, total: 142, color: "#D4537E" },
  { label: "Sports", count: 22, total: 142, color: "#1D9E75" },
  { label: "Seminars", count: 18, total: 142, color: "#378ADD" },
  { label: "Workshops", count: 10, total: 142, color: "#EF9F27" },
];

export const calendarEventDays = [5, 8, 12, 15, 18, 20, 21, 24, 28];
