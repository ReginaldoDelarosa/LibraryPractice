import React, { useContext, useEffect } from 'react'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'
import Registro from './Registro'
import RegistroLibro from './RegistroLibros'
import RegistroPrestamos from './RegistroPrestamos'
import AuthContext from '../context/AuthContext'

const Prestamos = () => {

    const value = useContext(AuthContext);

    const navigate = useNavigate()
    const [user, setUser] = React.useState(null)
    React.useEffect(() => {
        if (auth.currentUser) {
            if (value?.tipo[0]?.tipo === "A") {
                navigate("/admin")
            }
            setUser(auth.currentUser)
            console.log(auth.currentUser);
        } else {
            console.log('No hay un usuario logueado');
            navigate('/')
        }
    }, [navigate])
    return (
        <div>
            {
                user && (<h3>Hola, <span className='text-primary'>{value?.tipo[0]?.nombre} {value?.tipo[0]?.apellido}</span></h3>)
            }

            {
                user && (
                    <RegistroPrestamos user={user} />
                )
            }
        </div>
    )
}

export default Prestamos