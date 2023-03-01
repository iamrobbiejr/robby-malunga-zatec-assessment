import React from 'react';
import Footer from "../includes/Footer.jsx";

function Login(props) {
    return (
        <div className="page-header align-items-start min-vh-100"
             style={{backgroundImage: "url(" + '/img/bg2.jpg' + ")"}}
             loading="lazy">
            <span className="mask bg-gradient-dark opacity-6"></span>
            <div className="container my-auto">
                <div className="row">
                    <div className="col-lg-4 col-md-8 col-12 mx-auto">
                        <div className="card z-index-0 fadeIn3 fadeInBottom">
                            <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                                <div className="bg-gradient-primary shadow-dark border-radius-lg py-3 pe-1">
                                    <h4 className="text-white font-weight-bolder text-center mt-2 mb-0">Sign in</h4>
                                    <div className="row mt-3">
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <form role="form" className="text-start">
                                    <div className="input-group input-group-outline my-3">
                                        <label className="form-label">Email</label>
                                        <input type="email" className="form-control"/>
                                    </div>
                                    <div className="input-group input-group-outline mb-3">
                                        <label className="form-label">Password</label>
                                        <input type="password" className="form-control"/>
                                    </div>
                                    <div className="form-check form-switch d-flex align-items-center mb-3">
                                        <input className="form-check-input" type="checkbox" id="rememberMe" checked/>
                                        <label className="form-check-label mb-0 ms-3" htmlFor="rememberMe">Remember
                                            me</label>
                                    </div>
                                    <div className="text-center">
                                        <a href={'/dashboard'} className="btn bg-gradient-primary w-100 my-4 mb-2">Sign
                                            in
                                        </a>
                                    </div>
                                    <a href={'/register'}>
                                        <p className="mt-4 text-sm text-center">
                                            Don't have an account? Register
                                        </p>
                                    </a>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default Login;
