import React, { useContext } from 'react'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'
import Registro from './Registro'
import RegistroLibro from './RegistroLibros'
import RegistroPrestamos from './RegistroPrestamos'
import AuthContext from '../context/AuthContext'

const Admin = () => {
    const navigate = useNavigate()
    const [user, setUser] = React.useState(null)
    const value = useContext(AuthContext);
    React.useEffect(() => {
        if (auth.currentUser) {
            if (value?.tipo[0]?.tipo !== "A") {
                navigate("/prestamos")
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
                user && (<h3>Hola, <span className='text-primary'>{user.email}</span></h3>)
            }

            {
                user && (
                    <RegistroLibro user={user} />
                )
            }
        </div>
    )
}

export default Admin