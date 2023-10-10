import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const URI = 'http://localhost:8000/blogs/'

const CompEditBlog = () => {

    const [placa, setPlaca] = useState('')
    const [modelo, setModelo] = useState('')
    const [tipoVehiculo, setTipoVehiculo] = useState('')
    const [marca, setMarca] = useState('')
    const [fecha, setFecha] = useState('')
    const [hora, setHora] = useState('')

    const navigate = useNavigate()

    const {id} = useParams()

    // procedimiento para editar

    const update = async (e) =>{

        e.preventDefault()

        await axios.put(URI+id, {
            placa: placa,
            modelo: modelo,
            tipoVehiculo: tipoVehiculo,
            marca: marca,
            fecha: fecha,
            hora: hora,

        })
        navigate('/')
    }


        useEffect(()=>{
            getBlogById()
        },[])

        const getBlogById = async () =>{
          const res =  await axios.get(URI+id)
          setPlaca(res.data.placa)
          setModelo(res.data.modelo)
          setTipoVehiculo(res.data.tipoVehiculo)
          setMarca(res.data.marca)
          setFecha(res.data.fecha)
          setHora(res.data.hora)
        }


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
              <div className='card'>
                <div className='card-body bg-light'>
                  <h3 className='card-title text-center mb-4'>EDITAR CITA</h3>
                  <form onSubmit={update}>
                    <div className='mb-3'>
                      <label htmlFor='placa' className='form-label text-center'>
                        Placa
                      </label>
                      <input
                        value={placa}
                        onChange={(e) => setPlaca(e.target.value)}
                        type='text'
                        className='form-control'
                        id='placa'
                        maxLength={7}
                      />
                    </div>
                    <div className='mb-3'>
                    <label htmlFor='modelo' className='form-label'>
                    Modelo
                    </label>
                     <input
                     value={modelo}
                    // onChange={(e) => setModelo(e.target.value)}
                      type='number'
                   className='form-control'
                   id='modelo'
                   name='modelo'
                    min="1980"
                    max="9999"
                    onChange={handleYearChange}
              />
                    </div>
                    <div className='mb-3'>
                      <label htmlFor='tipoVehiculo' className='form-label text-center'>
                        Tipo Vehiculo
                      </label>
                      <select
                        id='tipoVehiculo'
                        name='tipoVehiculo'
                        className='form-select'
                        value={tipoVehiculo}
                        onChange={(e) => setTipoVehiculo(e.target.value)}
                      >
                        <option value='tipoVehiculo'>Selecciona el tipo de vehiculo</option>
                        <option value='carro'>Carro</option>
                        <option value='moto'>Moto</option>
                      </select>
                    </div>
                    <div className='mb-3'>
                      <label htmlFor='marca' className='form-label text-center'>
                        Marca
                      </label>
                      <input
                        value={marca}
                        onChange={(e) => setMarca(e.target.value)}
                        type='text'
                        className='form-control'
                        id='marca'
                      />
                    </div>
                    <div className='mb-3'>
                      <label htmlFor='fecha' className='form-label text-center'>
                        Fecha
                      </label>
                      <input
                        value={fecha}
                        onChange={handleFechaChange}
                        type='date'
                        className='form-control'
                        id='fecha'
                      />
                    </div>
                    <div className='mb-3'>
                      <label htmlFor='hora' className='form-label text-center '>
                        Hora
                      </label>
                      <input
                        value={hora}
                        onChange={handleHoraChange}
                        type='time'
                        className='form-control'
                        id='hora'
                      />
                    </div>
                    <button type='submit' className='btn btn-primary'>
                      Agregar
                    </button>
                  </form>
                </div>
              </div>
            </div>
          );
}

export default CompEditBlog