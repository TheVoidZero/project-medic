import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { postAccount, getUserByEmail } from './Services.js';
import { AiOutlineArrowLeft } from "react-icons/ai";
import '../css/Information.css'
import '../css/CreateAccount.css'

const CreateAccount = () => {

    const [gender, setGender] = useState(); //Guarda el genero del usuario.
    const [fullName, setFullName] = useState(''); //Guarda el nombre completo del usuario.
    const [day, setDay] = useState(); //Guarda el dia que nacio el usuario.
    const [month, setMonth] = useState(); //Guarda el mes que nacio el usuario.
    const [year, setYear] = useState(); //Guarda el año que nacio el usuario.
    const [phoneNumber, setPhoneNumber] = useState(); //Guarda el numero telefonico del usuario.
    const [curp, setCurp] = useState(); //Guarda la curp del usuario.
    const [isValidCurp, setIsValidCurp] = useState(true) //Dependiendo de si la curp es la correcta cambiar su valor.
    const [bloodType, setBloodType] = useState(); //Guarda el tipo de sangre del usuario.
    const [chronicDiseases, setChronicDiseases] = useState(); //Guarda la enfermedad cronica del usuario si es que tiene una.
    const [userMinor, setUserMinor] = useState(false); //Dependiendo si el usuario es menor de edad esto cambiara.
    const [email, setEmail] = useState(''); //Guarda el email del usuario.
    const [password, setPassword] = useState(''); //Guarda la contraseña del usuario.
    const [confirmPassword, setConfirmPassword] = useState(); //Guarda la contraseña de otro apartado para verificar que son la misma.
    const [isValidEmail, setIsValidEmail] = useState(true); //Cambia si el email contiene el formato correcto.
    const navigate = useNavigate(); //Permite la navegacion entre vistas.
    const isActiveAccount = false; //El valor default de todas las cuentas recien creadas.
    const typeAccount = 'paciente' //El valor default de todas las cuentas recien creadas.
    const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]+$/; //Exprecion regular para validar email
    //Exprecion regular para validar la Curp
    const curpRegex = /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/;
    const days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]; //Dias del mes.
    const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]; //Meses del año.
    const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]; //Tipos de sangre que puede escoger.

    /**
     * Si la fecha ingresada esta dentro del rango actualizara el dia seleccionado
     *
     * @param {Int} numberDay
     */
    const dateBirth = (numberDay) => {
        if (numberDay < 32 && numberDay > 0) {
            setDay(numberDay)
        }
    }

    /**
     *  Esta función evita intenta pegar algo en un campo de entrada y evita que se peguen números negativos.
     *
     * @param {Event} e
     */
    const preventPasteNegative = (e) => {
        const clipboardData = e.clipboardData || window.clipboardData;
        const pastedData = parseFloat(clipboardData.getData('text'));

        if (pastedData < 0) {
            e.preventDefault();
        }
    };

    /**
     * Esta función evita que se presiona la tecla de guion (-) para introducir números negativos.
     *
     * @param {*} e
     */
    const preventMinus = (e) => {
        if (e.code === 'Minus') {
            e.preventDefault();
        }
    };

    /**
     * Permite actualizar el valor de la curp
     *
     * @param {Event} e
     */
    const changeCurp = (e) => {
        setCurp(e.target.value);
        setIsValidCurp(curpRegex.test(e.target.value));
    };

    /**
     * Realiza la actualizacion de la variable email y verifica si es valido
     *
     * @param {*} e
     */
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setIsValidEmail(emailRegex.test(e.target.value));
    };

    /**
     * Crea una nueva cuenta de paciente en la base de datos
     *
     */
    const newAccount = async () => {
        //Primero condiciona si el password es el mismo y en caso de que no lo dara a entender al usuario, si todo esta bien continuara con la creacion
        if (password != confirmPassword) {
            alert("Favor de revisar que ambas contraseñas sean iguales")
        }
        //Confirma que toda variable tiene algun valor para poder crear la cuenta
        else if (password == confirmPassword && email != '' && isValidEmail && isValidCurp && curp != undefined && day != '' && month != '' && year != '' && phoneNumber != '' && bloodType != '' && fullName != '') {
            let dateJoined = day + ' ' + month + ' ' + year;
            const newAccountData = [
                email,
                password,
                dateJoined,
                phoneNumber,
                gender,
                curp,
                bloodType,
                chronicDiseases,
                userMinor,
                isActiveAccount,
                fullName,
                typeAccount
            ];
            try {
                await postAccount(newAccountData);
                alert("Favor de avisar al consultorio que active su cuenta")
                navigate('/login')
            } catch (error) {
                alert("Datos incorrectos vuelva a ingresarlos")
                console.error('Error fetching data:', error);
            }
        }
    }

    /**
     * Comprueba si el correo electronico ya existe a una cuenta existente
     *
     */
    const fetchData = async () => {
        try {
            const accountsData = await getUserByEmail(email);
            if (accountsData == '') {
                newAccount()
            } else {
                alert("Actualmente ya hay una cuenta vinculada a ese correo")
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    return (
        <div className='background-image'>
            <button className='arrow-back' onClick={e => navigate('/login')}>
                <AiOutlineArrowLeft className='icons' />
            </button>
            <div className='title-text'>
                <h1> Creacion de una Cuenta</h1>
                <div className='name-account'>
                    <h3>Nombre:</h3>
                    <input type='text' onChange={e => setFullName(e.target.value)} placeholder='Ingrese su nombre completo porfavor' />
                </div>
                <div className='name-account'>
                    <h3>Fecha de Nacimiento:</h3>
                    <div className='fecha'>
                        <p>Dia: </p>
                        <select id="dias" onChange={e => dateBirth(e.target.value)}>
                            {days.map(dia => (
                                <option key={dia} value={dia}>{dia}</option>
                            ))}
                        </select>
                        <p>Mes: </p>
                        <select id="meses" onChange={e => setMonth(e.target.value)}>
                            {months.map(mes => (
                                <option key={mes} value={mes}>{mes}</option>
                            ))}
                        </select>
                        <p>Año: </p>
                        <input type='number' min="1900" max='2030'
                            onPaste={preventPasteNegative}
                            onBeforeInput={preventMinus}
                            onChange={e => setYear(e.target.value)} />
                    </div>
                </div>
                <div className='name-account'>
                    <label htmlFor="email">Correo electrónico:</label>
                    <input
                        placeholder='ingrese su correo'
                        type="email"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                    />
                </div>
                <div className='name-account'>
                    <label>Contraseña:</label>
                    <input type="password" placeholder='Ingrese su contraseña' onChange={e => setPassword(e.target.value)} />
                </div>
                <div className='name-account'>
                    <label>Confirmar contraseña:</label>
                    <input type="password" placeholder='Confirme su contraseña' onChange={e => setConfirmPassword(e.target.value)} />
                </div>
                <div className='name-account'>
                    <h3>Numero de telefono:</h3>
                    <input
                        onChange={e => setPhoneNumber(e.target.value)} maxLength={10} />
                </div>
                <div className='name-account'>
                    <label>
                        <h3>Genero: </h3>
                        <input
                            type="radio"
                            value="masculino"
                            checked={gender === 'masculino'}
                            onChange={e => setGender(e.target.value)}
                        />
                        Masculino
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="femenino"
                            checked={gender === 'femenino'}
                            onChange={e => setGender(e.target.value)}
                        />
                        Femenino
                    </label>
                </div>
                <div className='name-account'>
                    <h3>CURP: </h3>
                    <input type='text' onChange={changeCurp} />
                </div>
                <div className='name-account'>
                    <h3>Tipo de sangre: </h3>
                    <select id="tipoSangre" onChange={e => setBloodType(e.target.value)}>
                        {bloodTypes.map(tipoSangre => (
                            <option key={tipoSangre} value={tipoSangre}>{tipoSangre}</option>
                        ))}
                    </select>
                </div>
                <div >
                    <h2>Enfermedades Cronicas</h2>
                    <textarea
                        placeholder='Escriba Aqui sus Enfermedades Cronicas'
                        className='razonMedica'
                        value={chronicDiseases}
                        onChange={e => setChronicDiseases(e.target.value)}
                    />
                </div>
                <div className='name-account'>
                    <h4>¿La cuenta es para un menor de edad?: </h4>
                    <select
                        value={userMinor}
                        onChange={e => setUserMinor(e.target.value)}>
                        <option value={false}>No</option>
                        <option value={true}>Si</option>
                    </select>
                </div>
                <h3>Recuerde pasar al hospital para darle su numero de identificacion</h3>
                <button onClick={e => fetchData(e)}>ENVIAR</button>
            </div>
        </div>
    )
}

export default CreateAccount