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
    image: null,
  });

  const [services, setServices] = useState([]);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [showModal, setShowModal] = useState(false); // Estado para controlar si se muestra el modal

  const { isAuthenticated } = useAuth();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('https://back-vitalfix.onrender.com/api/v1/services');
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
        const userId = localStorage.getItem('userId');
        if (userId) {
          const response = await axios.get(`https://back-vitalfix.onrender.com/api/v1/users/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const userData = response.data;
          setUserData(userData);

          setFormData((prevFormData) => ({
            ...prevFormData,
            name: userData.name,
            lastname: userData.lastname,
            email: userData.email,
          }));
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (message.text !== '') {
      setShowModal(true);
    } 

    if (isAuthenticated) {
      fetchServices();
      fetchUserData();
    }
  }, [isAuthenticated, message]);

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

    try {
      const response = await axios.post('https://back-vitalfix.onrender.com/api/v1/requests', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage({ text: 'Solicitud enviada con éxito.', type: 'success' });
      document.getElementById('hs-basic-modal').classList.remove('hidden');
    } catch (error) {
      if (error.response && error.response.data) {
        setMessage({ text: error.response.data.message || 'Error al enviar la solicitud. Inténtalo de nuevo.', type: 'error' });
      } else {
        setMessage({ text: 'Error al enviar la solicitud. Inténtalo de nuevo.', type: 'error' });
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center pt-36 pb-10 bg-gray-100">
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
                <select id="type" name="type" value={formData.type} onChange={handleChange} className='w-full text-black py-2 my-2 px-4 bg-transparent border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-indigo-500'>
                  <option value="">Seleccionar</option>
                  {services.map(service => (
                    <option key={service.id} value={service.id}>{service.name}</option>
                  ))}
                </select>
              </div>

              <div className="mt-4">
                <label htmlFor="details" className="block text-sm font-medium text-gray-700">Detalles del Equipo</label>
                <input type="text" name="details" id="details" value={formData.details} onChange={handleChange} className='w-full text-black py-2 my-2 px-4 bg-transparent border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-indigo-500' />
              </div>

              <div className="mt-4">
                <label htmlFor="maker" className="block text-sm font-medium text-gray-700">Fabricante</label>
                <input type="text" name="maker" id="maker" value={formData.maker} onChange={handleChange} className='w-full text-black py-2 my-2 px-4 bg-transparent border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-indigo-500' />
              </div>

              <div className="mt-4">
                <label htmlFor="model" className="block text-sm font-medium text-gray-700">Modelo</label>
                <input type="text" name="model" id="model" value={formData.model} onChange={handleChange} className='w-full text-black py-2 my-2 px-4 bg-transparent border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-indigo-500' />
              </div>

              <div className="mt-4">
                <label htmlFor="serial" className="block text-sm font-medium text-gray-700">Número de Serial</label>
                <input type="text" name="serial" id="serial" value={formData.serial} onChange={handleChange} className='w-full text-black py-2 my-2 px-4 bg-transparent border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-indigo-500' />
              </div>

              <div className="mt-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descripción del Equipo</label>
                <textarea id="description" name="description" value={formData.description} onChange={handleChange} className='w-full text-black py-2 my-2 px-4 bg-transparent border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-indigo-500'></textarea>
                <p className="mt-2 text-sm text-gray-600">Escribe los detalles del la situación del equipo.</p>
              </div>

              <div className="mt-4">
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">Estado del Equipo</label>
                <input type="text" name="status" id="status" value={formData.status} onChange={handleChange} className='w-full text-black py-2 my-2 px-4 bg-transparent border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-indigo-500' />
              </div>

              <div className="mt-4">
                <label htmlFor="image" className="block text-sm font-medium text-gray-700">Subir Imagen del Equipo</label>
                <div className="mt-2 flex justify-center rounded-md border-2 border-dashed border-gray-300 p-6">
                  <div className="text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                      <path d="M12 16l6 6m0 0l6-6m-6 6V4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M6 12h36M6 36h36" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="mt-4 flex text-sm text-gray-600">
                      <label htmlFor="image" className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                        <span>Subir un archivo</span>
                        <input id="image" name="image" type="file" className="sr-only" onChange={handleFileChange} />
                      </label>
                      <p className="pl-1">o arrastra y suelta</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF hasta 10MB</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-lg font-semibold">Información del Cliente</h2>
              <p className="text-sm text-gray-600">Por favor complete la información de contacto para que podamos comunicarnos con usted.</p>

              <div className="mt-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label>
                <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className='w-full text-black py-2 my-2 px-4 bg-transparent border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-indigo-500' />
              </div>

              <div className="mt-4">
                <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">Apellido</label>
                <input type="text" name="lastname" id="lastname" value={formData.lastname} onChange={handleChange} className='w-full text-black py-2 my-2 px-4 bg-transparent border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-indigo-500' />
              </div>

              <div className="mt-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
                <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className='w-full text-black py-2 my-2 px-4 bg-transparent border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-indigo-500' />
              </div>

              <div className="mt-4">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Teléfono</label>
                <input type="text" name="phone" id="phone" value={formData.phone} onChange={handleChange} className='w-full text-black py-2 my-2 px-4 bg-transparent border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-indigo-500' />
              </div>

              <div className="mt-4">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Dirección</label>
                <input type="text" name="address" id="address" value={formData.address} onChange={handleChange} className='w-full text-black py-2 my-2 px-4 bg-transparent border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-indigo-500' />
              </div>

              <div className="mt-4">
                <label htmlFor="reference" className="block text-sm font-medium text-gray-700">Referencia</label>
                <input type="text" name="reference" id="reference" value={formData.reference} onChange={handleChange} className='w-full text-black py-2 my-2 px-4 bg-transparent border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-indigo-500' />
              </div>
            </div>

            <div className="mt-8">
              <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Enviar Solicitud
              </button>
            </div>
          </div>
        </form>

        {showModal && (
          <div id="hs-basic-modal" className={`fixed inset-0 z-50 overflow-y-auto hidden`}>
            <div className="flex items-center justify-center min-h-screen px-4 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>

              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">​</span>

              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">{message.type === 'success' ? 'Éxito' : 'Error'}</h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">{message.text}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button onClick={() => document.getElementById('hs-basic-modal').classList.add('hidden')} className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                    Ver servicio
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Form;
