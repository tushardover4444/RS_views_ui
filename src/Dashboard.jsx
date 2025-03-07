import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaTable, FaKey, FaUser, FaIdBadge, FaPhone, FaEnvelope } from "react-icons/fa";
import "./Dashboard.css";

const API_URL =
  "http://localhost:4000/cubejs-api/v1/load?query=" +
  JSON.stringify({
    "dimensions": [
      "users.email",
      "users.isActive",
      "users.personaname",
      "users.phone",
      "users.tenantname",
      "users.user_id",
      "users.user_name"
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

  const getColumnIcon = (col) => {
    if (col.includes("key")) {
      return <FaKey />;
    } else if (col.includes("name")) {
      return <FaUser />;
    } else if (col.includes("id")) {
      return <FaIdBadge />;
    } else if (col.includes("phone")) {
      return <FaPhone />;
    } else if (col.includes("email")) {
      return <FaEnvelope />;
    }
    return null;
  };

  return (
    <div className="dashboard-container">
      
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
                  {getColumnIcon(col)} {col.split('.').pop().replace("_", " ").toUpperCase()}
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