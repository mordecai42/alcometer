import { useEffect, useState } from 'react';
import './registro.css'

function Registros() {
    const [showModal, setShowModal] = useState(false)
    const [showRegister, setShowRegister] = useState(false)
    const [showManual, setShowManual] = useState(false)
    const [clientes, setClientes] = useState([])
    const [search, setSearch] = useState('')
    const [filteredClientes, setFilteredClientes] = useState(clientes)
    const [selectedUser, setSelectedUser] = useState(null)

    const [nombre, setNombre] = useState('')
    const [token, setToken] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [usuario, setUsuario] = useState('')
    const [placa, setPlaca] = useState('')
    const [telefono, setTelefono] = useState('')
    const [celular, setCelular] = useState('')
    const [ficha, setFicha] = useState('')
    const [carro, setCarro] = useState('')
    const [permiso, setPermiso] = useState('')

    useEffect(() => {
        setFilteredClientes(clientes)
    }, [clientes])

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await fetch('http://localhost:5000/mostrarUsuario')
                if(!response.ok){
                    throw new Error('No se pudo obtener los datos del usuario')
                }
                const data = await response.json()
                setClientes(data)
            }catch(error){
                console.error('Error al obtener los datos: ', error.message)
            }
        }
        fetchData()
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = {
            nombre: nombre,
            token: token,
            email: email,
            password: password,
        };
    
        try {
            const response = await fetch('http://localhost:5000/usuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
    
            if (!response.ok) {
                throw new Error('No se pudo completar la solicitud');
            }
    
            const data = await response.json();
            console.log('API Response: ', data);

            if(response.status === 201){
                alert("Registrado correctamente.")
                setNombre('')
                setToken('')
                setEmail('')
                setPassword('')
            }
        } catch (error) {
            console.error('Error al enviar los datos:', error.message);
            alert('Hubo un problema al procesar la solicitud. Por favor, inténtalo de nuevo más tarde.');
        }
    };
    
    const handleSubmitUsuario = async (e) => {
        e.preventDefault();
        
        const formData = {
            nombre: usuario,
            placa: placa,
            telefono: telefono,
            celular: celular,
            ficha: ficha,
            carro: carro,
            permiso: permiso
        };

        try {
            const response = await fetch('http://localhost:5000/cliente', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
    
            if (!response.ok) {
                throw new Error('No se pudo completar la solicitud');   
            }
    
            const data = await response.json();
            console.log('API Response: ', data);

            if(response.status === 201){
                alert("Registrado correctamente.")
                setUsuario('');
                setPlaca('');
                setTelefono('');
                setCelular('');
                setFicha('');
                setCarro('');
                setPermiso('');
            }
        } catch (error) {
            console.error('Error al enviar los datos:', error.message);
            alert('Hubo un problema al procesar la solicitud. Por favor, inténtalo de nuevo más tarde.');
        }
    }

    const deleteCliente = async (clienteId) => {
        try {
            const response = await fetch(`http://localhost:5000/cliente/${clienteId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('No se pudo completar la solicitud');
            }

            setClientes((prevClientes) =>
                prevClientes.filter((cliente) => cliente.id !== clienteId)
            )

            alert('Registro eliminado correctamente');
        } catch (error) {
            console.error('Error al enviar la solicitud:', error.message);
            alert(
                'Hubo un problema al procesar la solicitud. Por favor, inténtalo de nuevo más tarde.'
            );
        }
    }

    const searchClientes = (e) => {
        e.preventDefault();

        if(search === ''){
            setFilteredClientes(clientes)
        }else{
            const filtered = clientes.filter((cliente) => cliente.nombre.toLowerCase().includes(search.toLowerCase()));
            setFilteredClientes(filtered);
        }
    }

    const toggleModal = (user) => {
        setShowModal(!showModal)
        setSelectedUser(user)
    }

    const registerModal = () => {
        setShowRegister(!showRegister)
    }

    const registerManual = () => {
        setShowManual(!showManual)
    }

    return(
        <>
            <div className="sidebar">
                <div className="logo">
                    <div className="logo-text">
                        <p className='span'>ALCO</p><p>METER</p>
                    </div>
                </div>
                <ul className="nav-list">
                    <li>
                        <a href="">
                            <span className="material-symbols-outlined">bar_chart_4_bars</span>
                            <p>Registros</p>
                        </a>
                    </li>
                    <li>
                        <a href="">
                            <span className="material-symbols-outlined">description</span>
                            <p>Registros pagados</p>
                        </a>
                    </li>
                    <div className="help">
                        <li>
                            <a href="/">
                                <span className="material-symbols-outlined">logout</span>
                                <p>Cerrar sesión</p>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <span className="material-symbols-outlined">help</span>
                                <p>Ayuda</p>
                            </a>
                        </li>
                    </div>
                </ul>
            </div>
            <section className="home-section">
                <div className="top-section">
                    <div className="profile">
                        <img src="/src/assets/profiles/prueba.jpg" alt="" />
                        <p>Jefferson gutierritos  </p>
                    </div>
                    <div className="container-search">
                        <form action="" method='get' className='search-bar'>
                            <input type="text" name="search" id="search" placeholder='Buscar registro' value={search} onChange={(event) => setSearch(event.target.value)} />
                            <button type="submit" onClick={searchClientes}>
                                <span className="material-symbols-outlined">search</span>
                            </button>
                        </form>
                    </div>
                    <button className="add-register" onClick={registerManual}>
                        <span className="material-symbols-outlined">add</span>
                        <h6>Añadir registro<br /> de forma manual</h6>
                    </button>
                    <button className="add-register" onClick={registerModal}>
                        <span className="material-symbols-outlined">add</span>
                        <h6>Ingresar personal</h6>
                    </button>
                </div>
                <div className="datos">
                    <div className="top-datos">
                        <div className="title">
                            <h1>Registros</h1>
                        </div>
                    </div>
                    {filteredClientes.map((cliente, index) => (
                        <div key={index}>
                            <div className="minimized">
                                <div className="color-table">
                                    <div className="data-table">
                                        <div className="right">
                                            <div className="data-right">
                                                <p>Fecha: {cliente.fecha}</p>
                                                <p>Nombre completo: {cliente.nombre}</p>
                                                <p>Placa: {cliente.placa}</p>
                                            </div>
                                        </div>
                                        <div className="left">
                                            <div className="actions">
                                                <button onClick={() => toggleModal(cliente)}>Mostrar todo</button>
                                                <button onClick={() => deleteCliente(cliente.id)}>Eliminar</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    {showModal && selectedUser && (
                        <div className="table" id='modal'>
                            <div className="table-modal">
                                <div className="color-table">
                                    <div className="datos-table">
                                        <div className="right">
                                            <p>Fecha: {selectedUser.fecha}</p>
                                            <p>Nombre completo: {selectedUser.nombre}</p>
                                            <p>Placa: {selectedUser.placa}</p>
                                            <p>Teléfono: {selectedUser.telefono}</p>
                                        </div>
                                        <div className="left">
                                            <p>Celular: {selectedUser.celular}</p>
                                            <p>Ficha: {selectedUser.ficha}</p>
                                            <p>Carro: {selectedUser.carro}</p>
                                            <p>Permiso: {selectedUser.permiso}</p>
                                        </div>
                                    </div>
                                    <div className="btns-modal">
                                        <button onClick={toggleModal}>Cerrar modal</button>
                                        <button onClick={() => deleteCliente(selectedUser.id)}>Eliminar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {showRegister && (
                        <div className="table" id="modal">
                            <div className="card-register">
                                <form onSubmit={handleSubmit} encType='multipart/form-data'>
                                    <div className="top">
                                        <div className="right">
                                            <label htmlFor="nombre">Nombre completo</label>
                                            <input type="text" name="nombre" id="nombre" value={nombre} onChange={(event) => setNombre(event.target.value)} />
                                            <label htmlFor="token">Token</label>
                                            <input type="text" name="token" id="token" value={token} onChange={(event) => setToken(event.target.value)} />
                                            <label htmlFor="email">Email</label>
                                            <input type="email" name="email" id="email" value={email} onChange={(event) => setEmail(event.target.value)} />
                                            <label htmlFor="password">Contraseña</label>
                                            <input type="password" name="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)} />
                                        </div>
                                        <div className="left">
                                            <img src="/src/assets/profiles/prueba.jpeg" alt="" />
                                        </div>
                                    </div>
                                    <div className="btn-modal">
                                        <button onClick={registerModal}>Cerrar modal</button>
                                        <button type="submit">Registrar</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                    {showManual && (
                        <div className="table" id="table">
                            <div className="register-manual">
                                <form onSubmit={handleSubmitUsuario}>
                                    <div className="top">
                                        <div className="right">
                                            <label htmlFor="nombre">Nombre</label>
                                            <input type="text" name="nombre" id="nombre" value={usuario} onChange={(event) => setUsuario(event.target.value)} />
                                            <label htmlFor="placa">Placa</label>
                                            <input type="text" name="placa" id="placa" value={placa} onChange={(event) => setPlaca(event.target.value)} />
                                            <label htmlFor="telefono">Teléfono</label>
                                            <input type="text" name="telefono" id="telefono" value={telefono} onChange={(event) => setTelefono(event.target.value)} />
                                            <label htmlFor="celular">Celular</label>
                                            <input type="text" name="celular" id="celular" value={celular} onChange={(event) => setCelular(event.target.value)} />
                                        </div>
                                        <div className="left">
                                            <label htmlFor="Ficha">Ficha</label>
                                            <input type="text" name="ficha" id="ficha" value={ficha} onChange={(event) => setFicha(event.target.value)} />
                                            <label htmlFor="carro">Carro</label>
                                            <input type="text" name="carro" id="carro" value={carro} onChange={(event) => setCarro(event.target.value)} />
                                            <label htmlFor="permimso">Permiso</label>
                                            <input type="text" name="permiso" id="permiso" value={permiso} onChange={(event) => setPermiso(event.target.value)} />
                                        </div>
                                    </div>
                                    <div className="bottom">
                                        <button onClick={registerManual}>Cerrar modal</button>
                                        <button type="submit">Registrar</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </>
    )
}

export default Registros;