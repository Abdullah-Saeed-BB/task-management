import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Project, Task, User } from "../../type";
import Cookies from "js-cookie";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    // baseUrl: "https://task-management-server-theta-two.vercel.app/api/",
    baseUrl: "http://localhost:4000/api/",
    prepareHeaders(headers) {
      const token = Cookies.get("access_token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: [
    "Projects",
    "Client",
    "Project",
    "Project's users",
    "User",
    "Task",
  ],
  endpoints: (builder) => ({
    // Projects
    getProjectsTitles: builder.query<Project[], void>({
      query: () => "project",
      providesTags: ["Projects"],
    }),

    getProjects: builder.query<Project[], void>({
      query: () => "project",
      providesTags: ["Projects", "Project"],
    }),

    getProject: builder.query<Project, string>({
      query: (id) => `project/${id}`,
      providesTags: ["Project"],
    }),

    getProjectsUsers: builder.query<{ users: User[] }, string>({
      query: (id) => `project/${id}/users`,
      providesTags: ["Project's users"],
    }),

    createProject: builder.mutation({
      query: (project) => ({
        url: "project",
        method: "POST",
        body: project,
      }),
      invalidatesTags: ["Projects"],
    }),

    deleteProject: builder.mutation({
      query: (id) => ({
        url: `project/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Projects", "User"],
    }),

    updateProject: builder.mutation({
      query: ({ id, project }) => ({
        url: `project/${id}`,
        method: "PUT",
        body: project,
      }),
      invalidatesTags: ["Projects", "Project"],
    }),

    disconnectProjectsUser: builder.mutation({
      query: ({ projectId, userId }) => ({
        url: `project/disconnect/${projectId}/${userId}`,
        method: "PUT",
      }),
      invalidatesTags: ["Project's users", "Project", "User"],
    }),

    assignProjectsUser: builder.mutation({
      query: ({ projectId, userId }) => ({
        url: `project/${projectId}/${userId}`,
        method: "PUT",
      }),
      invalidatesTags: ["Project's users", "Project", "User"],
    }),

    // Users
    getUsers: builder.query<User[], string | null>({
      query: (role) => (role ? `user/${role}` : "user"),
      providesTags: ["User"],
    }),

    getUser: builder.query<User, string>({
      query: (id) => `user/${id}`,
      providesTags: ["User", "Project's users"],
    }),

    getClientUser: builder.query<User, void>({
      query: () => `user/client`,
      providesTags: ["Client"],
    }),

    updateUser: builder.mutation({
      query: ({ id, user }) => ({
        url: `user/${id}`,
        method: "PUT",
        body: user,
      }),
      invalidatesTags: ["Client", "Project"],
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User", "Project"],
    }),

    createUser: builder.mutation({
      query: (user) => ({
        url: `user/${user.role}`,
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["User"],
    }),

    // Tasks
    getTask: builder.query<Task, void>({
      query: (id) => `task/${id}`,
      providesTags: ["Task"],
    }),

    changeTaskStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `task/${id}`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["Project", "Task", "Project's users", "User"],
    }),

    createTask: builder.mutation({
      query: (task) => ({
        url: "task",
        method: "POST",
        body: task,
      }),
      invalidatesTags: ["Project", "Project's users"],
    }),

    updateTask: builder.mutation({
      query: ({ id, task }) => ({
        url: `task/${id}`,
        method: "PUT",
        body: task,
      }),
      invalidatesTags: ["Task", "Project"],
    }),

    deleteTask: builder.mutation({
      query: (id) => ({
        url: `task/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Project", "Project's users"],
    }),
  }),
});

export const {
  useGetProjectsTitlesQuery,
  useGetProjectsQuery,
  useGetProjectQuery,
  useGetProjectsUsersQuery,
  useCreateProjectMutation,
  useDeleteProjectMutation,
  useUpdateProjectMutation,
  useDisconnectProjectsUserMutation,
  useAssignProjectsUserMutation,
  useGetUsersQuery,
  useGetUserQuery,
  useGetClientUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useCreateUserMutation,
  useGetTaskQuery,
  useChangeTaskStatusMutation,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = apiSlice;
