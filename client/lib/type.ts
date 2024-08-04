export interface Project {
  id: string;
  title: string;
  color: string;
  users: {
    id: string;
    name: string;
    email: string;
    password: string;
    role: "EMPLOYEE" | "MANAGER";
  }[];
  _count: { tasks: number };
  tasks?: Task[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "EMPLOYEE" | "MANAGER";
}

export interface Task {
  id: string;
  title: string;
  description: string;
  notes: string;
  status: "STUCK" | "WORKING_ON" | "DONE";
  dueDate: string;
  assignedToId: string;
  assignedTo: User;
}
