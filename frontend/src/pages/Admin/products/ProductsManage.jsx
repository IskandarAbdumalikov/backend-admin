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
  useDeleteProductMutation,
  useGetProductsBySearchQuery,
  useGetProductsQuery,
  useUpdateProductMutation,
} from "../../../context/api/productApi";
import UpdateProductModal from "../../../components/updateProductModal/UpdateProductModal.jsx";

const ProductsManage = () => {
  const [search, setSearch] = useState("");
  const {
    data: products,
    isLoading: productsLoading,
    refetch,
  } = useGetProductsQuery();
  const {
    data: searchData,
    isLoading: searchLoading,
    refetch: refetchSearch,
  } = useGetProductsBySearchQuery({ value: search }, { skip: !search });
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleUpdate = (product) => {
    setSelectedProduct(product);
  };

  useEffect(() => {
    if (search.trim().length === 0) {
      refetch();
    } else {
      refetchSearch();
    }
  }, [search, refetch, refetchSearch]);

  const handleDelete = (id) => {
    deleteProduct(id);
  };

  const handleSave = async (updatedProduct) => {
    await updateProduct({ id: selectedProduct._id, body: updatedProduct });
    setSelectedProduct(null);
  };

  const productsToRender = search.trim().length > 0 ? searchData : products;
  console.log(selectedProduct);

  const columns = [
    {
      title: "Image",
      dataIndex: "urls",
      key: "urls",
      render: (urls) => <Avatar src={urls && urls.length > 0 ? urls[0] : ""} />,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Available",
      dataIndex: "available",
      key: "available",
      render: (available) => (
        <span style={{ color: available ? "green" : "red" }}>
          {available ? "Available" : "Unavailable"}
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
            title="Are you sure you want to delete this product?"
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
      <h2 className="text-2xl font-bold mb-4">Product Management</h2>
      <Input
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4"
      />
      {productsLoading || searchLoading ? (
        <Skeleton active />
      ) : (
        <Table
          columns={columns}
          dataSource={productsToRender?.payload}
          rowKey={(record) => record._id}
        />
      )}
      {selectedProduct && (
        <UpdateProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default ProductsManage;
