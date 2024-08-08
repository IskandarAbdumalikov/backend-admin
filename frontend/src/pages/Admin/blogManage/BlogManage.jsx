import React, { useState } from "react";
import {
  useDeleteBlogMutation,
  useGetBlogsQuery,
  useUpdateBlogMutation,
} from "../../../context/api/blogApi";
import { Modal, Button, Input, message } from "antd";

function BlogManage() {
  const { data } = useGetBlogsQuery();
  const [deleteBlog] = useDeleteBlogMutation();
  const [editBlog] = useUpdateBlogMutation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(null);
  const [form, setForm] = useState({ title: "", desc: "" });

  const showDeleteConfirm = (id) => {
    Modal.confirm({
      title: "Are you sure delete this blog?",
      content: "This action cannot be undone",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        handleDelete(id);
      },
    });
  };

  const showEditModal = (blog) => {
    setCurrentBlog(blog);
    setForm({ title: blog.title, desc: blog.desc });
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteBlog(id);
      message.success("Blog deleted successfully");
    } catch {
      message.error("Failed to delete blog");
    }
  };

  const handleEdit = async () => {
    try {
      await editBlog({ id: currentBlog._id, ...form });
      message.success("Blog updated successfully");
      setIsModalVisible(false);
    } catch {
      message.error("Failed to update blog");
    }
  };

  return (
    <div className="flex flex-col gap-6 pt-24 pl-10">
      {data?.payload.map((item) => (
        <div key={item._id} className="flex gap-5 text-black items-center">
          <div>
            <h3 className="text-lg font-bold">{item.title}</h3>
            <p className="text-sm">{item.desc}</p>
          </div>
          <div className="flex gap-3">
            <Button type="danger" onClick={() => showDeleteConfirm(item._id)}>
              Delete
            </Button>
            <Button type="primary" onClick={() => showEditModal(item)}>
              Edit
            </Button>
          </div>
        </div>
      ))}

      <Modal
        title="Edit Blog"
        visible={isModalVisible}
        onOk={handleEdit}
        onCancel={() => setIsModalVisible(false)}
        okText="Save"
      >
        <div className="flex flex-col gap-4">
          <Input
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <Input.TextArea
            placeholder="Description"
            value={form.desc}
            onChange={(e) => setForm({ ...form, desc: e.target.value })}
          />
        </div>
      </Modal>
    </div>
  );
}

export default BlogManage;
