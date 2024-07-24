// services/restaurantService.js
import axios from 'axios';

const API_URL = 'http://localhost:8000/cuentas';
const API_URL1 = 'http://localhost:8000/citas';
const API_URL2 = 'http://localhost:8000/cuentas_doctores';

export const getAllAccounts = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching restaurants:', error);
        throw error;
    }
};
export const getAllAccountsDoctors = async () => {
    try {
        const response = await axios.get(API_URL2);
        return response.data;
    } catch (error) {
        console.error('Error fetching restaurants:', error);
        throw error;
    }
};
export const getUserByEmail = async (email) => {
    try {
        const response = await axios.get(`${API_URL}/email/${email}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user by email:', error);
        throw error;
    }
};
export const postAccount = async (data) => {
    try {
        await axios.post(API_URL, { email: data[0], password: data[1], fecha_de_nacimiento: data[2], numero_de_telefono: data[3], genero: data[4], curp: data[5], tipo_de_sangre: data[6], enfermedades_cronicas: data[7], isMenor: data[8], isActive: data[9], nombre: data[10], tipo_de_cuenta: data[11] })
    } catch (error) {
        console.error('Error fetching user by email:', error);
        throw error;
    }
};
export const postDating = async (data) => {
    try {
        await axios.post(API_URL1, { email: data[0], doctor_seleccionado: data[1], dia_cita: data[2], hora_cita: data[3], razon_cita: data[4], especialidad: data[5] })
    } catch (error) {
        console.error('Error fetching user by email:', error);
        throw error;
    }
};
export const getCitaByEmail = async (email) => {
    try {
        const response = await axios.get(`${API_URL1}/email/${email}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user by email:', error);
        throw error;
    }
};
export const datingService = {
    getDatingFilter: async (doctorSelect, dayDating) => {
      try {
        const response = await axios.get(`${API_URL1}?doctor_seleccionado=${doctorSelect}&dia_cita=${dayDating}`);
        return response.data;
      } catch (error) {
        console.error('Error al obtener citas filtradas:', error);
        throw error;
      }
    }
  };
  export const getDoctorByEmail = async (email) => {
    try {
        const response = await axios.get(`${API_URL2}/email/${email}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user by email:', error);
        throw error;
    }
};
export const updateAccountStatus = async (accountId) => {
    try {
        await axios.put(`${API_URL}/${accountId}`, { isActive: true });
    } catch (error) {
        throw new Error('Error al actualizar el estado de la cuenta');
    }
};