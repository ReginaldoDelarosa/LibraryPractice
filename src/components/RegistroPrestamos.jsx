import React, { useState, useEffect } from 'react'
import { db } from '../firebase'
import { collection, doc, addDoc, onSnapshot, deleteDoc, updateDoc } from 'firebase/firestore'
import ModalPrestamos from './ModalPrestamos'
import ModalDescripcion from './ModalDescripcion'



const Formulario = ({ user }) => {
    const [listaLibros, setListaLibros] = useState([])
    const [busqueda, setBusqueda] = useState("")
    const [filtro, setFiltro] = useState([])
    const obtenerDatos = async () => {
        try {
            await onSnapshot(collection(db, 'libros'), (query) => {
                setListaLibros(query.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            })

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {

        obtenerDatos();
    }, [])

    useEffect(() => {
        if (busqueda.length > 2) {
            setFiltro(listaLibros.filter((e) => e.nombreLibro.includes(busqueda)))
        } else {
            setFiltro(listaLibros)
        }
    }, [busqueda, listaLibros])

    const toggleLoan = async (libro) => {
        try {
            const docRef = doc(db, 'libros', libro.id);
            if (libro.disponibilidad) {
                await updateDoc(docRef, {
                    id_usuarios: user.uid,
                    disponibilidad: false
                })
                await addDoc(collection(db, 'prestamos'), {
                    id_libros: libro.id,
                    id_usuarios: user.uid,
                    nombreLibro: libro.nombreLibro,
                    nombreAutor: libro.nombreAutor,
                    emailUsuario: user.email,
                    fecha: new Date()
                })

            } else {
                await updateDoc(docRef, {
                    id_usuarios: null,
                    disponibilidad: true
                })
            }
            obtenerDatos()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='container mt-5'>
            <h1 className='text-center'>CRUD DE PRESTAMOS</h1>
            <hr />
            <div className="row">
                <div className="col-sm-12 col-md-12">
                    <h4 className="text-center">Listado de PRESTAMOS</h4>
                    <input type="text"
                        className="form-control mb-2"
                        placeholder='Búsqueda'
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)} />
                    <br /><br />
                    <div className="table-responsive">
                        <table className='table table-striped table-hover table-sm'>
                            <thead className='text-center'>
                                <tr>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Autor</th>
                                    <th scope="col">A&ntilde;o</th>
                                    <th scope="col">Descripci&oacute;n</th>
                                    <th scope="col">Estado</th>
                                    <th scope="col">Acci&oacute;n</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    filtro.map(item => (
                                        <tr key={item.id} className='align-middle'>
                                            <td className="small">{item.nombreLibro}</td>
                                            <td className="small">{item.nombreAutor}</td>
                                            <td className="small">{item.año}</td>
                                            <td className="small"><ModalDescripcion descripcion={item.descripcion}/></td>
                                            <td className='small text-nowrap'>{item.disponibilidad ? "Disponible" : "No disponible"}</td>
                                            <td>
                                                <div className="d-grid gap-2 d-block">
                                                    {
                                                        item.disponibilidad ? (<button className="btn btn-danger btn-sm" type='button' onClick={() => toggleLoan(item)}>Prestar</button>)
                                                            : (!item.disponibilidad && user.uid === item.id_usuarios) && (<button className="btn btn-danger btn-sm" type='button' onClick={() => toggleLoan(item)}>Devolver</button>)}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    )
}


export default Formulario