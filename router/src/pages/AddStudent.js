import React, { useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddStudent() {
    const navigate=useNavigate();
  const [studentNo, setStudentNo] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [schoolName, setSchoolName] = useState("");

  const handleFormSave = (event) => {
    event.preventDefault();
    if (
      studentNo === "" ||
      name === "" ||
      surname === "" ||
      studentClass === "" ||
      schoolName === ""
    ) {
      alert("fill all inputs");
      return;
    }
    const newStudent = {
      id: String(new Date().getTime()),
      name: name,
      surname: surname,
      studentNo: studentNo,
      studentClass: studentClass,
      schoolName: schoolName,
    };
    axios.post("http://localhost:4000/students", newStudent)
    .then((response)=>{
        navigate("/")
    })
    .catch((error)=>{
        console.log(error);
        alert("an error occured")
    })
  };

  return (
    <div>
      <Header />
      <div className="container mt-5">
        <form onSubmit={handleFormSave}>
          <div className="mb-3">
            <label htmlFor="studentNo" className="form-label">
              Student No
            </label>
            <input
              type="number"
              placeholder="100"
              className="form-control"
              id="studentNo"
              value={studentNo}
              onChange={(event) => setStudentNo(event.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              placeholder="Karl"
              className="form-control"
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="surmane" className="form-label">
              Surname
            </label>
            <input
              type="text"
              placeholder="Marx"
              className="form-control"
              id="surname"
              value={surname}
              onChange={(event) => setSurname(event.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="studentClass" className="form-label">
              Class
            </label>
            <input
              type="text"
              placeholder="9/A"
              className="form-control"
              id="studentClass"
              value={studentClass}
              onChange={(event) => setStudentClass(event.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="schoolName" className="form-label">
              School Name
            </label>
            <input
              type="text"
              placeholder="CBU"
              className="form-control"
              id="schoolName"
              value={schoolName}
              onChange={(event) => setSchoolName(event.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-lg btn-outline-primary">
            ADD
          </button>
        </form>
      </div>
    </div>
  );
}
export default AddStudent;
