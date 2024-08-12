import React, { useEffect } from "react";
import { useRegisterUserMutation } from "../../../context/api/userApi";
import { useNavigate } from "react-router-dom";
import {
  Form,
  Input,
  Button,
  Select,
  Switch,
  InputNumber,
  message,
} from "antd";

const { Option } = Select;

function UserCreate() {
  const [form] = Form.useForm();
  const [createUser, { isLoading, isSuccess, isError }] =
    useRegisterUserMutation();
  let navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
      message.success("User created successfully");
      navigate("/admin/userManage");
    }
    if (isError) {
      message.error("Something went wrong");
    }
  }, [isSuccess, isError, form, navigate]);

  const handleCreate = async (values) => {
    try {
      await createUser(values);
    } catch (error) {
      message.error("Something went wrong");
    }
  };

  const handleCancel = () => {
    form.resetFields();
    navigate("/admin/userManage");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Create New User</h2>
        <Form
          form={form}
          layout="vertical"
          className="grid grid-cols-2 gap-6"
          onFinish={handleCreate}
          initialValues={{
            fname: "",
            lname: "",
            password: "",
            username: "",
            age: null,
            url: "",
            gender: "",
            budget: null,
            isActive: false,
          }}
        >
          <Form.Item
            name="fname"
            label="First Name"
            rules={[{ required: true, message: "Please enter first name" }]}
          >
            <Input placeholder="First Name" />
          </Form.Item>
          <Form.Item
            name="lname"
            label="Last Name"
            rules={[{ required: true, message: "Please enter last name" }]}
          >
            <Input placeholder="Last Name" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please enter password" }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: "Please enter username" }]}
          >
            <Input placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="age"
            label="Age"
            rules={[{ required: true, message: "Please enter age" }]}
          >
            <InputNumber
              placeholder="Age"
              min={0}
              max={120}
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item
            name="url"
            label="Profile URL"
            rules={[{ required: true, message: "Please enter profile URL" }]}
          >
            <Input placeholder="Profile URL" />
          </Form.Item>
          <Form.Item
            name="gender"
            label="Gender"
            rules={[{ required: true, message: "Please select gender" }]}
          >
            <Select placeholder="Gender">
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="budget"
            label="Budget"
            rules={[{ required: true, message: "Please enter budget" }]}
          >
            <InputNumber
              placeholder="Budget"
              min={0}
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item
            name="isActive"
            label="Active"
            valuePropName="checked"
            rules={[{ required: true, message: "Please select active status" }]}
          >
            <Switch />
          </Form.Item>
          <Form.Item>
            <div className="flex justify-between gap-4 mt-6">
              <Button onClick={handleCancel} type="default" block>
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={isLoading}
                block
              >
                {isLoading ? "Creating..." : "Create"}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default UserCreate;
