import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaTable } from "react-icons/fa";
import "./Dashboard.css";

const API_URL =
  "http://localhost:4000/cubejs-api/v1/load?query=" +
  JSON.stringify({
    "dimensions": [
      "memberships.membership_id",
      "memberships.project_id",
      "memberships.role_name",
      "memberships.user_id"
    ]
  });

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((result) => {
        const records = result.data || [];
        setData(records);
        if (records.length > 0) {
          setColumns(Object.keys(records[0]));
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="dashboard-container">
      {/* Logo */}
      <div className="logo-container">
        <img src="/public/images.png" alt="Company Logo" className="logo" />
      </div>

      <h1 className="dashboard-title">
        <FaTable /> DASHBOARD
      </h1>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              {columns.map((col, index) => (
                <th key={index}>
                  {col.replace("projects.", "").replace("_", " ").toUpperCase()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="fade-row" style={{ animationDelay: `${rowIndex * 0.5}s` }}>
                {columns.map((col, colIndex) => (
                  <td key={colIndex}>{row[col] || "-"}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
