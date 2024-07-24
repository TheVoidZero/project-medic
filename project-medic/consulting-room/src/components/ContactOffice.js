import React from 'react'
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import '../css/Information.css'

const Contactanos = () => {
    const navigate = useNavigate();

    return (
        <div className='Fondo'>
            <button className='arrow-back' onClick={e => navigate('/login')}>
                <AiOutlineArrowLeft className='icons' />
            </button>
            <div className='Texto'>
                <h1>Contactanos</h1>
                <div >
                    <h3>Numero de Telefonico:</h3>
                    <p>221 189 7448</p>
                    <p>221 189 7448</p>
                </div>
                <div >
                    <h3>NOS PUEDES ENCONTRAR EN LA SIGUIENTE DIRECCION:</h3>
                    <p>92840, V. Fernández LB, Loma Linda, Túxpam de Rodríguez Cano, Ver.</p>
                </div>
                <div >
                    <h3 >Horario de atencion:</h3>
                    <p >09:00--17:00</p>
                </div>
                <div >
                    <h3>Email:</h3>
                    <p>HospitalSanJose@gmail.com</p>
                </div>
            </div>
            <div className='footer-opcions'>
                <button className='opcion-aboutus' onClick={e => navigate("/aboutus")}>
                    <p>Nosotros</p>
                </button>
            </div>
        </div>
    )
}

export default Contactanos