import React, { useReducer } from "react";

const initialStudents = [
  { id: 1, name: "Rahul", status: "" },
  { id: 2, name: "Priya", status: "" },
  { id: 3, name: "Arjun", status: "" },
  { id: 4, name: "Sneha", status: "" }
];

function attendanceReducer(state, action) {
  switch (action.type) {
    case "MARK_PRESENT":
      return state.map(s =>
        s.id === action.id ? { ...s, status: "Present" } : s
      );

    case "MARK_ABSENT":
      return state.map(s =>
        s.id === action.id ? { ...s, status: "Absent" } : s
      );

    case "RESET":
      return state.map(s => ({ ...s, status: "" }));

    default:
      return state;
  }
}

export default function AttendanceTracker() {
  const [students, dispatch] = useReducer(attendanceReducer, initialStudents);

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "yellow",
        minHeight: "100vh"
      }}
    >
      <h1>Student Attendance Tracker</h1>

      {students.map(stu => (
        <div
          key={stu.id}
          style={{
            marginBottom: "12px",
            display: "flex",
            alignItems: "center",
            gap: "10px"
          }}
        >
          <strong>{stu.name}</strong>

          <button onClick={() => dispatch({ type: "MARK_PRESENT", id: stu.id })}>
            Present
          </button>

          <button onClick={() => dispatch({ type: "MARK_ABSENT", id: stu.id })}>
            Absent
          </button>

          <span
            style={{
              marginLeft: "15px",
              fontWeight: "bold",
              color:
                stu.status === "Present"
                  ? "green"
                  : stu.status === "Absent"
                  ? "red"
                  : "gray"
            }}
          >
            {stu.status || "Not Marked"}
          </span>
        </div>
      ))}

      <button
        style={{ marginTop: "20px", padding: "8px 15px" }}
        onClick={() => dispatch({ type: "RESET" })}
      >
        Reset Attendance
      </button>

      <h2 style={{ marginTop: "30px" }}>Attendance Summary</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {students.map(stu => (
            <tr key={stu.id}>
              <td>{stu.id}</td>
              <td>{stu.name}</td>
              <td>{stu.status || "Not Marked"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
