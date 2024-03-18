import React, { useState } from 'react'
import axios from 'axios'

export default function RegisterFrom() {
    const [input, setInput] = useState({
        username: '',
        password: '',
        Address: '',
        Phone: '',
        idCard: ''
    })

    const hdlChange = e => {
        setInput(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const hdlSubmit = async e => {
        e.preventDefault()
        const rs = await axios.post('http://localhost:8889/user/register', input)
        console.log(rs)
        if (rs.status === 200) {
            return alert('register Successful')
        }
    }

    return (
        
        <div class="flex justify-center items-center h-screen">
            <div class='p-5'>
                <div class="text-3xl">สมัครสมาชิก</div>
                <form onSubmit={hdlSubmit} class="w-full max-w-xs">
                    <label class="form-control">
                        <div class="label">
                            <span class="label-text">Username</span>
                        </div>
                        <input
                            type="text"
                            placeholder="Type here"
                            class="input input-bordered w-full"
                            value={input.username}
                            name="username"
                            onChange={hdlChange}
                        />
                    </label>
                    <label class="form-control">
                        <div class="label">
                            <span class="label-text">Password</span>
                        </div>
                        <input
                            type="password"
                            placeholder="Type here"
                            class="input input-bordered w-full"
                            name="password"
                            value={input.password}
                            onChange={hdlChange}
                        />
                    </label>
                    <label class="form-control">
                        <div class="label">
                            <span class="label-text">Address</span>
                        </div>
                        <input
                            type="text"
                            placeholder="Type here"
                            class="input input-bordered w-full"
                            name="Address"
                            value={input.Address}
                            onChange={hdlChange}
                        />
                    </label>
                    <label class="form-control">
                        <div class="label">
                            <span class="label-text">Phone</span>
                        </div>
                        <input
                            type="text"
                            placeholder="Type here"
                            class="input input-bordered w-full"
                            name="Phone"
                            value={input.Phone}
                            onChange={hdlChange}
                        />
                    </label>
                    <label class="form-control">
                        <div class="label">
                            <span class="label-text">IdCard</span>
                        </div>
                        <input
                            type="text"
                            placeholder="Type here"
                            class="input input-bordered w-full"
                            name="idCard"
                            value={input.idCard}
                            onChange={hdlChange}
                        />
                    </label>
                    <br />
                    <div class='flex justify-center gap-5'>
                        <button class="btn btn-success">Submit</button>
                        <button class="btn btn-success">Reset</button>
                    </div>
                </form>
            </div>
        </div>

    )
}
