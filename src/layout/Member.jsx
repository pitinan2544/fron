import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MemberAll = () => {
  const [member, setMember] = useState([]);
  const [editFormData, setEditFormData] = useState({
    id: "",
    memberName: "",
    address: "",
    phone: "",
    birthday: "",
    idCard: "",
    loan: "",
    deposit: ""
  });
  const [editingMemberId, setEditingMemberId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8889/member/all');
      const sortedMember = response.data.sort((a, b) => a.id - b.id);
      setMember(sortedMember);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDelete = async (memberId) => {
    try {
      const isConfirmed = window.confirm("Are you sure you want to delete this member?");
      if (isConfirmed) {
        const response = await axios.delete(`http://localhost:8889/member/delete/${memberId}`);
        console.log(response);
        fetchData();
        alert('Member deleted successfully!');
      } else {
        alert('You canceled the deletion.');
      }
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const handleUpdate = (member) => {
    setEditingMemberId(member.id);
    setEditFormData({
      id: member.id,
      memberName: member.memberName,
      address: member.address,
      phone: member.phone,
      birthday: member.birthday,
      idCard: member.idCard,
      loan: member.loan,
      deposit: member.deposit
    });
  };

  const handleEditChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditSubmit = async (e, memberId) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://localhost:8889/member/update/${memberId}`, {
        ...editFormData,
      });
      console.log(response);

      setEditingMemberId(null);
      setEditFormData({
        id: "",
        memberName: "",
        address: "",
        phone: "",
        birthday: "",
        idCard: "",
        loan: "",
        deposit: ""
      });
      fetchData();
    } catch (error) {
      console.error('Error updating data:', error);
      console.log('API Error:', error.response.data);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-base-content">รายชื่อสมาชิก</h2>
      <ul>
        {member.map((member) => (
          <li
            key={member.id}
            className={`border p-4 my-4 rounded ${member.id % 2 === 0 ? 'bg-base-100' : 'bg-base-300'
              }`}
          >
            <p>ID: {member.id}</p>
            <h3 className="text-xl font-bold text-blue-700">{member.memberName}</h3>
            <p className="text-green-600">Address: {member.address}</p>
            <p className="text-purple-600">Phone: {member.phone}</p>
            <p className="text-purple-600">Birthday: {member.birthday}</p>
            <p className="text-purple-600">ID Card: {member.idCard}</p>
            <p className="text-purple-600">Loan: {member.loan}</p>
            <p className="text-purple-600">Deposit: {member.deposit}</p>
            <div className="mt-4 space-x-2">
              <button
                className="btn btn-primary bg-green-500 hover:bg-green-600"
                onClick={() => handleUpdate(member)}
              >
                Update
              </button>
              <button
                className="btn btn-secondary bg-red-500 hover:bg-red-600"
                onClick={() => handleDelete(member.id)}
              >
                Delete
              </button>
            </div>
            {editingMemberId === member.id && (
              <form
                className="mt-4 space-y-2"
                onSubmit={(e) => handleEditSubmit(e, editingMemberId)}
              >
                <input
                  type="text"
                  name="memberName"
                  placeholder="Member Name"
                  value={editFormData.memberName}
                  onChange={handleEditChange}
                  className="input mx-4"
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={editFormData.address}
                  onChange={handleEditChange}
                  className="input mx-4"
                />
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone"
                  value={editFormData.phone}
                  onChange={handleEditChange}
                  className="input mx-4"
                />
                <input
                  type="text"
                  name="birthday"
                  placeholder="Birthday"
                  value={editFormData.birthday}
                  onChange={handleEditChange}
                  className="input mx-4"
                />
                <input
                  type="text"
                  name="idCard"
                  placeholder="ID Card"
                  value={editFormData.idCard}
                  onChange={handleEditChange}
                  className="input mx-4"
                />
                <button
                  type="submit"
                  className="btn btn-primary bg-green-500 hover:bg-green-600"
                >
                  Submit Update
                </button>
              </form>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MemberAll;
