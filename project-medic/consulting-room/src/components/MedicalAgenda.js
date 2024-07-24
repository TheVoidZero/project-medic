import React, { useState, useEffect } from 'react';
import { getAllAccountsDoctors, getCitaByEmail, datingService } from './Services.js';
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Calendar from 'react-calendar';
import Globals from './Globals.js';
import 'react-calendar/dist/Calendar.css';
import './AccountActivation.js';
import '../css/MedicalAgenda.css';

const MedicalAgenda = () => {
  const [selectedDate, setSelectedDate] = useState(new Date()); // Guarda la fecha seleccionada en el calendario.
  const [dating, setDating] = useState([]); // Guarda las citas que se han tenido o se tendrán.
  const [datingFilter, setDatingFilter] = useState([]); // Guarda las citas que serán filtradas dependiendo del doctor que esté logueado.
  const [openModal, setOpenModal] = useState(false); // Permite abrir el modal que se encarga de mostrar un calendario.
  const [data, setAccountData] = useState(Globals.getAccountData()[0]); // Trae los datos del usuario guardados del storage.
  const navigate = useNavigate(); // Permite la navegación entre vistas.
  const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  /**
   * En cuanto entra a la página realiza una consulta para checar las citas que se tienen actualmente y las filtra dependiendo del doctor
   */
  useEffect(() => {
    // Condiciona que si el usuario es paciente solo aparecerán las citas relacionadas a él
    if (data.tipo_de_cuenta === 'paciente') {
      const fetchDatingInitial = async () => {
        try {
          const citasData = await getCitaByEmail(data.email);
          setDating(citasData);
        } catch (error) {
          console.error('Error al obtener citas:', error);
        }
      };

      fetchDatingInitial();
    }
    // Condiciona que si es doctor entonces filtrará solo las citas relacionadas a él
    else if (data.tipo_de_cuenta === 'doctor') {
      const handleSearchDating = async () => {
        try {
          const selectedMonth = selectedDate.getMonth() + 1; // Los meses en JavaScript son de 0-11, sumamos 1 para que sean de 1-12
          const selectedYear = selectedDate.getFullYear();
          const dating1 = await datingService.getDatingFilter(data.nombre);
          const datingFilter1 = dating1.filter(cita => {
            const [day, month, year] = cita.dia_cita.split('/').map(Number);
            return (
              cita.doctor_seleccionado === data.nombre &&
              month === selectedMonth &&
              year === selectedYear
            );
          });
          setDatingFilter(datingFilter1);
          setOpenModal(false);
        } catch (error) {
          console.error('Error al buscar citas:', error);
        }
      };
      handleSearchDating();
    }
  }, []);

  /**
   * Revisa qué días son fines de semana para deshabilitarlos ya que no hay citas esos días
   *
   * @param { Date, String } { date, view } Recibe una variable tipo date el cual es la fecha de los fines de semana y un string que trae el mes
   * @return {Boolean} dependiendo si son días fines de semana o no regresará un booleano
   */
  const disabilityWeekends = ({ date, view }) => {
    if (view === 'month' && (date.getDay() === 0 || date.getDay() === 6)) {
      return true;
    }
    return false;
  };

  /**
   * Se activa para que se haga el filtro del mes seleccionado
   */
  const fetchDating = async () => {
    try {
      const selectedMonth = selectedDate.getMonth() + 1;
      const selectedYear = selectedDate.getFullYear();
      const dating = await datingService.getDatingFilter(data.nombre);
      const datingFilter = dating.filter(cita => {
        const [day, month, year] = cita.dia_cita.split('/').map(Number);
        return (
          cita.doctor_seleccionado === data.nombre &&
          month === selectedMonth &&
          year === selectedYear
        );
      });
      setDatingFilter(datingFilter);
      setOpenModal(false);
    } catch (error) {
      console.error('Error al buscar citas:', error);
    }
  };

  /**
 * Limpia los datos del usuario del localStorage y redirige al Login
 *
 *
 */
  const logout = (e) => {
    Globals.clearAccountData();
    navigate('/login');
  };

  return (
    <div className="container">
      <div className="sidebar">
        {data.tipo_de_cuenta === 'paciente' ?
          (<button className="menu-boton" onClick={() => navigate("/medicalformulary")}>Sacar citas</button>) :
          (<button className="menu-boton" onClick={() => navigate("/accountactivation")}>Activar Cuentas</button>)}
        {data.tipo_de_cuenta === 'paciente' ? (
          <div>
            <h3>Perfil</h3>
            <h4>{data.nombre}</h4>
            <h4>{data.fecha_de_nacimiento}</h4>
            <h4>{data.numero_de_telefono}</h4>
            <h4>{data.genero}</h4>
            <h4>{data.tipo_de_sangre}</h4>
            <p>{data.enfermedades_cronicas}</p>
          </div>
        ) : (
          <div>
            <h3>Perfil</h3>
            <h4>{data.nombre}</h4>
            <h4>{data.especialidad}</h4>
          </div>
        )}
        <button onClick={logout}>Cerrar Session</button>
      </div>
      <div className="content">
        <div>
          {data.tipo_de_cuenta !== 'paciente' ? (
            <button onClick={() => setOpenModal(true)}>
              {meses[selectedDate.getMonth()]}
            </button>
          ) : null}
        </div>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>{data.tipo_de_cuenta === 'paciente' ? 'El doctor que lo atendió fue: ' : 'Atendió al paciente: '}</th>
                <th>{data.tipo_de_cuenta === 'paciente' ? 'Fecha de la cita' : 'Hora de cita'}</th>
                <th>Hora de la cita</th>
              </tr>
            </thead>
            <tbody>
              {data.tipo_de_cuenta === 'paciente' ? (
                 dating.slice().reverse().map(item => (
                  <tr key={item.id}>
                    <td>{item.doctor_seleccionado}</td>
                    <td>{item.dia_cita}</td>
                    <td>{item.hora_cita}</td>
                  </tr>
                ))
              ) : (
                datingFilter.map(item => (
                  <tr key={item.id}>
                    <td>{item.doctor_seleccionado}</td>
                    <td>{item.hora_cita}</td>
                    <td>{item.dia_cita}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <Modal
            open={openModal}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <Box sx={{ ...style, width: 400 }}>
              <Calendar
                onChange={setSelectedDate}
                value={selectedDate}
                view="year"
                maxDetail="year"
                tileDisabled={disabilityWeekends}
              />
              <button onClick={fetchDating}>Close</button>
            </Box>
          </Modal>
        </div>
      </div>
    </div>
  );
};

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

export default MedicalAgenda;