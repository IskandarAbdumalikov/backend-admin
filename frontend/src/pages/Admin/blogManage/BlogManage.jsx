import React, { useState } from "react";
import {
  useDeleteBlogMutation,
  useGetBlogsQuery,
  useUpdateBlogMutation,
} from "../../../context/api/blogApi";
import { Modal, Button, Input, message, Card, Col, Row } from "antd";

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
      await editBlog({ id: currentBlog._id, body: form });
      message.success("Blog updated successfully");
      setIsModalVisible(false);
    } catch {
      message.error("Failed to update blog");
    }
  };

  return (
    <div className="pt-24 pl-10 pr-[50px]">
      <Row gutter={[16, 16]}>
        {data?.payload.map((item) => (
          <Col key={item._id} xs={24} sm={12} md={8} lg={6}>
            <Card
              title={item.title}
              bordered={false}
              actions={[
                <Button type="primary" onClick={() => showEditModal(item)}>
                  Edit
                </Button>,
                <Button
                  type="danger"
                  style={{ color: "red" }}
                  onClick={() => showDeleteConfirm(item._id)}
                >
                  Delete
                </Button>,
              ]}
            >
              <p>{item.desc}</p>
              <p style={{ marginTop: "10px" }}>Made by :  {item?.userId?.fname}</p>
            </Card>
          </Col>
        ))}
      </Row>

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
