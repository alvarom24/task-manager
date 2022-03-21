import React from "react";
import { Spin } from "antd";

export function Spinner(): React.ReactElement {
  return (
    <div className="spinner-container">
      <Spin />
    </div>
  );
}
