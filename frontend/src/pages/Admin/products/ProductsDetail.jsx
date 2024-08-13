import React from "react";
import { Card, Button, Descriptions } from "antd";
import { useGetProductByIdQuery } from "../../../context/api/productApi";
import { useParams } from "react-router-dom";

const ProductsDetail = () => {
  const { id } = useParams();
  const { data: product, error, isLoading } = useGetProductByIdQuery(id);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching product details.</p>;

  return (
    <Card
      title={product?.title}
      extra={<Button type="primary">Edit Product</Button>}
    >
      <Descriptions>
        <Descriptions.Item label="Description">
          {product?.desc}
        </Descriptions.Item>
        <Descriptions.Item label="Price">${product?.price}</Descriptions.Item>
        <Descriptions.Item label="Old Price">
          ${product?.oldPrice}
        </Descriptions.Item>
        <Descriptions.Item label="Stock">{product?.stock}</Descriptions.Item>
        <Descriptions.Item label="Category">
          {product?.category}
        </Descriptions.Item>
        <Descriptions.Item label="Available">
          {product?.available ? "Yes" : "No"}
        </Descriptions.Item>
        <Descriptions.Item label="Rating">{product?.rating}</Descriptions.Item>
      </Descriptions>
      <div>
        {product?.urls.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`product-image-${index}`}
            style={{ width: "100px", margin: "5px" }}
          />
        ))}
      </div>
    </Card>
  );
};

export default ProductsDetail;
