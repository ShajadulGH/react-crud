import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const EmployeeList = () => {
  const [empdata, empdatachange] = useState(null);
  const navigate = useNavigate();
  const LoadDetails = (id) => {
    navigate("/employee/details/" + id);
  };
  const BlockUpdate = (id, firstName, lastName, email, phone, blockedInfo) => {
    const blocked = !blockedInfo;
    const updateEmpData = { id, firstName, lastName, email, phone, blocked };
    axios
      .put(`http://localhost:8000/employee/${id}`, updateEmpData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        // alert("Successfully blocked employee");
        // navigate("/");
      })
      .catch((err) => {
        console.log(err.message);
      });
    empdatachange(
      empdata.map((item) => {
        if (item.id === id) {
          return { ...item, blocked: !item.blocked };
        }
        return item;
      })
    );
  };
  const RemoveItem = (id) => {
    if (window.confirm("Do you want to remove?")) {
      axios
        .delete(`http://localhost:8000/employee/${id}`)
        .then((res) => {
          // alert("Removed successfully.");
        })
        .catch((err) => {
          console.log(err.message);
        });
      var newEmpData = empdata.filter((item) => {
        return item.id !== id;
      });
      empdatachange(newEmpData);
    }
  };

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
        <div className="card-body table-responsive">
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
                    <td>{`${item.firstName} ${item.lastName}`}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>
                      <a
                        onClick={() => {
                          LoadDetails(item.id);
                        }}
                        className="btn btn-success"
                      >
                        Details
                      </a>
                      <a
                        onClick={() => {
                          BlockUpdate(
                            item.id,
                            item.firstName,
                            item.lastName,
                            item.email,
                            item.phone,
                            item.blocked
                          );
                        }}
                        className="btn btn-primary"
                      >
                        {item.blocked ? "Unblock" : "Block"}
                      </a>
                      <a
                        onClick={() => {
                          RemoveItem(item.id);
                        }}
                        className="btn btn-danger"
                      >
                        Delete
                      </a>
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
