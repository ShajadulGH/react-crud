import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const EmployeeCreate = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, emailchange] = useState("");
  const [phone, phonechange] = useState("");
  const [validation, valchange] = useState(false);

  const navigate = useNavigate();

  const handlesubmit = (e) => {
    e.preventDefault();
    const blocked = false;
    const empdata = { firstName, lastName, email, phone, blocked };

    axios
      .post("http://localhost:8000/employee", empdata, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        alert("Saved successfully.");
        navigate("/");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div>
      <div className="row">
        <div className="offset-lg-3 col-lg-6">
          <form className="container" onSubmit={handlesubmit}>
            <div className="card" style={{ textAlign: "left" }}>
              <div className="card-title">
                <h2>Employee Create</h2>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>First Name</label>
                      <input
                        required
                        value={firstName}
                        onMouseDown={(e) => valchange(true)}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="form-control"
                      ></input>
                      {firstName.length == 0 && validation && (
                        <span className="text-danger">Enter first name</span>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Last Name</label>
                      <input
                        required
                        value={lastName}
                        onMouseDown={(e) => valchange(true)}
                        onChange={(e) => setLastName(e.target.value)}
                        className="form-control"
                      ></input>
                      {lastName.length == 0 && validation && (
                        <span className="text-danger">Enter last name</span>
                      )}
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        value={email}
                        onChange={(e) => emailchange(e.target.value)}
                        className="form-control"
                      ></input>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Phone</label>
                      <input
                        value={phone}
                        onChange={(e) => phonechange(e.target.value)}
                        className="form-control"
                      ></input>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <button className="btn btn-success" type="submit">
                        Save
                      </button>
                      <Link to="/" className="btn btn-danger">
                        Back
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCreate;
