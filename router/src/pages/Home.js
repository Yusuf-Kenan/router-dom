import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import ListStudents from "../components/ListStudents";

function Home() {
  const [students, setStudents] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:4000/students")
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {});
  }, []);

  if (students === null) {
    return null;
  }

  return (
    <div>
      <Header />
      <div className=" container mt-5 d-flex justify-content-end">
        <button
          onClick={() => navigate("/add-student")}
          className="btn btn-outline-warning"
        >
          New Student
        </button>
      </div>
      <ListStudents students={students} setStudents={setStudents}/>
    </div>
  );
}
export default Home;
