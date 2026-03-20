import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../../Store/Feature/auth/authSlice';
import { showErrorMsg, showSuccessMsg } from '../../utils/ShowMessages';

export default function Register() {
    const [email, setEmail] = useState('');
    const [name, setFName] = useState('');
    const [lname, setLName] = useState('');
    const [password, setPassword] = useState('');
    const [isPassword, setIsPassword] = useState(true)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        // debugger
        const result = await dispatch(registerUser({ name, lname, email, password }));
        
        if (result.payload?.success) {
            showSuccessMsg("User Successfully Inserted !!");
            navigate("/login");
        } else {
            showErrorMsg(result.payload?.message || "Registration failed");
        }
    } catch (err) {
        // showErrorMsg("Something went wrong. Please try again.");
    }
};

    return (
        <>
            <div className="border-bottom shadow-sm">
                <nav className="navbar navbar-light py-2">
                    <div className="container justify-content-center justify-content-lg-between">
                        <Link className="navbar-brand" to="/">
                            <img
                                src="/assets/images/logo/freshcart-logo.svg"
                                alt="FreshCart Logo"
                                width={150}
                                height={40}
                            />
                        </Link>
                        <span className="navbar-text">
                            Already have an account? <Link to="/auth/login">Sign in</Link>
                        </span>
                    </div>
                </nav>
            </div>

            <main>
                <section className="my-lg-14 my-8">
                    <div className="container">
                        <div className="row justify-content-center align-items-center">
                            <div className="col-12 col-md-6 col-lg-4 order-lg-1 order-2">
                                <img
                                    src="/assets/images/svg-graphics/signin-g.svg"
                                    alt="Sign in illustration"
                                    width={400}
                                    height={300}
                                    className="img-fluid"
                                />
                            </div>
                            <div className="col-12 col-md-6 offset-lg-1 col-lg-4 order-lg-2 order-1">
                                <div className="mb-lg-9 mb-5">
                                    <h1 className="mb-1 h2 fw-bold">Sign in to FreshCart</h1>
                                    <p>Welcome back to FreshCart! Enter your email to get started.</p>
                                </div>
                                <form className="needs-validation" noValidate onSubmit={handleSubmit}>
                                    <div className="row g-3">
                                        <div className="col">
                                            <label htmlFor="formSignupfname" className="form-label visually-hidden">
                                                First Name
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="formSignupfname"
                                                placeholder="First Name"
                                                required
                                                onChange={(e)=>setFName(e.target.value)}
                                            />
                                            <div className="invalid-feedback">Please enter first name.</div>
                                        </div>
                                        <div className="col">
                                            <label htmlFor="formSignuplname" className="form-label visually-hidden">
                                                Last Name
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="formSignuplname"
                                                placeholder="Last Name"
                                                required
                                                 onChange={(e)=>setLName(e.target.value)}
                                            />
                                            <div className="invalid-feedback">Please enter last name.</div>
                                        </div>
                                        <div className="col-12">
                                            <label htmlFor="formSignupEmail" className="form-label visually-hidden">
                                                Email address
                                            </label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                id="formSignupEmail"
                                                placeholder="Email"
                                                required
                                                 onChange={(e)=>setEmail(e.target.value)}
                                            />
                                            <div className="invalid-feedback">Please enter email.</div>
                                        </div>
                                        <div className="col-12">
                                            <div className="password-field position-relative">
                                                <label htmlFor="formSigninPassword" className="form-label visually-hidden">
                                                    Password
                                                </label>
                                                <input
                                                    type={isPassword ? "password" : "text"}
                                                    className="form-control fakePassword"
                                                    id="formSigninPassword"
                                                    placeholder="*****"
                                                    value={password} // ✅ optional: if you're managing state
                                                    onChange={(e) => setPassword(e.target.value)} // ✅ optional
                                                    required
                                                />
                                                <span
                                                    onClick={() => setIsPassword(!isPassword)}
                                                    style={{ cursor: "pointer", position: "absolute", top: "50%", right: "1rem", transform: "translateY(-50%)" }}
                                                >
                                                    <i className={`bi ${isPassword ? "bi-eye-slash" : "bi-eye"} passwordToggler`} />
                                                </span>
                                                <div className="invalid-feedback">Please enter password.</div>
                                            </div>
                                        </div>

                                        <div className="col-12 d-grid">
                                            <button type="submit" className="btn btn-primary">
                                                Register
                                            </button>
                                        </div>

                                        <p>
                                            <small>
                                                By continuing, you agree to our <Link to="#">Terms of Service</Link> &{' '}
                                                <Link to="#">Privacy Policy</Link>
                                            </small>
                                        </p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

        </>
    )
}
