import React from "react";
import { Link } from "react-router-dom";

export const Card = () => {
  return (
    <div className="card">
      <img src={""} className="card-img-top" alt={""}></img>
      <div className="card-body">
        <h5 className="card-title">Card title</h5>
        <Link to={"/profile/" + "react"} className="btn btn-primary">
          Открыть
        </Link>
      </div>
    </div>
  );
};
