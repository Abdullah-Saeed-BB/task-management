import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Project, Task, User } from "../../type";
import Cookies from "js-cookie";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/api/",
    prepareHeaders(headers, api) {
      const token = Cookies.get("authentication");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["Projects", "Project", "Project's users", "User", "Task"],
  endpoints: (builder) => ({
    // Projects
    getProjects: builder.query<Project[], void>({
      query: () => "project",
      providesTags: ["Projects"],
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
      invalidatesTags: ["Projects"],
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
      invalidatesTags: ["Project's users", "Project"],
    }),

    assignProjectsUser: builder.mutation({
      query: ({ projectId, userId }) => ({
        url: `project/${projectId}/${userId}`,
        method: "PUT",
      }),
      invalidatesTags: ["Project's users", "Project"],
    }),

    // Users
    getUsers: builder.query<User[], string | null>({
      query: (role) => (role ? `user/${role}` : "user"),
      providesTags: ["User"],
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User", "Projects", "Project"],
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
      invalidatesTags: ["Project", "Task", "Project's users"],
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

// useDeleteElementMutation
export const {
  useGetProjectsQuery,
  useGetProjectQuery,
  useGetProjectsUsersQuery,
  useCreateProjectMutation,
  useDeleteProjectMutation,
  useUpdateProjectMutation,
  useDisconnectProjectsUserMutation,
  useAssignProjectsUserMutation,
  useGetUsersQuery,
  useDeleteUserMutation,
  useCreateUserMutation,
  useGetTaskQuery,
  useChangeTaskStatusMutation,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = apiSlice;
