import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <>
      <div className="grid-center">
        <div>
          <h1 className="text-danger">Page not found</h1>
          <Link to="/" className="btn bg-warning error-item">
            Back to Home
          </Link>
        </div>
      </div>
    </>
  );
};

export default Error;
