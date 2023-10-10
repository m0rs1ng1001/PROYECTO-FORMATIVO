import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loader from './Loader';

const URI = 'http://localhost:8000/blogs/';

const CompShowBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBlogs();
  }, []);

  const getBlogs = async () => {
    try {
      const res = await axios.get(URI);
      setBlogs(res.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      setLoading(false);
    }
  };

  const deleteBlog = async (id) => {
    try {
      await axios.delete(`${URI}${id}`);
      getBlogs();
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  return (
    <div className="container mt-40 bg-gray-100 rounded p-4">
      <h1 className="text-center text-primary text-2xl">AGENDAR CITA</h1>
      <div className="flex justify-center mt-3">
        <Link to="/CrearCita" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5 mb-10">
          Añadir Cita
        </Link>
      </div>
      <div className="col">
        {loading ? (
          <Loader /> // Display loader while loading
        ) : (
          <table className="min-w-full bg-white border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="border">Placa</th>
                <th className="border">Modelo</th>
                <th className="border">Tipo de Vehículo</th>
                <th className="border">Marca</th>
                <th className="border">Fecha</th>
                <th className="border">Hora</th>
                <th className="border">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog, index) => (
                <tr
                  key={blog.id}
                  className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
                >
                  <td className="border">{blog.placa}</td>
                  <td className="border">{blog.modelo}</td>
                  <td className="border">{blog.tipoVehiculo}</td>
                  <td className="border">{blog.marca}</td>
                  <td className="border">{blog.fecha}</td>
                  <td className="border">{blog.hora}</td>
                  <td className="border">
                    <Link
                      to={`/edit/${blog.id}`}
                      className="btn btn-info mr-2"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => deleteBlog(blog.id)}
                      className="btn btn-danger"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default CompShowBlogs;
