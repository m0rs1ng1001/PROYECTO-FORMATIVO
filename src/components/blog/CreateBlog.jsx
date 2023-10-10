import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const URI = 'http://localhost:8000/blogs/';

const CompCreateBlog = () => {
  const [placa, setPlaca] = useState('');
  const [modelo, setModelo] = useState('');
  const [tipoVehiculo, setTipoVehiculo] = useState('');
  const [marca, setMarca] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const navigate = useNavigate();

  const store = async (e) => {
    e.preventDefault();
    axios.post(URI, {
      placa: placa,
      modelo: modelo,
      tipoVehiculo: tipoVehiculo,
      marca: marca,
      fecha: fecha,
      hora: hora,
    });
    navigate('/');
  };

  const handleFechaChange = (e) => {
    const selectedDate = e.target.value;
    const currentDate = new Date().toISOString().split('T')[0];
    if (selectedDate < currentDate) {
      alert('No puedes agendar una fecha pasada.');
      setFecha('');
    } else {
      setFecha(selectedDate);
    }
  };

  const handleHoraChange = (e) => {
    const selectedTime = e.target.value;
    const currentTime = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    if (fecha === new Date().toISOString().split('T')[0] && selectedTime < currentTime) {
      alert('No puedes agendar una hora pasada.');
      setHora('');
    } else {
      setHora(selectedTime);
    }
  };

  const handleYearChange = (e) => {
    const inputValue = e.target.value;
    // Limitar a 4 dígitos
    const trimmedValue = inputValue.slice(0, 4);
    setModelo(trimmedValue);
  };

  return (
    <div className='container mt-5'>
      <div className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
        <h3 className='text-center text-2xl mb-4'>Crear Cita</h3>
        <form onSubmit={store}>
          <div className='mb-4'>
            <label htmlFor='placa' className='block text-gray-700 text-sm font-bold mb-2'>
              Placa
            </label>
            <input
              value={placa}
              onChange={(e) => setPlaca(e.target.value)}
              type='text'
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='placa'
              maxLength={7}
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='modelo' className='block text-gray-700 text-sm font-bold mb-2'>
              Modelo
            </label>
            <input
              value={modelo}
              type='number'
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='modelo'
              name='modelo'
              min='1980'
              max='9999'
              onChange={handleYearChange}
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='tipoVehiculo' className='block text-gray-700 text-sm font-bold mb-2'>
              Tipo Vehiculo
            </label>
            <select
              id='tipoVehiculo'
              name='tipoVehiculo'
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              value={tipoVehiculo}
              onChange={(e) => setTipoVehiculo(e.target.value)}
            >
              <option value='tipoVehiculo'>Selecciona el tipo de vehiculo</option>
              <option value='carro'>Carro</option>
              <option value='moto'>Moto</option>
            </select>
          </div>
          <div className='mb-4'>
            <label htmlFor='marca' className='block text-gray-700 text-sm font-bold mb-2'>
              Marca
            </label>
            <input
              value={marca}
              onChange={(e) => setMarca(e.target.value)}
              type='text'
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='marca'
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='fecha' className='block text-gray-700 text-sm font-bold mb-2'>
              Fecha
            </label>
            <input
              value={fecha}
              onChange={handleFechaChange}
              type='date'
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='fecha'
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='hora' className='block text-gray-700 text-sm font-bold mb-2'>
              Hora
            </label>
            <input
              value={hora}
              onChange={handleHoraChange}
              type='time'
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='hora'
            />
          </div>
          <button  type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
           <a href="/Citas">crear</a>
          </button>
        </form>
      </div>
    </div>
  );
};

export default CompCreateBlog;
