import React, { useState, useEffect } from 'react'
import './InformacionCitas.css';
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Globals from './Globals.js'
import { getAllAccountsDoctors, getCitaByEmail, citasService } from './services.js';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const InformacionCitas = () => {
  const [value, onChange] = useState(new Date());
  const [confirmDate, setConfirmDate] = useState(new Date());
  const hoy = new Date();
  const day = hoy.getDate();;
  const month = hoy.getMonth() + 1;
  const year = hoy.getFullYear();
  const currentDate = `${day}/${month}/${year}`;
  const infoUser = 'pacient';
  const [citas, setCitas] = useState([])
  const [citasFiltradas, setCitasFiltradas] = useState([])
  const [accountData, setAccountData] = useState(Globals.getAccountData());
  const data = accountData[0];


  const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = async () => {
    setConfirmDate(value)
    setOpen(false);
    fetchCitas();
  };
  const desabilitarFines = ({ date, view }) => {
    if (view === 'month' && (date.getDay() === 0 || date.getDay() === 6)) {
      return true;
    }
    return false;
  };
  useEffect(() => {
    if (data.tipo_de_cuenta == 'paciente') {
      const fetchCitas = async () => {
        try {
          const citasData = await getCitaByEmail(data.email);
          setCitas(citasData)
        } catch (error) {
          console.error('Error al obtener citas:', error);
        }
      };

      fetchCitas();
    }
    else if (data.tipo_de_cuenta == 'doctor') {
      const handleBuscarCitas = async () => {
        try {

          const formattedDate = hoy.toLocaleDateString('en-GB', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
          });
          const citas = await citasService.getCitasFiltradas(data.nombre, formattedDate);
          const citasFiltradas = citas.filter(cita => cita.doctor_seleccionado === data.nombre);
          setCitasFiltradas(citasFiltradas);
        } catch (error) {
          console.error('Error al buscar citas:', error);
        }
      };
      handleBuscarCitas();
    }
  }, []);
    const fetchCitas = async () => {
      try {
        const formattedDate = confirmDate.toLocaleDateString('en-GB', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        });
        const citas = await citasService.getCitasFiltradas(data.nombre, formattedDate);
        const citasFiltradas = citas.filter(cita =>
          cita.doctor_seleccionado === data.nombre 
        );
        setCitasFiltradas(citasFiltradas);
      } catch (error) {
        console.error('Error al buscar citas:', error);
      }
    };

    const logout = (e) =>{
      Globals.clearAccountData();
      navigate('/login')
    } 
  return (
    <div className="container">
      <div className="sidebar">
        {data.tipo_de_cuenta=='paciente'?
        (<button className="menu-boton" onClick={e => navigate("/FormularioMedico")}>Sacar citas</button>):
        (<button className="menu-boton" onClick={e => navigate("/ActivacionDeCuentas")}>Activar Cuentas</button>)}
        <button className="menu-boton">Revisar Citas</button>
       { data.tipo_de_cuenta=='paciente'?(<div>
        <h3>Perfil</h3>
        <h4>{data.nombre}</h4>
        <h4>{data.fecha_de_nacimiento}</h4>
        <h4>7831347315</h4>
        <h4>Masculino</h4>
        <h4>A+</h4>
        <h4>Cancer</h4></div>):
        (<div>
          <h3>Perfil</h3>
          <h4>{data.nombre}</h4>
          <h4>{data.especialidad}</h4>
          </div>)}
        
        <button onClick={e => logout(e)}>Logout</button>
      </div>
      <div className="content">
        <div>
          {data.tipo_de_cuenta!='paciente'?(<button onClick={e => handleOpen()}>{infoUser != 'paciente' ? meses[confirmDate.getMonth()] : String(confirmDate.getDate()).padStart(2, '0')}</button>):null}
        </div>
        <div className='table-container'>
          <table className="table">
            <thead>
              <tr>
                <th>{data.tipo_de_cuenta == 'paciente' ? 'El doctor que lo atendio fue: ' : 'Atendio al paciente: '}</th>
                <th>{data.tipo_de_cuenta == 'paciente' ? 'fecha de la cita' : 'Hora de cita'}</th>
                <th>Hora de la cita</th>
              </tr>
            </thead>

            {data.tipo_de_cuenta == 'paciente' ? (<tbody>
              {citas.map(item => (
                <tr key={item.id}>
                  <td>{item.doctor_seleccionado}</td>
                  <td>{item.dia_cita}</td>
                  <td>{item.hora_cita}</td>
                </tr>
              ))}
            </tbody>) : (<tbody>
              {citasFiltradas.map(item => (
                <tr key={item.id}>
                  <td>{item.doctor_seleccionado}</td>
                  <td>{item.hora_cita}</td>
                  <td>{item.dia_cita}</td>
                </tr>
              ))}
            </tbody>)}
          </table>
          <Modal
            open={open}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <Box sx={{ ...style, width: 400 }}>
              <Calendar
                onChange={onChange}
                value={value}
                tileDisabled={desabilitarFines}
              />
              <button onClick={e => handleClose()}>Close</button>
            </Box>
          </Modal>
        </div>
      </div>
    </div>
  );

}

export default InformacionCitas
