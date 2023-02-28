import React from 'react';

function AlbumHomeView(props) {
    // retrieve all albums

    return (
        <>
            <div className="row">
                <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                    <div className="container mt-sm-5">
                        <div className="page-header py-6 py-md-5 my-sm-3 mb-3 border-radius-xl"
                             style={{backgroundImage: "url(" + 'https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/desktop.jpg' + ")"}}
                             loading="lazy">
                            <span className="mask bg-gradient-dark"></span>
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-12 ms-lg-5">
                                        <h4 className="text-white">Album Title</h4>
                                        <p className="text-white">Built by developers</p>

                                        <a href="https://www.creative-tim.com/learning-lab/bootstrap/overview/material-kit"
                                           className="text-white icon-move-right">
                                            View Album
                                            <i className="fas fa-arrow-right text-sm ms-1"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AlbumHomeView;
