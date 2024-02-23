import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { logoutAdmin } from '../actions/adminActions';

export default function Navbar() {

    const userstate = useSelector(state => state.loginUserReducer)
    const adminloginstate = useSelector(state => state.adminloginReducer)
    const { currentAdmin } = adminloginstate
    const dispatch = useDispatch()

    return (
        <div>
            <nav className="navbar navbar-expand-lg shadow-lg p-3 mb-5 navbar-dark bg-black  fixed-top">

                <div className="container-fluid">
                    
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" ></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">

                            {
                                currentAdmin ? (


                                <div className="dropdown m-2">

                                    <a style={{ color: 'white', width: '120px' }} className="dropdown-toggles" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                        <h15>Hi, {currentAdmin.AdminName}</h15> <img src='https://static.wixstatic.com/media/618c8c_5f176f88792f40609c74309e7f6f2eb2~mv2.png' style={{ height: '30px', height: '30px' }} />
                                    </a>



                                    <ul class="dropdown-menu text-center" style={{ minWidth: '7rem ' }} aria-labelledby="dropdownMenuButton1">

                                        <li><a className="dropdown-item" href="/admin"><h9>Profile</h9></a></li>

                                        <li><a className="dropdown-item" href="#" onClick={() => { dispatch(logoutAdmin()) }}><li><h9>Logout</h9></li></a></li>
                                    </ul>

                                </div>
                            ) : (

                                <li className="nav-item mt-1">
                                    <a className="nav-link " href="/login">
                                        <h15>Login</h15>
                                    </a>
                                </li>
                            )}


                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}
