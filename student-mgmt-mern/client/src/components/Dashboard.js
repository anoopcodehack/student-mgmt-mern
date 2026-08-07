import React, { useMemo } from "react";

export default function Dashboard({ students, onNavigate }) {
  const stats = useMemo(() => {
    const total = students.length;
    const courses = new Set(students.map((s) => s.course)).size;
    const years = students.reduce((acc, s) => {
      acc[s.year] = (acc[s.year] || 0) + 1;
      return acc;
    }, {});
    const topYear = Object.entries(years).sort((a, b) => b[1] - a[1])[0];
    return {
      total,
      courses,
      topYear: topYear ? `Year ${topYear[0]}` : "N/A",
    };
  }, [students]);

  return (
    <div className="panel">
      <h2>Dashboard</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-number">{stats.total}</span>
          <span className="stat-label">Total Students</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{stats.courses}</span>
          <span className="stat-label">Courses</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{stats.topYear}</span>
          <span className="stat-label">Most Common Year</span>
        </div>
      </div>

      <div style={{ marginTop: 24, display: "flex", gap: 12, flexWrap: "wrap" }}>
        <button className="btn" onClick={() => onNavigate("add")}>
          + Add Student
        </button>
        <button className="btn btn-black" onClick={() => onNavigate("list")}>
          View All Students
        </button>
      </div>

      <div style={{ marginTop: 24 }}>
        <h3>Recently Added</h3>
        {students.slice(0, 5).length === 0 ? (
          <div className="empty-state">No students yet. Add your first one!</div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Roll No</th>
                  <th>Name</th>
                  <th>Course</th>
                  <th>Year</th>
                </tr>
              </thead>
              <tbody>
                {students.slice(0, 5).map((s) => (
                  <tr key={s._id}>
                    <td>{s.rollNo}</td>
                    <td>{s.name}</td>
                    <td>{s.course}</td>
                    <td>{s.year}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
