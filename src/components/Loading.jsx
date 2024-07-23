import React from "react";

const Loading = ({ isLoading }) => {
  return isLoading ? (
    <div id="loading" className="loading">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  ) : null;
};

export default Loading;
