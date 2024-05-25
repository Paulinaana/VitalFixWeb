'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import React from 'react';
import { useAuth } from "@/context/AuthContext";

function Form() {
  const [formData, setFormData] = useState({
    type: '',
    details: '',
    maker: '',
    model: '',
    serial: '',
    description: '',
    name: '',
    lastname: '',
    email: '',
    phone: '',
    address: '',
    reference: '',
    status: '',
    // service: '',
    image: null,
  });

  const [services, setServices] = useState([]);
  const [message, setMessage] = useState({ text: '', type: '' });

  const { isAuthenticated } = useAuth();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('https://back-vitalfix.onrender.com/api/v1/services');
        console.log("Servicions: ", response.data)
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      try {
        const response = await axios.get('https://back-vitalfix.onrender.com/api/v1/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userData = response.data;
        console.log('User Data:', userData);
        setUserData(userData);
        
        setFormData((prevFormData) => ({
          ...prevFormData,
          name: userData.name,
          lastname: userData.lastname,
          email: userData.email,
        }));
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (isAuthenticated) {
      fetchServices();
      fetchUserData();
    }
  }, [isAuthenticated]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    console.log('Token:', token);
    console.log('Request Data:', formData);

    try {
      const response = await axios.post('https://back-vitalfix.onrender.com/api/v1/requests', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage({ text: 'Solicitud enviada con éxito.', type: 'success' });
      console.log(response.data);
    } catch (error) {
      if (error.response && error.response.data) {
        console.error('Error details:', error.response.data);
        setMessage({ text: error.response.data.message || 'Error al enviar la solicitud. Inténtalo de nuevo.', type: 'error' });
      } else {
        console.error(error);
        setMessage({ text: 'Error al enviar la solicitud. Inténtalo de nuevo.', type: 'error' });
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center pt-36 pb-10">
      <div className="w-full max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-center">Solicitud de Servicio</h1>
        <p className="text-lg text-center mt-4">
          Entendemos que su tiempo es valioso. Este sistema ha sido creado para hacer la experiencia lo más fácil posible, así como para ahorrarle tiempo y dinero.
          Si tiene un equipo que necesita reparación, instalación o mantenimiento, rellene el siguiente formulario. Evaluaremos su solicitud y determinaremos la opción más rápida y económica para su equipo.
        </p>
        <form onSubmit={handleSubmit} className="mt-8">
          <div className="shadow-lg rounded p-8 bg-white">
            <div className="border-b border-gray-200 pb-8">
              <h2 className="text-lg font-semibold">Información del Producto</h2>
              <p className="text-sm text-gray-600">Esta información es útil para la estimación.</p>

              <div className="mt-4">
                <label htmlFor="type" className="block text-sm font-medium text-gray-700">Tipo de Servicio</label>
                <select id="type" name="type" value={formData.type} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                  <option value="">Seleccionar</option>
                  {services.map(service => (
                    <option key={service.id} value={service.id}>{service.name}</option>
                  ))}
                </select>
              </div>

              <div className="mt-4">
                <label htmlFor="details" className="block text-sm font-medium text-gray-700">Detalles del Equipo</label>
                <input type="text" name="details" id="details" value={formData.details} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>

              <div className="mt-4">
                <label htmlFor="maker" className="block text-sm font-medium text-gray-700">Fabricante</label>
                <input type="text" name="maker" id="maker" value={formData.maker} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>

              <div className="mt-4">
                <label htmlFor="model" className="block text-sm font-medium text-gray-700">Modelo</label>
                <input type="text" name="model" id="model" value={formData.model} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>

              <div className="mt-4">
                <label htmlFor="serial" className="block text-sm font-medium text-gray-700">Número de Serial</label>
                <input type="text" name="serial" id="serial" value={formData.serial} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>

              <div className="mt-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descripción del Equipo</label>
                <textarea id="description" name="description" value={formData.description} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
                <p className="mt-2 text-sm text-gray-600">Escribe los detalles del la situación del equipo.</p>
              </div>

              <div className="mt-4">
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">Estado del Equipo</label>
                <input type="text" name="status" id="status" value={formData.status} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>

              <div className="mt-4">
                <label htmlFor="image" className="block text-sm font-medium text-gray-700">Subir Imagen del Equipo</label>
                <div className="mt-2 flex justify-center rounded-md border-2 border-dashed border-gray-300 p-6">
                  <div className="text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                      <path d="M28 8h12v12M36 8L16 28M8 20v20h20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="mt-4 flex text-sm text-gray-600">
                      <label htmlFor="image" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                        <span>Subir un archivo</span>
                        <input id="image" name="image" type="file" onChange={handleFileChange} className="sr-only" />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF hasta 10MB</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-b border-gray-200 py-8">
              <h2 className="text-lg font-semibold">Información Personal</h2>
              <p className="text-sm text-gray-600">Esta información es útil para contactarlo.</p>

              <div className="mt-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label>
                <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>

              <div className="mt-4">
                <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">Apellido</label>
                <input type="text" name="lastname" id="lastname" value={formData.lastname} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>

              <div className="mt-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>

              <div className="mt-4">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Teléfono</label>
                <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>

              <div className="mt-4">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Dirección</label>
                <input type="text" name="address" id="address" value={formData.address} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>

              <div className="mt-4">
                <label htmlFor="reference" className="block text-sm font-medium text-gray-700">Punto de Referencia</label>
                <input type="text" name="reference" id="reference" value={formData.reference} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Enviar Solicitud
              </button>
            </div>
          </div>
        </form>
        {message.text && (
          <div className={`mt-4 p-4 border rounded ${message.type === 'success' ? 'border-green-500 bg-green-50 text-green-800' : 'border-red-500 bg-red-50 text-red-800'}`}>
            {message.text}
          </div>
        )}
      </div>
    </div>
  );
}

export default Form;