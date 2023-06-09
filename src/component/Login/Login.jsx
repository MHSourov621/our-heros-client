import React, { useContext, useState } from 'react';
import { FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import useTitle from '../hooks/useTitle';

const Login = () => {
    const { emailLogin, googleLogin } = useContext(AuthContext);
    const [error, setError] = useState('');
    useTitle('Login');

    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";

    const handleEmailLogin = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        emailLogin(email, password)
            .then(result => {
                setError('')
                const user = result.user;
                // console.log(user);
                navigate(from , {replace: true})
            })
            .catch(error => {
                setError(error.message)
            })

    }

    const handleGoogleLogin = () => {
        googleLogin()
        .then(result => {
            setError('')
            const user = result.user;
            // console.log(user);
            navigate(from , {replace: true})
        })
        .catch(error => {
            setError(error.message)
        })
    }

    return (
        <div>
            <div className="hero">
                <div className="hero-content flex-col">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl text-orange-400 font-semibold my-6">Login now!</h1>
                    </div>
                    <div className="card flex-shrink-0 w-96 max-w-sm shadow-2xl bg-base-100">
                        <p className='text-red-600 text-lg ml-8 pt-8'>{error}</p>
                        <form onSubmit={handleEmailLogin} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="email" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" placeholder="password" className="input input-bordered" />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn text-lg bg-orange-400 text-white hover:bg-orange-500">Login</button>
                            </div>
                        </form>
                        <div className='flex flex-col'>
                            <button onClick={handleGoogleLogin} className="text-lg border-2 border-orange-400 text-orange-400 hover:bg-orange-400 rounded-lg w-3/4 mx-auto py-2 mb-6 hover:text-white duration-300"><FaGoogle
                                className="inline mr-4"></FaGoogle> Google Login</button>

                            <p className='text-md  text-center mb-10'>Don't have any account? <Link className='text-orange-400' to="/register">Go to register.</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;