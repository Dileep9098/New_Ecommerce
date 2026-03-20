import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../Store/Feature/auth/authSlice';
import { showErrorMsg, showSuccessMsg } from '../../utils/ShowMessages';

export default function Login() {
    const [isPassword, setIsPassword] = useState(true)
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, error, isLoading, isAuthentication } = useSelector((state) => state.auth)
    console.log(user)

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(email, password)
        dispatch(loginUser({ email, password })).then((data) => {
            console.log("Login me Kya aaya hai ", data.payload)
            if (data.payload.success) {
                showSuccessMsg("Login Successfully !!")
                // navigate("/")
                localStorage.setItem("user",JSON.stringify(data.payload.user))
                if (data.payload.user.role === "admin") {
                    navigate("/admin/dashboard")
                }
                else {
                    navigate('/')
                }
            }
            else {
                showErrorMsg(data.payload.message)
            }
        })
    }

    return (
        <>
            <div className="border-bottom shadow-sm">
                <nav className="navbar navbar-light py-2">
                    <div className="container justify-content-center justify-content-lg-between">
                        <Link className="navbar-brand" to="/">
                            <img
                                src="../assets/images/logo/freshcart-logo.svg"
                                alt=""
                                className="d-inline-block align-text-top"
                            />
                        </Link>
                        <span className="navbar-text">
                            Already have an account?
                            <Link to="/login">Sign in</Link>
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
                                    src="../assets/images/svg-graphics/signin-g.svg"
                                    alt=""
                                    className="img-fluid"
                                />
                            </div>
                            <div className="col-12 col-md-6 offset-lg-1 col-lg-4 order-lg-2 order-1">
                                <div className="mb-lg-9 mb-5">
                                    <h1 className="mb-1 h2 fw-bold">Sign in to FreshCart</h1>
                                    <p>Welcome back to FreshCart! Enter your email to get started.</p>
                                </div>
                                <form className="needs-validation" noValidate="" onSubmit={handleSubmit}>
                                    <div className="row g-3">
                                        <div className="col-12">
                                            <label
                                                htmlFor="formSigninEmail"
                                                className="form-label visually-hidden"
                                            >
                                                Email address
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="formSigninEmail"
                                                placeholder="Email"
                                                required=""
                                                onChange={(e)=>setEmail(e.target.value)}
                                            />
                                            <div className="invalid-feedback">Please enter Email.</div>
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
                                                    onChange={(e) => setPassword(e.target.value)} 
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

                                        <div className="d-flex justify-content-between">
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    defaultValue=""
                                                    id="flexCheckDefault"
                                                />
                                                <label
                                                    className="form-check-label"
                                                    htmlFor="flexCheckDefault"
                                                >
                                                    Remember me
                                                </label>
                                            </div>
                                            <div>
                                                Forgot password?
                                                <a href="forgot-password.html">Reset It</a>
                                            </div>
                                        </div>
                                        <div className="col-12 d-grid">
                                            <button type="submit" className="btn btn-primary">
                                                Sign In
                                            </button>
                                        </div>
                                        <div>
                                            Don’t have an account?
                                            <Link to="/sign-up">Sign Up</Link>
                                        </div>
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
