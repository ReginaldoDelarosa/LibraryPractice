import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth, db } from '../firebase'
import logo from '../img/icon-cuc.svg';
import { collection, query, where, getDocs } from "firebase/firestore";

const Navbar = ({ firebaseUser, tipo }) => {
    const navigate = useNavigate()
    const cerrarSesion = () => {
        auth.signOut()
            .then(() => {
                navigate("/")
            })
    }


    return (
        <nav className='navbar navbar-dark bg-dark mt-2'>
            <Link className='navbar-brand ms-3' to="/">
                <img src={logo} width="50" height="50" />
            </Link>
            <div className='d-flex'>
                <Link className='btn btn-dark' to="/">Inicio</Link>
                {
                    firebaseUser !== null && (tipo && tipo?.some((e) => e.tipo == 'A') ?
                        (<Link className='btn btn-dark' to="/admin">Admin</Link>) :
                        (<Link className='btn btn-dark' to="/prestamos">Préstamos</Link>))
                }
                {
                    firebaseUser !== null ?
                        (<button className='btn btn-dark'
                            onClick={cerrarSesion}
                        >Cerrar Sesión</button>) :
                        <Link className='btn btn-dark' to="/login">Login</Link>
                }

            </div>
        </nav>
    )
}

export default Navbar