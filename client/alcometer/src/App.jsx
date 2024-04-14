import { Routes, Route } from 'react-router-dom'
import Login from './components/login/Login'
import Registros from './components/registro/Registro'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/registros' element={<Registros />} />
    </Routes>
  )
}

export default App
