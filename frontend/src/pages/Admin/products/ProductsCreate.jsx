import React, { useState } from "react";
import { Input, Select, Button, Form, message, Upload } from "antd";
import { useCreateProductMutation } from "../../../context/api/productApi";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const ProductsCreate = () => {
  const [createProduct] = useCreateProductMutation();
  let navigate = useNavigate();
  const [newProduct, setNewProduct] = useState({
    title: "",
    desc: "",
    price: 0,
    oldPrice: 0,
    stock: 0,
    category: "",
    available: true,
    rating: 0,
    info: ["info 1",'info 2'],
    urls: [],
  });
  const [fileList, setFileList] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "info") {
      const infoArray = value?.split(",")?.map((item) => item.trim());
      setNewProduct({ ...newProduct, [name]: infoArray });
    } else {
      setNewProduct({ ...newProduct, [name]: value });
    }
  };

  const handleFileChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      fileList.forEach((file) => formData.append("files", file.originFileObj));

      Object.keys(newProduct).forEach((key) => {
        if (Array.isArray(newProduct[key])) {
          newProduct[key].forEach((value) => formData.append(key, value));
        } else {
          formData.append(key, newProduct[key]);
        }
      });

      await createProduct(formData).unwrap();

      message.success("Product created successfully!");
      setNewProduct({
        title: "",
        desc: "",
        price: 0,
        oldPrice: 0,
        stock: 0,
        category: "",
        available: true,
        rating: 0,
        info: [],
        urls: [],
      });
      setFileList([]);
      navigate("/admin/productsManage");
    } catch (error) {
      message.error("Failed to create product.");
    }
  };

  return (
    <div className="p-6 mt-[150px] bg-white shadow-md rounded-lg max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Create Product</h2>
      <Form layout="vertical" className="grid grid-cols-2 gap-[20px]">
        <Form.Item label="Title">
          <Input
            name="title"
            value={newProduct.title}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Description">
          <Input.TextArea
            name="desc"
            value={newProduct.desc}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Information">
          <Input.TextArea
            name="info"
            value={newProduct.info.join(", ")}
            onChange={handleChange}
            
          />
        </Form.Item>
        <Form.Item label="Price">
          <Input
            type="number"
            name="price"
            value={newProduct.price}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Old Price">
          <Input
            type="number"
            name="oldPrice"
            value={newProduct.oldPrice}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Stock">
          <Input
            type="number"
            name="stock"
            value={newProduct.stock}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Category">
          <Input
            name="category"
            value={newProduct.category}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Rating">
          <Input
            type="number"
            name="rating"
            value={newProduct.rating}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Available">
          <Select
            name="available"
            value={newProduct.available}
            onChange={(value) =>
              setNewProduct({ ...newProduct, available: value })
            }
          >
            <Option value={true}>Yes</Option>
            <Option value={false}>No</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Upload Images">
          <Upload
            listType="picture"
            multiple
            beforeUpload={() => false}
            onChange={handleFileChange}
            fileList={fileList}
          >
            <Button icon={<UploadOutlined />}>Select Files</Button>
          </Upload>
        </Form.Item>
        <Button type="primary" onClick={handleSave}>
          Create Product
        </Button>
      </Form>
    </div>
  );
};

export default ProductsCreate;
