import React from "react";
import { Modal, Input, Select, Button, Form } from "antd";

const { Option } = Select;

const UpdateUserModal = ({ user, onClose, onSave }) => {
  const [updatedUser, setUpdatedUser] = React.useState(user);

  const handleChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onSave(updatedUser);
  };

  if (!user) return null;

  return (
    <Modal
      title="Update User"
      visible={true}
      onCancel={onClose}
      className=""
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="save" type="primary" onClick={handleSave}>
          Save
        </Button>,
      ]}
    >
      <Form layout="vertical" className="grid grid-cols-2 gap-[30px]">
        <Form.Item label="First Name">
          <Input
            name="fname"
            value={updatedUser.fname}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Last Name">
          <Input
            name="lname"
            value={updatedUser.lname}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Url">
          <Input
            name="url"
            value={updatedUser.url}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Username">
          <Input
            name="username"
            value={updatedUser.username}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Age">
          <Input
            type="number"
            name="age"
            value={updatedUser.age}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Budget">
          <Input
            type="number"
            name="budget"
            value={updatedUser.budget}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Gender">
          <Select
            name="gender"
            value={updatedUser.gender}
            onChange={(value) =>
              setUpdatedUser({ ...updatedUser, gender: value })
            }
          >
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Status">
          <Select
            name="isActive"
            value={updatedUser.isActive}
            onChange={(value) =>
              setUpdatedUser({ ...updatedUser, isActive: value })
            }
          >
            <Option value={true}>Active</Option>
            <Option value={false}>Inactive</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Role">
          <Select
            name="role"
            value={updatedUser.role}
            onChange={(value) =>
              setUpdatedUser({ ...updatedUser, role: value })
            }
          >
            <Option value="admin">Admin</Option>
            <Option value="user">User</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateUserModal;
