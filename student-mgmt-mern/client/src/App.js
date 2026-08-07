import React, { useCallback, useEffect, useState } from "react";
import Dashboard from "./components/Dashboard";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import { getStudents, addStudent, updateStudent, deleteStudent } from "./api";

export default function App() {
  const [tab, setTab] = useState("dashboard");
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [editingStudent, setEditingStudent] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState("");

  const fetchStudents = useCallback(async (searchTerm = "") => {
    try {
      setLoading(true);
      const res = await getStudents(searchTerm);
      setStudents(res.data.data);
      setApiError("");
    } catch (err) {
      setApiError(
        "Could not reach the server. Make sure the backend is running on the configured API URL."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchStudents(search);
    }, 300);
    return () => clearTimeout(delay);
  }, [search, fetchStudents]);

  const flash = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(null), 2500);
  };

  const handleAddOrUpdate = async (data) => {
    if (editingStudent) {
      await updateStudent(editingStudent._id, data);
      flash("Student updated successfully.");
      setEditingStudent(null);
    } else {
      await addStudent(data);
      flash("Student added successfully.");
    }
    await fetchStudents(search);
    setTab("list");
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
    setTab("add");
  };

  const handleDelete = async (id) => {
    await deleteStudent(id);
    flash("Student deleted.");
    fetchStudents(search);
  };

  const handleNavigate = (t) => {
    if (t !== "add") setEditingStudent(null);
    setTab(t);
  };

  return (
    <div className="app-shell">
      <header className="header">
        <h1>
          STUDENT<span>MGMT</span>SYS
        </h1>
        <nav className="nav-tabs">
          <button
            className={tab === "dashboard" ? "active" : ""}
            onClick={() => handleNavigate("dashboard")}
          >
            Dashboard
          </button>
          <button
            className={tab === "add" ? "active" : ""}
            onClick={() => handleNavigate("add")}
          >
            {editingStudent ? "Editing" : "Add Student"}
          </button>
          <button
            className={tab === "list" ? "active" : ""}
            onClick={() => handleNavigate("list")}
          >
            Student List
          </button>
        </nav>
      </header>

      <main className="main">
        {apiError && <div className="alert alert-error">{apiError}</div>}
        {message && <div className="alert alert-success">{message}</div>}

        {loading && !students.length && !apiError ? (
          <div className="panel">Loading students...</div>
        ) : (
          <>
            {tab === "dashboard" && (
              <Dashboard students={students} onNavigate={handleNavigate} />
            )}
            {tab === "add" && (
              <StudentForm
                editingStudent={editingStudent}
                onSubmit={handleAddOrUpdate}
                onCancel={() => {
                  setEditingStudent(null);
                  setTab("list");
                }}
              />
            )}
            {tab === "list" && (
              <StudentList
                students={students}
                search={search}
                setSearch={setSearch}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            )}
          </>
        )}
      </main>

      <footer className="footer">
        MERN Student Management System — Built for Chand Web Technology Internship
      </footer>
    </div>
  );
}