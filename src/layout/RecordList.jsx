import React, { useState } from 'react';
import axios from 'axios';

export default function RegisterFrom() {
    const [input, setInput] = useState({
      userId: "",
      memberId: "",
      loan: "",
      deposit: ""
    });

    const hdlChange = e => {
        setInput(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const hdlSubmit = async e => {
        e.preventDefault();
        const { loan, deposit, ...rest } = input;
        const newData = {
            ...rest,
            loan: parseInt(loan), // แปลงค่า loan จาก string เป็น integer
            deposit: parseInt(deposit) // แปลงค่า deposit จาก string เป็น integer
        };

        try {
            // ดึงข้อมูล member จาก API โดยใช้ memberId
            const memberResponse = await axios.get(`http://localhost:8889/member/getbyid/${newData.memberId}`);
            const memberData = memberResponse.data;
            
            // บวก loan และ deposit ใน member กับข้อมูลที่ส่งไป
            const updatedLoan = memberData.loan + newData.loan;
            const updatedDeposit = memberData.deposit + newData.deposit;

            // สร้าง object ใหม่ที่จะส่งไปยัง API /record/create
            const recordData = {
                userId: newData.userId,
                memberId: newData.memberId,
                loan: newData.loan,
                deposit: newData.deposit
            };

            // ส่งข้อมูลไปยัง API /record/create
            const recordResponse = await axios.post('http://localhost:8889/record/create', recordData);
            console.log(recordResponse);
            if (recordResponse.status === 200) {
                // หากสร้าง record สำเร็จให้ทำการอัปเดต loan และ deposit ใน member
                await axios.put(`http://localhost:8889/member/update/${newData.memberId}`, {
                    loan: updatedLoan,
                    deposit: updatedDeposit
                });
                alert('Create Member Successful');
            }
        } catch (error) {
            console.error('Error creating record:', error);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className='p-5'>
                <div className="text-3xl">เพิ่มเงินฝากเงินกู้</div>
                <form onSubmit={hdlSubmit} className="w-full max-w-xs">
                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">User ID</span>
                        </div>
                        <input
                            type="text"
                            placeholder="Type here"
                            className="input input-bordered w-full"
                            value={input.userId}
                            name="userId"
                            onChange={hdlChange}
                        />
                    </label>
                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">Member ID</span>
                        </div>
                        <input
                            type="text"
                            placeholder="Type here"
                            className="input input-bordered w-full"
                            name="memberId"
                            value={input.memberId}
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
