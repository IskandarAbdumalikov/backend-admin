import { api } from "./index";

export const blogApi = api.injectEndpoints({
  endpoints: (build) => ({
    getBlogs: build.query({
      query: (params) => ({
        url: "/blogs",
        params,
      }),
      providesTags: ["Blog"],
    }),
    getBlogById: build.query({
      query: (id) => ({
        url: `/blogs/${id}`,
      }),
      providesTags: ["Blog"],
    }),
    createBlog: build.mutation({
      query: (body) => ({
        url: "/blogs",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Blog"],
    }),
    deleteBlog: build.mutation({
      query: (id) => ({
        url: `/blogs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Blog"],
    }),
    updateBlog: build.mutation({
      query: ({ id, body }) => ({
        url: `/blogs/${id}`,
        method: "PUT",
        body, 
      }),
      invalidatesTags: ["Blog"],
    }),
  }),
});

export const {
  useGetBlogsQuery,
  useCreateBlogMutation,
  useDeleteBlogMutation,
  useGetBlogByIdQuery,
  useUpdateBlogMutation,
} = blogApi;
