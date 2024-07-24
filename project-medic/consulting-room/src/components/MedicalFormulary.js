import React, { useState, useEffect } from 'react'
import { getAllAccountsDoctors, postDating } from './Services.js';
import { useNavigate } from "react-router-dom";
import Calendar from 'react-calendar';
import Globals from './Globals.js'
import 'react-calendar/dist/Calendar.css';
import '../css/Login.css';
import '../css/MedicalAgenda.css';

const MedicalFormulary = () => {

    const [doctor, setDoctor] = useState(""); //Guardara el doctor seleccionado para su cita.
    const [speciality, setSpeciality] = useState(""); //Guardara la especialidad que necesita para ver que medico tomara su cita.
    const [reasonMedical, setReasonMedical] = useState(""); //Guarda la razon por la cual el paciente ira al medico.
    const [hourDating, setHourDating] = useState(""); //Guarda la hora de la cita medica.
    const [data, setAccountData] = useState(Globals.getAccountData()[0]); // Trae los datos del usuario guardados del storage.
    const [gender, setGender] = useState(data.genero); //Guarda el genero del usuario logueado que hara la cita.
    const [accountDataDoctors, setAccountDataDoctors] = useState([]); //Guarda todos los doctores disponibles
    const [doctorSpeciality, setDoctorSpeciality] = useState([]);  //Guarda la especidad de los doctores
    const [today, setToday] = useState(new Date()); //Guarda la fecha actual para el calendario.
    const navigate = useNavigate(); //Permite la navegacion entre vistas
    const medicalArea = { area: 'General', area1: 'Pediatria', area2: 'Oftamologo' } //Obtiene las areas que dispone el consultorio
    //Guarda los horarios de atencion
    const timetable = { h1: "09:00", h2: '09:30', h3: '10:00', h4: '10:30', h5: '11:00', h6: '11:30', h7: '12:00', h8: '12:30', h9: '13:00', h10: '13:30', h11: '14:00', h12: '14:30', h13: '15:00', h14: '15:30', h15: '16:00', h16: '16:30' }
    const timetableEntries = Object.entries(timetable); // Convierte el objeto en una lista de pares clave-valor

    /**
    * Hace una llamada de api para poder traer los doctores disponibles
    *
    */
    useEffect(() => {
        const fetchData = async () => {
            try {
                const accountsData = await getAllAccountsDoctors();
                setAccountDataDoctors(accountsData)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData()
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
     * Permite el cambio entre especialidades para filtrar a los doctores de esa especialidad
     *
     * @param {String} specialtySelected guarda la especialidad que ha seleccionado el usuario
     */
    const changeSpecialty = (specialtySelected) => {
        setSpeciality(specialtySelected)
        const doctorsFiltered = accountDataDoctors.filter(
            medico => medico.especialidad === specialtySelected
        );
        setDoctorSpeciality(doctorsFiltered)
    }

    /**
     * Realiza el envio al API para crear la cita
     *
     * @param {*} e
     */
    const appointmentCreation = async (e) => {
        if (doctor != '') {
            const formattedDate = today.toLocaleDateString('en-GB', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            });
            const dataDate = [
                data.email,
                doctor,
                formattedDate,
                hourDating,
                reasonMedical,
                speciality
            ];
            try {
                await postDating(dataDate);
                alert("Cita creada con exito, favor de revisar sus citas")
                navigate('/medicalagenda')
            } catch (error) {
                alert("Datos incorrectos vuelva a ingresarlos")
                console.error('Error fetching data:', error);
            }
        } else {
            alert('favor de rellenar todos los datos')
        }
    }

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
        <div className='content-formulary'>
            <div className="sidebar">
                {data.tipo_de_cuenta == 'paciente' ?
                    (<button className="menu-boton" onClick={e => navigate("/medicalagenda")}>Revisar Citas</button>) :
                    (<button className="menu-boton" onClick={e => navigate("/accountactivation")}>Activar Cuentas</button>)}
                {data.tipo_de_cuenta == 'paciente' ? (<div>
                    <h3>Perfil</h3>
                    <h4>{data.nombre}</h4>
                    <h4>{data.fecha_de_nacimiento}</h4>
                    <h4>{data.numero_de_telefono}</h4>
                    <h4>{data.genero}</h4>
                    <h4>{data.tipo_de_sangre}</h4>
                    <p>{data.enfermedades_cronicas}</p></div>) :
                    (<div>
                        <h3>Perfil</h3>
                        <h4>{data.nombre}</h4>
                        <h4>{data.especialidad}</h4>
                    </div>)}
                <button onClick={e => logout(e)}>Logout</button>
            </div>
            <div className='text-background'>
                <div className='information'>
                    <div className='data-user'>
                        <h2>Nombre:</h2>
                        <p>{data.nombre}</p>
                    </div>
                    <div className='date-birth'>
                        <h2>Fecha de Nacimiento:</h2>
                        <p>{data.fecha_de_nacimiento}</p>
                    </div>
                    <div className='identification'>
                        <h2>Número de Identificación:</h2>
                        <p>{data.id}</p>
                    </div>
                </div>
                <div className='formulary'>
                    {gender === 'masculino' ? (
                        <label>
                            <input
                                type="radio"
                                value="masculino"
                                checked={gender === 'masculino'}
                                onChange={e => setGender(e.target.value)}
                                disabled={gender === 'femenino'}/>
                            Masculino
                        </label>) : (
                        <label>
                            <input
                                type="radio"
                                value="femenino"
                                checked={gender === 'femenino'}
                                onChange={e => setGender(e.target.value)}
                                disabled={gender === "masculino"}/>
                            Femenino
                        </label>)}
                    <h3> Escoja Area y Doctor por favor:{' '}</h3>
                    <select
                        value={speciality}
                        onChange={e => changeSpecialty(e.target.value)}>
                        <option value="default">Seleccione un Area</option>
                        <option value="General">{medicalArea.area}</option>
                        <option value="Pediatria">{medicalArea.area1}</option>
                        <option value="Oftamologo">{medicalArea.area2}</option>
                    </select>
                    <select
                        value={doctor}
                        onChange={e => setDoctor(e.target.value)}
                        disabled={!speciality}
                    >
                        <option value="">Seleccione un Médico</option>
                        {doctorSpeciality.map(medico => (
                            <option key={medico.id} value={medico.nombre}>
                                {medico.nombre}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='information' >
                    <h1>Seleccione el dia de su cita</h1>
                    <Calendar
                        onChange={setToday}
                        value={today}
                        tileDisabled={disabilityWeekends}/>
                </div>
                <div>
                    <label>
                        <h4>Escoje un horario de atencion</h4>
                        <select
                            value={hourDating}
                            onChange={e => setHourDating(e.target.value)}>
                            {timetableEntries.map(([key, value]) => (
                                <option key={key} value={value}>{value}</option>
                            ))}
                        </select>
                    </label>
                </div>
                <div>
                    <textarea style={{ width: '49.9vw', height: '10vh' }}
                        placeholder='Escriba Aqui la razon de la cita'
                        className='reasonMedical'
                        value={reasonMedical}
                        onChange={e => setReasonMedical(e.target.value)}
                    />
                </div>
                <button onClick={e => appointmentCreation(e)}>Enviar</button>
            </div>
        </div>
    )
}

export default MedicalFormulary