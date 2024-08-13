import React, { useState } from "react";
import { Modal, Input, Select, Button, Form } from "antd";

const { Option } = Select;

const UpdateProductModal = ({ product, onClose, onSave }) => {
  const [updateProduct, setUpdateProduct] = useState(product);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateProduct({ ...updateProduct, [name]: value });
  };

  const handleSave = () => {
    const { userId, __v, _id, createdAt, updatedAt, ...productToUpdate } =
      updateProduct;
    onSave(productToUpdate);
  };

  if (!product) return null;

  return (
    <Modal
      title="Update Product"
      visible={true}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="save" type="primary" onClick={handleSave}>
          Save
        </Button>,
      ]}
    >
      <Form className="grid grid-cols-2 gap-[20px]" layout="vertical">
        <Form.Item label="Title">
          <Input
            name="title"
            value={updateProduct.title}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Price">
          <Input
            type="number"
            name="price"
            value={updateProduct.price}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Old Price">
          <Input
            type="number"
            name="oldPrice"
            value={updateProduct.oldPrice}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Stock">
          <Input
            type="number"
            name="stock"
            value={updateProduct.stock}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Category">
          <Input
            name="category"
            value={updateProduct.category}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Description">
          <Input.TextArea
            name="desc"
            value={updateProduct.desc}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Rating">
          <Select
            name="rating"
            value={updateProduct.rating}
            onChange={(value) =>
              setUpdateProduct({ ...updateProduct, rating: value })
            }
          >
            {[0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].map((rating) => (
              <Option key={rating} value={rating}>
                {rating}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Available">
          <Select
            name="available"
            value={updateProduct.available}
            onChange={(value) =>
              setUpdateProduct({ ...updateProduct, available: value })
            }
          >
            <Option value={true}>Available</Option>
            <Option value={false}>Unavailable</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Images (URLs)">
          <Input
            name="urls"
            value={updateProduct.urls?.join(", ")}
            onChange={(e) =>
              setUpdateProduct({
                ...updateProduct,
                urls: e.target.value.split(",").map((url) => url.trim()),
              })
            }
          />
        </Form.Item>
        <Form.Item label="Info">
          <Input.TextArea
            name="info"
            value={updateProduct.info?.join(", ")}
            onChange={(e) =>
              setUpdateProduct({
                ...updateProduct,
                info: e.target.value.split(",").map((info) => info.trim()),
              })
            }
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateProductModal;
