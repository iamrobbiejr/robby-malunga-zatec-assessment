import React, {useState} from 'react';
import Footer from "../includes/Footer.jsx";
import axiosClient from "../../axios.jsx";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import router from "../../router.jsx";
import {BeatLoader} from "react-spinners";
import {css} from "@emotion/react";

const override = css`
    display: block;
    margin: 0 auto;
`;

function Login(props) {

    const {setCurrentUser, setUserToken} = useStateContext();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [remember, setRemember] = useState(false)
    const [error, setError] = useState({__html: ''})
    const [loading, setLoading] = useState(false)

    const handleLogin = (e) => {
        setLoading(true)
        e.preventDefault();

        if (email === '' || password === "") {
            setError({__html: 'Required: Please fill all fields'})
            setLoading(false)
            return;
        }


        axiosClient.post('/login', {email, password, remember})
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
                                    <h4 className="text-white font-weight-bolder text-center mt-2 mb-0">Sign in</h4>
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
                                <form onSubmit={handleLogin} role="form" className="text-start">
                                    <div className="input-group input-group-outline my-3">
                                        <label className="form-label">Email</label>
                                        <input disabled={loading} value={email}
                                               onChange={(e) => setEmail(e.target.value)} type="email"
                                               className="form-control"/>
                                    </div>
                                    <div className="input-group input-group-outline mb-3">
                                        <label className="form-label">Password</label>
                                        <input disabled={loading} value={password}
                                               onChange={(e) => setPassword(e.target.value)}
                                               type="password" className="form-control"/>
                                    </div>
                                    <div className="form-check form-switch d-flex align-items-center mb-3">
                                        <input disabled={loading} className="form-check-input" type="checkbox"
                                               id="rememberMe"
                                               checked={remember} onChange={() => setRemember(!remember)}/>
                                        <label className="form-check-label mb-0 ms-3" htmlFor="rememberMe">Remember
                                            me</label>
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
                                                    in
                                                </button>
                                            </div>
                                            <a href={'/register'}>
                                                <p className="mt-4 text-sm text-center">
                                                    Don't have an account? Register
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

export default Login;
