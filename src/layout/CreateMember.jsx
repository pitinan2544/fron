import React, { useState } from 'react';
import axios from 'axios';

export default function RegisterFrom() {
    const [input, setInput] = useState({
        memberName: "",
        address: "",
        phone: "",
        birthday: "",
        idCard: "",
        loan: 0, // เริ่มต้นเป็น 0
        deposit: 0 // เริ่มต้นเป็น 0
    });

    const hdlChange = e => {
        setInput(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const hdlSubmit = async e => {
        e.preventDefault();
        const { loan, deposit, ...rest } = input; // แยกค่า loan และ deposit ออกจาก rest ของ input
        const newData = {
            ...rest,
            loan: parseInt(loan), // แปลงค่า loan จาก string เป็น integer
            deposit: parseInt(deposit) // แปลงค่า deposit จาก string เป็น integer
        };
        const rs = await axios.post('http://localhost:8889/member/create', newData);
        console.log(rs);
        if (rs.status === 200) {
            return alert('Create Member Successful');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className='p-5'>
                <div className="text-3xl">เพิ่มสมาชิก(Member)</div>
                <form onSubmit={hdlSubmit} className="w-full max-w-xs">
                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">Member Name</span>
                        </div>
                        <input
                            type="text"
                            placeholder="Type here"
                            className="input input-bordered w-full"
                            value={input.memberName}
                            name="memberName"
                            onChange={hdlChange}
                        />
                    </label>
                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">Address</span>
                        </div>
                        <input
                            type="text"
                            placeholder="Type here"
                            className="input input-bordered w-full"
                            name="address"
                            value={input.address}
                            onChange={hdlChange}
                        />
                    </label>
                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">Phone</span>
                        </div>
                        <input
                            type="text"
                            placeholder="Type here"
                            className="input input-bordered w-full"
                            name="phone"
                            value={input.phone}
                            onChange={hdlChange}
                        />
                    </label>
                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">Birthday</span>
                        </div>
                        <input
                            type="date"
                            placeholder="Type here"
                            className="input input-bordered w-full"
                            name="birthday"
                            value={input.birthday}
                            onChange={hdlChange}
                        />
                    </label>
                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">ID Card</span>
                        </div>
                        <input
                            type="text"
                            placeholder="Type here"
                            className="input input-bordered w-full"
                            name="idCard"
                            value={input.idCard}
                            onChange={hdlChange}
                        />
                    </label>
                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">Loan</span>
                        </div>
                        <input
                            type="text"
                            placeholder="Type here"
                            className="input input-bordered w-full"
                            name="loan"
                            value={input.loan}
                            onChange={hdlChange}
                        />
                    </label>
                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">Deposit</span>
                        </div>
                        <input
                            type="text"
                            placeholder="Type here"
                            className="input input-bordered w-full"
                            name="deposit"
                            value={input.deposit}
                            onChange={hdlChange}
                        />
                    </label>
                    <br />
                    <div className='flex justify-center gap-5'>
                        <button className="btn btn-success">Submit</button>
                        <button className="btn btn-success">Reset</button>
                    </div>
                </form>
            </div>
        </div>

    );
}