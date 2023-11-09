import React from "react";

const CustomEdgeComponent = ({ data }) => {
  console.log("data label edge: ", data.label);
  return (
    <div className="custom-edge">
      <p>{data.label}</p>
    </div>
  );
};

export default CustomEdgeComponent;
