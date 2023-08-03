import React from 'react'
import { useState, useRef } from 'react'
import { gql, useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-dom'
import "../styles/Login.css"
import { toast } from 'react-toastify'

const Login = () => {
    const adminnameRef = useRef();
    const adminpasswordRef = useRef();
    const navigator = useNavigate();

    const LoginAdmin = gql`
		mutation Mutation($adminName: String!, $adminPassword: String!) {
            login(admin_name: $adminName, admin_password: $adminPassword) {
                success
                message
                data {
                    id
                    admin_name
                    admin_password
                }
                token
        }
    }`;

    const [login, { loading, error }] = useMutation(LoginAdmin);


    const handleSubmit = async (event) => {
        event.preventDefault();

        const admin_name = adminnameRef.current.value;
        const admin_password = adminpasswordRef.current.value;
        try {
            const { data } = await login({
                variables: { adminName: admin_name, adminPassword: admin_password },
            });

            console.log(data);

            if (data.login.token) {
                window.localStorage.setItem('token', data.login.token);
                toast("Success Login", { type: "success" })
                navigator('/admin-panel');
            } else {
                // Handle the case when the token is not returned or null
                console.error('Token not received.');
            }
        } catch (error) {
            toast("Admin parol yoki username xato!", { type: "error" })
        }
    };

    return (
        <div className='container'>
            <div className='salom d-flex align-items-center h-100vh justify-content-center'>
                <div className='logincard d-flex flex-column justify-content-center'>
                    <h2 className='text-center fs-1 fw-normal'>Login</h2>
                    <form onSubmit={handleSubmit} className='form d-flex flex-column px-5 gap-2'>
                        <label htmlFor="admin_name">Admin_name</label>
                        <input ref={adminnameRef} className='form-control' type="text" placeholder='admin_name' name='admin_name' id='admin_name' />
                        <label htmlFor="admin_password">Admin password</label>
                        <input ref={adminpasswordRef} className='form-control' type="text" id='admin_password' name='admin_password' placeholder='admin_password' />
                        <button className='btn btn-danger mt-3' type='submit'>Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
