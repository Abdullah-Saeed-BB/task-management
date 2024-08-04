import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Project, User } from "../type";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000/api/" }),
  tagTypes: ["Project", "User"],
  endpoints: (builder) => ({
    // Projects
    getProjects: builder.query<Project[], void>({
      query: () => "project",
      providesTags: ["Project"],
    }),

    getProject: builder.query<Project, string>({
      query: (id) => `project/${id}`,
    }),

    getProjectsUsers: builder.query<{users: User[]}, string>({
      query: (id) => `project/${id}/users`,
      providesTags: ["Project"]
    }),

    createProject: builder.mutation({
      query: (project) => ({
        url: "project",
        method: "POST",
        body: project,
      }),
      invalidatesTags: ["Project"],
    }),

    deleteProject: builder.mutation({
      query: (id) => ({
        url: `project/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Project"],
    }),

    updateProject: builder.mutation({
      query: ({ id, project }) => ({
        url: `project/${id}`,
        method: "PUT",
        body: project,
      }),
      invalidatesTags: ["Project"],
    }),

    // Users
    getUsers: builder.query<User[], void>({
      query: () => "user",
      providesTags: ["User"],
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
    changeTaskStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `task/${id}`,
        method: "PUT",
        body: { status },
      }),
    }),

    createTask: builder.mutation({
      query: (task) => ({
        url: 'task',
        method: "POST",
        body: task
      }),
      invalidatesTags: ["Project"]
    })
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
  useGetUsersQuery,
  useDeleteUserMutation,
  useCreateUserMutation,
  useChangeTaskStatusMutation,
  useCreateTaskMutation,
} = apiSlice;
