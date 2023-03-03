import React, {useState, CSSProperties} from 'react';
import SlidingPane from "react-sliding-pane";
import axiosClient from "../../../axios.jsx";
import {BeatLoader} from "react-spinners";
import {css} from "@emotion/react";
import {useStateContext} from "../../contexts/ContextProvider.jsx";
import ToastService from 'react-material-toast';

const toast = ToastService.new({
    place: 'topRight',
    duration: 2,
    maxCount: 8
});

const override = css`
    display: block;
    margin: 0 auto;
`;

function AddSong({visible, album, closePane, closeAfterSuccessPane}) {

    const {currentUser} = useStateContext();

    const [request, setRequest] = useState({
        title: "",
        genre: "",
        album_id: album?.id,
        length: "",
    });
    const [addLoading, setAddLoading] = useState(false);
    const [error, setError] = useState("");
    const genres = ['Pop', 'Afro', 'Soul', 'R & B', 'Rock', 'Country', 'Gospel', 'Reggae']


    const handleAddSong = (e) => {
        setAddLoading(true)
        e.preventDefault()

        const payload = {...request, 'album_id': album.id};
        console.log("payload: ", payload);

        //     post request to api
        axiosClient.post("/song", payload)
            .then(res => {
                console.log(res)
                toast.success('Song successfully added to album', () => {
                    console.log('closed')
                })
                closeAfterSuccessPane()
                setAddLoading(false)
            })
            .catch(err => {
                console.log(err)
                toast.error('Operation Failed,Please try again', () => {
                    console.log('closed')
                })
                setAddLoading(false)
            })

    }

    return (

        <SlidingPane className="sliding-pane pt-lg-10 bg-gray-200"
                     isOpen={visible}
                     title={'Create New Album'}
                     width={window.innerWidth < 600 ? "100%" : "600px"}
                     onRequestClose={closePane}
                     hideHeader={true}
        >
            <div className="card mt-3">
                <div className="card-header">
                    <h5 className="card-title">Add Song To Album</h5>
                </div>
                {addLoading && (
                    <div className="container ml-lg-8 p-lg-4">
                        <BeatLoader
                            color={"#E53371"}
                            loading={addLoading}
                            cssOverride={override}
                            size={30}
                            aria-label="Loading Spinner"
                            data-testid="loader"/>

                    </div>

                )}
                {!addLoading && (
                    <form action="POST" onSubmit={handleAddSong} className="p-4">
                        <div className="input-group input-group-static mb-4 mt-4">
                            <label>Song Title</label>
                            <input type="text" className="form-control"
                                   value={request.title}
                                   onChange={(ev) =>
                                       setRequest({...request, title: ev.target.value})
                                   }
                            />
                        </div>
                        <div className="input-group input-group-static mb-4">
                            <label htmlFor="exampleFormControlSelect1" className="ms-0">Select Genre</label>
                            <select className="form-control" id="exampleFormControlSelect1" onChange={(ev) =>
                                setRequest({...request, genre: ev.target.value})
                            }>
                                {genres.map((genre, i) => (
                                    <option key={i} value={genre}>{genre}</option>
                                ))}

                            </select>
                        </div>
                        <div className="input-group input-group-static my-3">
                            <label>Duration</label>
                            <input type="text" className="form-control" placeholder="e.g. 4mins 20sec"
                                   value={request.description}
                                   onChange={(ev) =>
                                       setRequest({...request, length: ev.target.value})
                                   }/>
                        </div>
                        <button className="btn btn-sm btn-primary" type="submit"><i
                            className="fa fa-paper-plane text-sm fa-2x">&nbsp;Add</i></button>
                    </form>
                )}

            </div>

        </SlidingPane>
    );
}

export default AddSong;
