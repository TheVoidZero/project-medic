import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { getUserByEmail, getDoctorByEmail } from './Services.js';
import Globals from './Globals.js'
import '../css/Login.css';

export default function Login() {

  const navigate = useNavigate(); //Permite la navegacion entre pantallas
  const [email, setEmail] = useState(''); //Guarda la variable del email ingresado
  const [password, setPassword] = useState(''); //Guarda la variable del password ingresado
  const [isValidEmail, setIsValidEmail] = useState(true); //Cambia de valor dependiendo si el email ingresado es valido
  const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]+$/; //Exprecion regular que valida el correo electrionico

  /**
   * Realiza la actualizacion de la variable email y verifica si es valido
   *
   * @param {Event} e
   */
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setIsValidEmail(emailRegex.test(e.target.value));
  };

  /**
   *  Realiza la llamada de api para verificar si el usuario ingresado se encuentra en la base de datos
   *
   */
  const fetchData = async () => {
    try {
      const accountsData = await getUserByEmail(email);
      //Verifica si el usuario ingresado esta en la base de datos de pacientes
      if (accountsData.email == email && accountsData.password == password && accountsData.isActive) {
        Globals.addAccountItem(accountsData)
        navigate('/medicalagenda');
      }
      else {
        const accountsDoctor = await getDoctorByEmail(email)
        //Verifica si el usuario ingresado esta en la base de datos de doctores
        if (accountsDoctor.email == email && accountsDoctor.password == password) {
          Globals.addAccountItem(accountsDoctor)
          navigate('/medicalagenda');
        } else {
          alert('Esa cuenta no existe')
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  return (
    <div className='content-login'>
      <div className='form-login' >
        <h1 style={{ fontSize: '3vw', textAlign: 'center' }} >Iniciar Sesion</h1>
        <div className='Password'>
          <div>
            <label htmlFor="email" style={{ fontSize: '1.5vw' }}>Correo electrónico:</label>
            <input style={{ fontSize: '1vw' }}
              placeholder='ingrese su correo electronico'
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}/>
          </div>
          <div>
            <label style={{ fontSize: '1.5vw' }}>Contraseña:</label>
            <input style={{ fontSize: '1vw' }}
              type="password" placeholder='ingrese su contraseña' onChange={e => setPassword(e.target.value)} />
          </div>
          <button
            onClick={e => fetchData()} disabled={(email !== '' && isValidEmail ? false : true)}>
            Continuar
          </button>
          <button onClick={e => navigate('/CreateAccount')}>
            Crear Cuenta
          </button>
        </div>
      </div>
      <div className='footer-opcions'>
        <button className='opcion-aboutus' onClick={e => navigate("/aboutus")}>
          <p>Nosotros</p>
        </button>
        <button className='opcion-aboutus' onClick={e => navigate("/contactoffice")}>
          <p>Contactanos</p>
        </button>
      </div>
    </div>
  );
}