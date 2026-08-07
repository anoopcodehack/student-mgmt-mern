import React, { useState } from "react";

export default function StudentList({ students, search, setSearch, onEdit, onDelete }) {
  const [confirmId, setConfirmId] = useState(null);

  const handleDeleteClick = (id) => {
    if (confirmId === id) {
      onDelete(id);
      setConfirmId(null);
    } else {
      setConfirmId(id);
    }
  };

  return (
    <div className="panel">
      <h2>Student List</h2>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name, roll no, email, or course..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search && (
          <button className="btn btn-black btn-sm" onClick={() => setSearch("")}>
            Clear
          </button>
        )}
      </div>

      {students.length === 0 ? (
        <div className="empty-state">No matching students found.</div>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Roll No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Course</th>
                <th>Year</th>
                <th>Grade</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s._id}>
                  <td>{s.rollNo}</td>
                  <td>{s.name}</td>
                  <td>{s.email}</td>
                  <td>{s.course}</td>
                  <td>
                    <span className="badge">Y{s.year}</span>
                  </td>
                  <td>{s.grade || "N/A"}</td>
                  <td>
                    <div className="actions">
                      <button className="btn btn-sm" onClick={() => onEdit(s)}>
                        Edit
                      </button>
                      <button
                        className="btn btn-red btn-sm"
                        onClick={() => handleDeleteClick(s._id)}
                      >
                        {confirmId === s._id ? "Confirm?" : "Delete"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
