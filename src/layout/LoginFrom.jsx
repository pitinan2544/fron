import React, { useState } from 'react'
import axios from 'axios'
import useAuth from '../hooks/useAuth'

export default function LoginFrom() {
    const { setUser } = useAuth()
    const [input, setInput] = useState({
        username: '',
        password: '',

    })

    const hdlChange = e => {
        setInput(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const hdlSubmit = async e => {
        try {
            e.preventDefault()
            //validation
            const rs = await axios.post('http://localhost:8889/user/login', input)
            console.log(rs.data.token)
            localStorage.setItem('token', rs.data.token)
            const rs1 = await axios.get('http://localhost:8889/user/me', {
                headers: { Authorization: `Bearer ${rs.data.token}` }
            })
            console.log(rs1.data)
            setUser(rs1.data)
        } catch (err) {
            console.log(err.message)
        }
    }

    return (
        // <div className='p-5  ' >
        //     <div className="text-3xl">Please Login</div>
        //     <form onSubmit={hdlSubmit}>
        //         <label className="form-control w-full max-w-xs">
        //             <div className="label">
        //                 <span className="label-text">Username</span>
        //             </div>
        //             <input
        //                 type="text"
        //                 placeholder="Type here"
        //                 className="input input-bordered w-full max-w-xs"
        //                 value={input.username}
        //                 name="username"
        //                 onChange={hdlChange}
        //             />
        //         </label>
        //         <label className="form-control w-full max-w-xs">
        //             <div className="label">
        //                 <span className="label-text">Password</span>
        //             </div>
        //             <input
        //                 type="password"
        //                 placeholder="Type here"
        //                 className="input input-bordered w-full max-w-xs"
        //                 name="password"
        //                 value={input.password}
        //                 onChange={hdlChange}
        //             />
        //         </label>
        //         <br />
        //         <div className='flex gap-5'>
        //             <button className="btn btn-success">Login</button>
        //         </div> 
        //     </form>
        // </div>
        <div className='p-5 flex justify-center items-center '>
            <div className="f"> {/* หรือแทนด้วย className="flex" */}
                <div className="text-3xl">กรุณาล็อคอิน</div>
                <form onSubmit={hdlSubmit}>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Username</span>
                        </div>
                        <input
                            type="text"
                            placeholder="Type here"
                            className="input input-bordered w-full max-w-xs"
                            value={input.username}
                            name="username"
                            onChange={hdlChange}
                        />
                    </label>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Password</span>
                        </div>
                        <input
                            type="password"
                            placeholder="Type here"
                            className="input input-bordered w-full max-w-xs"
                            name="password"
                            value={input.password}
                            onChange={hdlChange}
                        />
                    </label>
                    <br />
                    <div className='flex justify-center'>
                        <button className="btn btn-success">Login</button>
                    </div>
                </form>
            </div>
        </div>


    )
}
