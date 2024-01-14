import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom'
import Inicio from './components/Inicio'
import Login from './components/Login'
import Admin from './components/Admin'
import Navbar from './components/Navbar'
import { useEffect, useState } from 'react'
import { auth, db } from './firebase'
import { collection, query, where, getDocs, onSnapshot } from "firebase/firestore";
import Prestamos from './components/Prestamos'
import AuthContext from './context/AuthContext'


function App() {
  const [firebaseUser, setFirebaseUser] = useState({})
  const [tipo, setTipo] = useState('')
  const consultarUsuario = async (email) => {

    const q = query(collection(db, "usuarios"), where("email", "==", email));

    await onSnapshot(q, (query) => {
      setTipo(query.docs.map((doc) => {
        return { ...doc.data(), id: doc.id }
      }))
    })
  }

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        setFirebaseUser(user)

        consultarUsuario(user.email)
      } else {
        setFirebaseUser(null)
      }
    })


  }, [])



  return firebaseUser !== false ? (
    <AuthContext.Provider value={{ firebaseUser, tipo }}>
      <Router>
        <div className='container fluid'>
          <Navbar firebaseUser={firebaseUser} tipo={tipo} />
          <Routes>
            <Route path='/' element={<Inicio />} />
            <Route path='login' element={<Login />} />
            <Route path='admin' element={<Admin />} />
            <Route path="prestamos" element={<Prestamos />} />
          </Routes>
        </div>
      </Router>
    </AuthContext.Provider>
  ) :
    (<p>Loading...</p>)
}

export default App
