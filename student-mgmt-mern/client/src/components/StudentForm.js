import React, { useEffect, useState } from "react";

const EMPTY = {
  name: "",
  rollNo: "",
  email: "",
  phone: "",
  course: "",
  year: 1,
  grade: "",
  address: "",
};

export default function StudentForm({ editingStudent, onSubmit, onCancel }) {
  const [form, setForm] = useState(EMPTY);
  const [error, setError] = useState("");

  useEffect(() => {
    if (editingStudent) {
      setForm({ ...EMPTY, ...editingStudent });
    } else {
      setForm(EMPTY);
    }
    setError("");
  }, [editingStudent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.rollNo || !form.email || !form.course || !form.year) {
      setError("Please fill all required fields (Name, Roll No, Email, Course, Year).");
      return;
    }

    try {
      await onSubmit({ ...form, year: Number(form.year) });
      setForm(EMPTY);
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong. Try again.");
    }
  };

  return (
    <div className="panel">
      <h2>{editingStudent ? "Edit Student" : "Add Student"}</h2>
      {error && <div className="alert alert-error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div>
            <label>Full Name *</label>
            <input name="name" value={form.name} onChange={handleChange} placeholder="Anoop Kumar" />
          </div>
          <div>
            <label>Roll No *</label>
            <input name="rollNo" value={form.rollNo} onChange={handleChange} placeholder="4SF22CS001" />
          </div>
          <div>
            <label>Email *</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="student@college.edu" />
          </div>
          <div>
            <label>Phone</label>
            <input name="phone" value={form.phone} onChange={handleChange} placeholder="9876543210" />
          </div>
          <div>
            <label>Course *</label>
            <input name="course" value={form.course} onChange={handleChange} placeholder="Computer Science" />
          </div>
          <div>
            <label>Year *</label>
            <select name="year" value={form.year} onChange={handleChange}>
              <option value={1}>1st Year</option>
              <option value={2}>2nd Year</option>
              <option value={3}>3rd Year</option>
              <option value={4}>4th Year</option>
              <option value={5}>5th Year</option>
            </select>
          </div>
          <div>
            <label>Grade</label>
            <input name="grade" value={form.grade} onChange={handleChange} placeholder="A / B / CGPA" />
          </div>
          <div>
            <label>Address</label>
            <input name="address" value={form.address} onChange={handleChange} placeholder="City, State" />
          </div>
        </div>

        <div style={{ marginTop: 20, display: "flex", gap: 12 }}>
          <button type="submit" className="btn">
            {editingStudent ? "Update Student" : "Add Student"}
          </button>
          {editingStudent && (
            <button type="button" className="btn btn-black" onClick={onCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
