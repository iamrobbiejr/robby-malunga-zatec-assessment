import React from 'react';

function Footer(props) {
    return (
        <footer className="footer position-absolute bottom-2 py-2 w-100">
            <div className="container">
                <div className="row align-items-center justify-content-lg-between">
                    <div className="col-12 col-md-6 my-auto">
                        <div className="copyright text-center text-sm text-white text-lg-start">
                            ©
                            <span className="text-white">2023</span>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <ul className="nav nav-footer justify-content-center justify-content-lg-end">
                            <li className="nav-item">
                                <a href={'#'} className="nav-link text-white"
                                   target="_blank">Zatec Assessment</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
