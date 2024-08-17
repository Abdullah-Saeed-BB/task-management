export interface Project {
  id: string;
  title: string;
  color: string;
  users: User[];
  tasks: Task[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "EMPLOYEE" | "MANAGER";
  projects: Project[];
}

export interface ProjectsUser {
  id: string;
  name: string;
  email: string;
  password: string;
  tasks: Task[];
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
  project: Project;
  projectId: string;
}
