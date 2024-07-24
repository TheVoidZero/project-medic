import React from 'react'
import urlImage from '../images/Banner.jpg';
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import '../css/Information.css'

const AboutUs = () => {
  const navigate = useNavigate();

  const consultingInformation = 'En 1995, inauguramos nuestro consultorio médico con una visión clara: brindar atención de calidad y cercana a nuestra comunidad. Desde nuestros inicios, hemos crecido y evolucionado significativamente. En 2000, ampliamos nuestras instalaciones para incluir una sala de emergencias, lo que nos permitió atender casos críticos con mayor eficacia. En 2010, incorporamos tecnología de última generación en diagnóstico por imágenes, mejorando así la precisión de nuestros diagnósticos. Un hito importante llegó en 2015, cuando fuimos certificados como centro de excelencia en cuidados preventivos, destacando nuestro compromiso con la salud preventiva. En 2020, frente a la pandemia, demostramos nuestra resiliencia y adaptabilidad al implementar consultas virtuales, asegurando la continuidad de la atención médica. Hoy, seguimos avanzando con la misma dedicación y pasión, orgullosos de nuestros logros y comprometidos con la salud y el bienestar de nuestra comunidad.'
  return (
    <div className='background-image'>
      <div>
        <img src={urlImage} style={{
          width: '60vw', height: '20vh',
          borderRadius: '4rem', position: 'fixed', left: '20vw', top: '0vh',
        }} />
      </div>
      <div className='content-information'>
        <div style={{textAlign: 'center'}}>
          <h1>Sobre Nosotros</h1>
        </div>
        <p>{consultingInformation}</p>
      </div>
      <button className='arrow-back' onClick={e => navigate('/login')}>
      <AiOutlineArrowLeft className='icons'/>
      </button>
      <div className='footer-opcions'>
        <button className='opcion-aboutus' onClick={e => navigate("/aboutus")}>
          <p>Contactanos</p>
        </button>
      </div>
    </div>
  )
}

export default AboutUs