import React, { useEffect, useState } from "react";
import { useCreateBlogMutation } from "../../../context/api/blogApi";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

function BlogCreate() {
  const [form, setForm] = useState({ title: "", desc: "" });
  const [createBlog, { isLoading, isSuccess, isError }] =
    useCreateBlogMutation();
  let navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      setForm({ title: "", desc: "" });
      message.success("Blog created successfully");
      navigate("/admin/blogManage");
    }
    if (isError) {
      message.success("Something went wrong");
    }
  }, [isSuccess, isError]);

  const handleCreate = async () => {
    try {
      await createBlog(form);
    } catch (error) {
      message.success("Something went wrong");
    }
  };

  const handleCancel = () => {
    setForm({ title: "", desc: "" });
    navigate("/admin/blogManage");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Create New Blog</h2>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Title"
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <textarea
            placeholder="Description"
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 h-32"
            value={form.desc}
            onChange={(e) => setForm({ ...form, desc: e.target.value })}
          />
          <div className="flex justify-between gap-4 mt-6">
            <button
              onClick={handleCancel}
              className="w-full py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleCreate}
              disabled={isLoading}
              className={`w-full py-3 text-white rounded-lg transition ${
                isLoading ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {isLoading ? "Creating..." : "Create"}
            </button>
          </div>
          {isError && (
            <div className="text-red-500 text-center mt-4">
              Failed to create blog. Please try again.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BlogCreate;
