export type Role = "ADMIN" | "faculty" | "STUDENT";

export type EventStatus = "pending" | "approved" | "live" | "upcoming" | "rejected";

export type EventCategory =
  | "technical"
  | "cultural"
  | "sports"
  | "workshop"
  | "seminar";

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  venue: string;
  organizer: string;
  department: string;
  category: EventCategory;
  status: EventStatus;
  capacity: number;
  registered: number;
  iconColor: string;
  iconBg: string;
}

export interface ActivityItem {
  id: string;
  text: string;
  time: string;
  dotColor: string;
}

export interface User {
  name: string;
  initials: string;
  role: Role;
}

export interface ApprovalItem {
  id: string;
  eventTitle: string;
  submittedBy: string;
  department: string;
  date: string;
  status: "pending" | "approved" | "rejected";
}
