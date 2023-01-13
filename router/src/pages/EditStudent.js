import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function EditStudent() {
  const { studentId } = useParams();
  const navigate = useNavigate();

  const [willEdit, setWillEdit] = useState("");
  const [studentNo, setStudentNo] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [schoolName, setSchoolName] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:4000/students/${studentId}`)
      .then((res) => {
        setWillEdit(res.data);
        setStudentNo(res.data.studentNo);
        setName(res.data.name);
        setSurname(res.data.surname);
        setStudentClass(res.data.studentClass);
        setSchoolName(res.data.schoolName);
      })
      .catch((err) => {
        console.log(err);
        alert("An Error Occured");
        navigate("/");
      });
  }, []);

  const handleFormEdit = (event) => {
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
    const updatedStudent={
        id:willEdit.id,
        studentNo:studentNo,
        name:name,
        surname:surname,
        studentClass:studentClass,
        schoolName:schoolName
    }
    axios.put(`http://localhost:4000/students/${willEdit.id}`,updatedStudent)
    .then((res)=>{
        navigate("/")
    })
    .catch((err)=>{
        console.log(err)
    })
  };

  if (willEdit === null) {
    return null;
  }
  return (
    <div>
      <Header />
      <div className="container">
        <form onSubmit={handleFormEdit}>
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
            SAVE
          </button>
        </form>
      </div>
      ;
    </div>
  );
}
