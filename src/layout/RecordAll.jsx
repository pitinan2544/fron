import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RecordAll = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8889/record/getrecord');
      setRecords(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDelete = async (recordId) => {
    try {
      const isConfirmed = window.confirm("Are you sure you want to delete this record?");
      if (isConfirmed) {
        await axios.delete(`http://localhost:8889/record/delete/${recordId}`);
        setRecords(records.filter(record => record.id !== recordId));
        alert('Record deleted successfully!');
      } else {
        alert('You canceled the deletion.');
      }
    } catch (error) {
      console.error('Error deleting record:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-base-content">ประวัติการทำรายการ</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>User ID</th>
            <th>Member ID</th>
            <th>Date</th>
            <th>Loan</th>
            <th>Deposit</th>
            <th>Action</th> {/* เพิ่มคอลัมน์ Action */}
          </tr>
        </thead>
        <tbody>
          {records.map(record => (
            <tr key={record.id}>
              <td>{record.id}</td>
              <td>{record.userId}</td>
              <td>{record.memberId}</td>
              <td>{new Date(record.date).toLocaleString()}</td>
              <td>{record.loan}</td>
              <td>{record.deposit}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(record.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecordAll;
