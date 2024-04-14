import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import './login.css'

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const navigate = useNavigate();

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try{
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email, password, token
                })
            })

            if(response.ok){
                navigate('/registros')
            }else{
                alert("Los datos son incorrectos, intente de nuevo")
            }
        }catch(error){
            console.log("Error al verificar los datos: ", error)
        }
    }

    return (
        <>
            <div className="content">
                <header>
                    <div className="letter-logo">AM</div>
                    <nav>
                        <ul className="nav-links">
                            <li><a href="">Inicio</a></li>
                            <li><a href="">Sobre nosotros</a></li>
                            <li><a href="">Tienda</a></li>
                            <li><a href="">Contáctanos</a></li>
                        </ul>
                    </nav>
                    <div className="logo">
                        <p><span>ALCO</span>METER</p>
                    </div>
                </header>
                <div className="container">
                    <div className="container-form">
                        <form method="post" onSubmit={handleFormSubmit}>
                            <h2>¡Bienvenido!</h2>
                            <h3>Por favor inicia sesión</h3>
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" id="email" value={email} onChange={(event) => setEmail(event.target.value)} />
                            <label htmlFor="password">Contraseña</label>
                            <input type="password" name="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)} />
                            <label htmlFor="token">Token de seguridad</label>
                            <input type="text" name="token" id="token" value={token} onChange={(event) => setToken(event.target.value)} />
                            <input type="submit" value="Entrar" />
                            <p>No tienes una cuenta? <em>Contacta con un superior para agregarte al sistema.</em></p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;