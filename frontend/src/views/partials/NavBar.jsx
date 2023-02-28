import React from 'react';

function NavBar(props) {


    return (
        <>
            <div className="container position-sticky z-index-sticky top-0">
                <div className="row">
                    <div className="col-12">
                        <nav
                            className="navbar navbar-expand-lg blur border-radius-xl top-0 z-index-fixed shadow position-absolute my-3 py-2 start-0 end-0 mx-4">
                            <div className="container-fluid px-0">
                                <a className="navbar-brand font-weight-bolder ms-sm-3"
                                   href={'/'} rel="tooltip"
                                   title="Go to Homepage" data-placement="bottom" target="_blank">
                                    Zatec Assessment
                                </a>
                                <button className="navbar-toggler shadow-none ms-2" type="button"
                                        data-bs-toggle="collapse" data-bs-target="#navigation"
                                        aria-controls="navigation" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon mt-2">
                                     <span className="navbar-toggler-bar bar1"></span>
                                     <span className="navbar-toggler-bar bar2"></span>
                                      <span className="navbar-toggler-bar bar3"></span>
                                    </span>
                                </button>
                                <div className="collapse navbar-collapse pt-3 pb-2 py-lg-0 w-100" id="navigation">
                                    <ul className="navbar-nav navbar-nav-hover ms-auto">

                                        <li className="nav-item my-auto ms-3 ms-lg-0">
                                            <a href={'/login'}
                                               className="btn btn-sm  bg-gradient-dark  mb-0 me-1 mt-2 mt-md-0">Sign
                                                In</a>
                                        </li>
                                        <li className="nav-item my-auto ms-3 ms-lg-0">
                                            <a href={'/register'}
                                               className="btn btn-sm  bg-gradient-dark  mb-0 me-1 mt-2 mt-md-0">Register</a>
                                        </li>
                                        <li className="nav-item dropdown dropdown-hover mx-2 my-auto ms-3 ms-lg-0">
                                            <a className="btn btn-sm  bg-gradient-primary ps-2 d-flex cursor-pointer align-items-center mb-0 me-1 mt-2 mt-md-0"
                                               id="dropdownMenuDocs" data-bs-toggle="dropdown" aria-expanded="false">
                                                <i className="material-icons opacity-6 me-2 text-md">
                                                    account_circle</i>
                                                Account
                                                <img src="/img/down-arrow-white.svg" alt="down-arrow"
                                                     className="arrow ms-auto ms-md-2"/>
                                            </a>
                                            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-animation dropdown-md dropdown-md-responsive mt-0 mt-lg-3 p-3 border-radius-lg"
                                                aria-labelledby="dropdownMenuDocs">
                                                <div className="d-none d-lg-block">
                                                    <ul className="list-group">
                                                        <li className="nav-item list-group-item border-0 p-0">
                                                            <a className="dropdown-item py-2 ps-3 border-radius-md"
                                                               href=" https://www.creative-tim.com/learning-lab/bootstrap/overview/material-kit ">
                                                                <h6 className="dropdown-header text-dark font-weight-bolder d-flex justify-content-cente align-items-center p-0">
                                                                    <i className="material-icons">dashboard</i>&nbsp;Dashboard
                                                                </h6>
                                                                <span
                                                                    className="text-sm">Manage your albums and songs</span>
                                                            </a>
                                                        </li>

                                                        <li className="nav-item list-group-item border-0 p-0">
                                                            <a className="dropdown-item py-2 ps-3 border-radius-md"
                                                               href=" https://www.creative-tim.com/learning-lab/bootstrap/utilities/material-kit ">
                                                                <h6 className="dropdown-header text-dark font-weight-bolder d-flex justify-content-cente align-items-center p-0">
                                                                    <span className="material-icons">logout</span>
                                                                    &nbsp;Logout
                                                                </h6>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>

                                            </ul>
                                        </li>

                                    </ul>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    );
}

export default NavBar;
