import React from 'react';
import Footer from "../partials/Footer.jsx";

function SignUp(props) {
    return (
        <div className="page-header align-items-start min-vh-100"
             style={{backgroundImage: "url(" + 'https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80' + ")"}}
             loading="lazy">
            <span className="mask bg-gradient-dark opacity-6"></span>
            <div className="container my-auto">
                <div className="row">
                    <div className="col-lg-4 col-md-8 col-12 mx-auto">
                        <div className="card z-index-0 fadeIn3 fadeInBottom">
                            <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                                <div className="bg-gradient-dark shadow-dark border-radius-lg py-3 pe-1">
                                    <h4 className="text-white font-weight-bolder text-center mt-2 mb-0">Sign Up</h4>
                                    <div className="row mt-3">

                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <form role="form" className="text-start">
                                    <div className="input-group input-group-outline my-3">
                                        <label className="form-label">Name</label>
                                        <input type="text" className="form-control"/>
                                    </div>
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
                                        <button type="button" className="btn bg-gradient-dark w-100 my-4 mb-2">Sign
                                            Up
                                        </button>
                                    </div>
                                    <a href={'/login'}>
                                        <p className="mt-4 text-sm text-center">
                                            Already have an account? Sign In
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

export default SignUp;
