import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const EmployeeList = () => {
  const [empdata, empdatachange] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8000/employee")
      .then((res) => {
        empdatachange(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  return (
    <div className="container">
      <div className="card">
        <div className="card-title">
          <h2>Employee List</h2>
        </div>
        <div className="card-body">
          <div className="divbtn">
            <Link to="employee/create" className="btn btn-success">
              Add Employee (+)
            </Link>
          </div>
          <table className="table table-bordered">
            <thead className="bg-dark text-white">
              <tr>
                <td>Name</td>
                <td>Email</td>
                <td>Phone</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {empdata &&
                empdata.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>
                      <a className="btn btn-success">Details</a>
                      <a className="btn btn-primary">Block</a>
                      <a className="btn btn-danger">Delete</a>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
