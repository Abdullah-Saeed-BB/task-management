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
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "EMPLOYEE" | "MANAGER";
}
