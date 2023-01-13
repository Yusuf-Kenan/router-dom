import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ListStudents({ students, setStudents }) {
  const handleDelete = (student) => {
    axios
      .delete(`http://localhost:4000/students/${student.id}`)
      .then((res) => {
        const filteredStudents = students.filter(
          (item) => item.id !== student.id
        );
        setStudents(filteredStudents);
      })
      .catch((err) => {
        console.log(err);
        alert("an error occured");
      });
  };

  return (
    <div className="container ">
      {students.length === 0 ? (
        <div className="d-flex justify-content-center">
          <h1>There is nothing to print</h1>
        </div>
      ) : (
        <table className="table table-stripe">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">No</th>
              <th scope="col">Name</th>
              <th scope="col">Surname</th>
              <th scope="col">Class</th>
              <th scope="col">School </th>
              <th scope="col">Options </th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{student.studentNo}</td>
                <td>{student.name}</td>
                <td>{student.surname}</td>
                <td>{student.studentClass}</td>
                <td>{student.schoolName}</td>
                <td>
                  <div
                    className="btn-group"
                    role="group"
                    aria-label="Basic example"
                  >
                    <button
                      onClick={() => handleDelete(student)}
                      type="button"
                      className="btn btn-sm btn-outline-danger"
                    >
                      DLT
                    </button>
                    <Link
                        to={`/edit-student/${student.id}`}
                      type="button"
                      className="btn btn-sm btn-outline-warning"
                    >
                      EDIT
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
export default ListStudents;
