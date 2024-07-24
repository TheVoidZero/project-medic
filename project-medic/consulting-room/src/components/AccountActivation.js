import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { getAllAccounts, updateAccountStatus } from './Services';
import Globals from './Globals';

const AccountActivation = () => {

  const [desactiveAccounts, setDesactiveAccounts] = useState([]); //Guarda todas las cuentas desactivadas
  const [data, setAccountData] = useState(Globals.getAccountData()[0]); //Trae los datos del usuario guardados del storage
  const navigate = useNavigate();

  /**
 * Realiza la llamada a api para traer todas las cuentas y las filtra en las que estan desactivadas
 *
 * 
 */
  useEffect(() => {
    const fetchCitas = async () => {
      try {
        const accounts = await getAllAccounts();
        const filterAccounts = accounts.filter(item => item.isActive === false);
        setDesactiveAccounts(filterAccounts);
      } catch (error) {
        console.error('Error al obtener cuentas desactivadas:', error);
      }
    };
    fetchCitas();
  }, []);

  /**
   * Limpia los datos del usuario del localStorage y redirige al Login
   *
   *
   */
  const logout = () => {
    Globals.clearAccountData();
    navigate('/login')
  }
  /**
   * Por medio del ID permite activar alguna cuenta de la lista de cuentas desactivadas
   *
   * @param {Int} accountId Guarda la id del usuario
   */
  const activeAccount = async (accountId) => {
    try {
      await updateAccountStatus(accountId);
      window.location.reload();
    } catch (error) {
      console.error("Error al actualizar el estado de la cuenta:", error);
      alert("Hubo un error al actualizar el estado de la cuenta.");
    }
  };

  return (
    <div className="container">
      <div className="sidebar">
        {data.tipo_de_cuenta == 'paciente' ?
          (<button className="menu-boton" onClick={e => navigate("/medicalformulary")}>Sacar citas</button>) :
          (<button className="menu-boton" onClick={e => navigate("/accountactivation")}>Activar Cuentas</button>)}
        <button className="menu-boton" onClick={e => navigate('/medicalagenda')}>Revisar Citas</button>
        <button className="menu-boton" onClick={e => logout(e)}>Logout</button>
      </div>
      <div className="content">
        <div className='table-container'>
          <table className="table">
            <thead>
              <tr>
                <th>NOMBRE:</th>
                <th>CURP:</th>
                <th>CORREO ELECTRONICO</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {desactiveAccounts.map(item => (
                <tr key={item.id}>
                  <td>{item.nombre}</td>
                  <td>{item.curp}</td>
                  <td>{item.email}</td>
                  <td><button onClick={e => activeAccount(item.id)}>activar cuenta
                  </button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
export default AccountActivation
