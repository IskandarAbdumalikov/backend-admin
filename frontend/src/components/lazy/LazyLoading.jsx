import React, { memo } from "react";
import "./lazyLoading.scss";

const LazyLoading = () => {
  return (
    <div className="loader">
      <div className="spinner"></div>
    </div>
  );
};

export default memo(LazyLoading);
