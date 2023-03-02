import React, {useState} from 'react';
import SlidingPane from "react-sliding-pane";
import axiosClient from "../../../axios.jsx";

function AddAlbum({visible, closePane}) {

    const [request, setRequest] = useState({
        title: "",
        description: "",
        cover_image_url: null,
        release_date: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const onImageChoose = (ev) => {
        const file = ev.target.files[0];
        console.log("files: ", file);

        const reader = new FileReader();
        reader.onload = () => {

            setRequest({
                ...request,
                image: file,
                cover_image_url: reader.result,
            });

            ev.target.value = "";
        };
        reader.readAsDataURL(file);
        console.log("readAsDataURL: ", reader);
    };


    const handleAddAlbum = (e) => {
        e.preventDefault()

        const payload = {...request};

        //     post request to api
        axiosClient.post("/album", payload)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })

    }

    return (

        <SlidingPane className="sliding-pane pt-lg-10 bg-gray-200"
                     isOpen={visible}
                     title={'Create New Album'}
                     width={window.innerWidth < 600 ? "100%" : "900px"}
                     onRequestClose={closePane}
                     hideHeader={true}
        >
            <div className="card mt-3">
                <div className="card-header">
                    <h5 className="card-title">Create New Album</h5>
                </div>
                <form action="POST" onSubmit={handleAddAlbum} className="p-4">
                    {/*Image*/}
                    <div className="card p-1">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-6 container">
                            <label>Album Cover</label>
                            <div className="fileinput fileinput-new " data-provides="fileinput">
                                <div className="fileinput-new thumbnail img-raised">
                                    {!request.cover_image_url && (
                                        <img
                                            src="/img/bg2.jpg"
                                            alt="..." width="100%" height="10%"/>
                                    )}
                                    {request.cover_image_url && (
                                        <img
                                            src={request.cover_image_url}
                                            alt="..." width="700px" height="350px"/>
                                    )}

                                </div>
                                <div className="fileinput-preview fileinput-exists thumbnail img-raised"></div>

                                <div>
                                <span className="btn btn-raised btn-round btn-sm btn-file">
                                    <input type="file" name="..." className="btn btn-sm btn-dark p-2"
                                           onChange={onImageChoose} accept="image/png, image/gif, image/jpeg"/>
                                </span>
                                    {/*<span className="btn btn-raised btn-round btn-sm btn-file">*/}
                                    {/*    <a href="#pablo" className="btn btn-danger btn-round fileinput-exists" data-dismiss="fileinput">*/}
                                    {/*    <i className="fa fa-times"></i> Remove</a>*/}
                                    {/*</span>*/}

                                </div>
                            </div>
                        </div>

                    </div>
                    {/*Image*/}

                    <div className="input-group input-group-static mb-4 mt-4">
                        <label>Album Title</label>
                        <input type="text" className="form-control"
                               value={request.title}
                               onChange={(ev) =>
                                   setRequest({...request, title: ev.target.value})
                               }
                        />
                    </div>
                    <div className="input-group input-group-static mb-4">
                        <label>Description</label>
                        <input type="text" className="form-control" value={request.description}
                               onChange={(ev) =>
                                   setRequest({...request, description: ev.target.value})
                               }/>
                    </div>
                    <div className="input-group input-group-static my-3">
                        <label>Release Date</label>
                        <input type="date" className="form-control" value={request.release_date}
                               onChange={(ev) =>
                                   setRequest({...request, release_date: ev.target.value})
                               }/>
                    </div>
                    <button className="btn btn-sm btn-primary" type="submit"><i
                        className="fa fa-paper-plane text-sm fa-2x">&nbsp;Submit</i></button>
                </form>
            </div>

        </SlidingPane>
    );
}

export default AddAlbum;
