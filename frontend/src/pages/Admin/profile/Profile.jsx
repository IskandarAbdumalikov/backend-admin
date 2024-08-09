import React, { useEffect, useState } from "react";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useResetPasswordMutation,
} from "../../../context/api/userApi";
import { Modal, Button, Input, message, Select, Switch } from "antd";

const Profile = () => {
  const { data, refetch } = useGetProfileQuery();
  const [updateProfile] = useUpdateProfileMutation();
  const [resetPassword] = useResetPasswordMutation();

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isResetModalVisible, setIsResetModalVisible] = useState(false);
  const [form, setForm] = useState({
    fname: "",
    lname: "",
    age: "",
    budget: "",
    username: "",
    gender: "",
    isActive: false,
    url: "",
    password: "",
    newPassword: "",
  });

  useEffect(() => {
    if (data?.payload) {
      setForm({
        fname: data.payload.fname || "",
        lname: data.payload.lname || "",
        age: data.payload.age || "",
        budget: data.payload.budget || "",
        username: data.payload.username || "",
        gender: data.payload.gender || "",
        isActive: data.payload.isActive || false,
        url: data.payload.url || "",
        password: "",
        newPassword: "",
      });
    }
  }, [data]);

  const handleUpdateProfile = async () => {
    try {
      await updateProfile({ id: data.payload._id, body: form });
      message.success("Profile updated successfully");
      setIsEditModalVisible(false);
      refetch();
    } catch (err) {
      message.error("Failed to update profile");
    }
  };

  const handleResetPassword = async () => {
    try {
      await resetPassword({
        password: form.password,
        newPassword: form.newPassword,
      });
      message.success("Password reset successfully");
      setIsResetModalVisible(false);
      setForm({ ...form, password: "", newPassword: "" });
    } catch (err) {
      message.error("Failed to reset password");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen pt-[100px]">
      <div className="max-w-[1000px] mx-auto bg-white p-6 rounded-lg shadow-md flex">
        <div className="flex-shrink-0 w-1/2 flex justify-center items-center">
          <img
            src={
              form.url ||
              "https://static.vecteezy.com/system/resources/previews/024/983/914/original/simple-user-default-icon-free-png.png"
            }
            alt="Profile"
            className="w-48 h-48 rounded-full object-cover"
          />
        </div>

        <div className="ml-6 w-1/2">
          <h2 className="text-2xl font-bold mb-4">Profile</h2>
          <div className="mb-6">
            <p className="text-lg font-semibold">
              Name: {form.fname} {form.lname}
            </p>
            <p className="text-lg font-semibold">Username: {form.username}</p>
           
            <p className="text-lg font-semibold">Age: {form.age}</p>
            <p className="text-lg font-semibold">Budget: {form.budget}</p>
            <p className="text-lg font-semibold">Gender: {form.gender}</p>
            <p className="text-lg font-semibold">
              Active: {form.isActive ? "Yes" : "No"}
            </p>
          </div>
          <div className="flex gap-4">
            <Button
              type="primary"
              onClick={() => setIsEditModalVisible(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              Edit Profile
            </Button>
            <Button
              type="default"
              onClick={() => setIsResetModalVisible(true)}
              className="bg-gray-500 hover:bg-gray-600 text-white"
            >
              Reset Password
            </Button>
          </div>
        </div>

        <Modal
          title="Edit Profile"
          visible={isEditModalVisible}
          onOk={handleUpdateProfile}
          onCancel={() => setIsEditModalVisible(false)}
          okText="Save"
        >
          <div className="flex flex-col gap-4">
            <Input
              placeholder="First Name"
              value={form.fname}
              onChange={(e) => setForm({ ...form, fname: e.target.value })}
            />
            <Input
              placeholder="Last Name"
              value={form.lname}
              onChange={(e) => setForm({ ...form, lname: e.target.value })}
            />
            <Input
              placeholder="Age"
              type="number"
              value={form.age}
              onChange={(e) => setForm({ ...form, age: e.target.value })}
            />
            <Input
              placeholder="Budget"
              type="number"
              value={form.budget}
              onChange={(e) => setForm({ ...form, budget: e.target.value })}
            />
            
            <Input
              placeholder="Username"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            />
            <Select
              placeholder="Gender"
              value={form.gender}
              onChange={(value) => setForm({ ...form, gender: value })}
            >
              <Select.Option value="male">Male</Select.Option>
              <Select.Option value="female">Female</Select.Option>
              <Select.Option value="other">Other</Select.Option>
            </Select>
            <div className="flex items-center">
              <span className="mr-2">Active:</span>
              <Switch
                checked={form.isActive}
                onChange={(checked) => setForm({ ...form, isActive: checked })}
              />
            </div>
            <Input
              placeholder="Profile URL"
              value={form.url}
              onChange={(e) => setForm({ ...form, url: e.target.value })}
            />
          </div>
        </Modal>

        <Modal
          title="Reset Password"
          visible={isResetModalVisible}
          onOk={handleResetPassword}
          onCancel={() => setIsResetModalVisible(false)}
          okText="Reset"
        >
          <div className="flex flex-col gap-4">
            <Input.Password
              placeholder="Current Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <Input.Password
              placeholder="New Password"
              value={form.newPassword}
              onChange={(e) =>
                setForm({ ...form, newPassword: e.target.value })
              }
            />
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Profile;
