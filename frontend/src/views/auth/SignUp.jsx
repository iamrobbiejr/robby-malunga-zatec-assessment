import React, {useState} from 'react';
import Footer from "../includes/Footer.jsx";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import axiosClient from "../../axios.jsx";
import router from "../../router.jsx";
import {BeatLoader} from "react-spinners";
import {css} from "@emotion/react";

const override = css`
    display: block;
    margin: 0 auto;
`;

function SignUp(props) {

    const {setCurrentUser, setUserToken} = useStateContext();

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password_confirmation, setPasswordConfirmation] = useState('')
    const [error, setError] = useState({__html: ''})
    const [loading, setLoading] = useState(false)

    const handleRegister = (e) => {
        setLoading(true)
        e.preventDefault();

        if (name === '' || email === '' || password === "" || password_confirmation === '') {
            setError({__html: 'Required: Please fill all fields'})
            setLoading(false)
            return;
        }

        axiosClient.post('/signup', {name, email, password, password_confirmation})
            .then(({data}) => {
                console.log("data: ", data);
                setCurrentUser(data.user)
                setUserToken(data.token)
                router.navigate('/')
                window.location.reload();
            })
            .catch((error) => {

                if (error.response) {
                    setError({__html: error.response.data.error})

                    console.error("error: ", error.response.data.error)
                    setLoading(false)
                }
                setLoading(false)
            })

    }

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
                                    <h4 className="text-white font-weight-bolder text-center mt-2 mb-0">Sign Up</h4>
                                    <div className="row mt-3">

                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                {error.__html && (
                                    <div className="alert alert-danger p-3 text-sm text-white" role="alert"
                                         dangerouslySetInnerHTML={error}>

                                    </div>
                                )}
                                <form role="form" onSubmit={handleRegister} className="text-start">
                                    <div className="input-group input-group-outline my-3">
                                        <label className="form-label">Name</label>
                                        <input disabled={loading} type="text" className="form-control" value={name}
                                               onChange={(e) => setName(e.target.value)}/>
                                    </div>
                                    <div className="input-group input-group-outline my-3">
                                        <label className="form-label">Email</label>
                                        <input disabled={loading} type="email" className="form-control" value={email}
                                               onChange={(e) => setEmail(e.target.value)}/>
                                    </div>
                                    <div className="input-group input-group-outline mb-3">
                                        <label className="form-label">Password</label>
                                        <input disabled={loading} type="password" className="form-control"
                                               value={password}
                                               onChange={(e) => setPassword(e.target.value)}/>
                                    </div>
                                    <div className="input-group input-group-outline mb-3">
                                        <label className="form-label">Password Confirmation</label>
                                        <input disabled={loading} type="password" className="form-control"
                                               value={password_confirmation}
                                               onChange={(e) => setPasswordConfirmation(e.target.value)}/>
                                    </div>
                                    {loading && (
                                        <div className="container mx-auto text-center p-lg-4">
                                            <BeatLoader
                                                color={"#E53371"}
                                                loading={loading}
                                                cssOverride={override}
                                                size={10}
                                                aria-label="Loading Spinner"
                                                data-testid="loader"/>

                                        </div>

                                    )}
                                    {!loading && (
                                        <>
                                            <div className="text-center">
                                                <button type="submit"
                                                        className="btn bg-gradient-primary w-100 my-4 mb-2">Sign
                                                    Up
                                                </button>
                                            </div>
                                            <a href={'/login'}>
                                                <p className="mt-4 text-sm text-center">
                                                    Already have an account? Sign In
                                                </p>
                                            </a>
                                        </>
                                    )}

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
