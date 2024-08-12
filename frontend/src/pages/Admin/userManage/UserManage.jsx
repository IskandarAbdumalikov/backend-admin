import React, { useEffect, useState } from "react";
import {
  Table,
  Input,
  Button,
  Space,
  Avatar,
  Popconfirm,
  Skeleton,
} from "antd";
import {
  useDeleteUserMutation,
  useGetUsersBySearchQuery,
  useGetUsersQuery,
  useUpdateUserMutation,
} from "../../../context/api/userApi";
import UpdateUserModal from "../../../components/updateUserModal/UpdateUserModal";

const UserManage = () => {
  const [search, setSearch] = useState("");
  const { data: users, isLoading: usersLoading, refetch } = useGetUsersQuery();
  const {
    data: searchData,
    isLoading: searchLoading,
    refetch: refetchSearch,
  } = useGetUsersBySearchQuery({ value: search }, { skip: !search });
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [selectedUser, setSelectedUser] = useState(null);

  const handleUpdate = (user) => {
    setSelectedUser(user);
  };

  useEffect(() => {
    if (search.trim().length === 0) {
      refetch();
    } else {
      refetchSearch();
    }
  }, [search, refetch, refetchSearch]);

  const handleDelete = (id) => {
    deleteUser(id);
  };

  const handleSave = async (updatedUser) => {
    await updateUser({ id: updatedUser._id, body: updatedUser });
    setSelectedUser(null);
  };

  const usersToRender = search.trim().length > 0 ? searchData : users;

  const columns = [
    {
      title: "Avatar",
      dataIndex: "url",
      key: "url",
      render: (url) => <Avatar src={url} />,
    },
    {
      title: "First Name",
      dataIndex: "fname",
      key: "fname",
    },
    {
      title: "Last Name",
      dataIndex: "lname",
      key: "lname",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive) => (
        <span style={{ color: isActive ? "green" : "red" }}>
          {isActive ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleUpdate(record)}>
            Update
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this user?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="danger" style={{ color: "red" }}>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">User Management</h2>
      <Input
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4"
      />
      {usersLoading || searchLoading ? (
        <Skeleton active />
      ) : (
        <Table
          columns={columns}
          dataSource={usersToRender?.payload}
          rowKey={(record) => record._id}
        />
      )}
      {selectedUser && (
        <UpdateUserModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default UserManage;
