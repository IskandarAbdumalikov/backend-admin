import React, { memo } from "react";
import "./lazyLoading.scss";
import { Spin } from "antd";

const LazyLoading = () => {
  return (
    <div className="loader">
      <Spin size="large"/>
    </div>
  );
};

export default memo(LazyLoading);
