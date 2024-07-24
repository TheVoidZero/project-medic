import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Login from './Login.js'
import MedicalFormulary from './MedicalFormulary.js';
import ContactOffice from './ContactOffice.js';
import AboutUs from './AboutUs.js';
import CreateAccount from './CreateAccount.js';
import MedicalAgenda from './MedicalAgenda.js';
import AccountActivation from './AccountActivation.js'

const RoutesMain = () => {

    return (
        <BrowserRouter>     
            <section className='contenido-principal'>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/login" element={ <Login/> } />
                    <Route path='/medicalformulary' element={<MedicalFormulary/>} />
                    <Route path='/contactoffice' element={<ContactOffice/>} />
                    <Route path='/aboutus' element={<AboutUs/>} />
                    <Route path='/createaccount' element={<CreateAccount/>} />
                    <Route path='/medicalagenda' element={<MedicalAgenda/>} />
                    <Route path='/accountactivation' element={<AccountActivation/>} />
                    <Route path="" element={(
                        <div>
                            <h1></h1>
                            <p>Pagina no encontrada</p>
                        </div>)} />
                </Routes>
            </section>
        </BrowserRouter>
    )
}

export default RoutesMain