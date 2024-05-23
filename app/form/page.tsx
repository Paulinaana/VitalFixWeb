'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import React from 'react';

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

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('https://back-vitalfix.onrender.com/api/v1/typeservice');
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);

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

    try {
      const response = await axios.post('https://back-vitalfix.onrender.com/api/v1/requests', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
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
    <div className='w-full h-screen flex items-start flex-1 pt-36'>
      <div className='relative h-full flex flex-col'>
        <div className='flex-1 pt-10 padding-x'>
          <h1 className='about__title'>Solicitud de Servicio</h1>
          <p className='about__subtitle text-[18px]'>
            Entendemos que su tiempo es valioso. Este sistema ha sido creado para hacer la experiencia lo más fácil posible, así como para ahorrarle tiempo y dinero. 
            Si tiene un equipo que necesita reparación, instalación o mantenimiento, rellene el siguiente formulario. Evaluaremos su solicitud y determinaremos la opción más rápida y económica para su equipo.
          </p>
        </div>
        <form onSubmit={handleSubmit} className='mt-2 padding-x padding-y w-auto flex justify-center'>
          <div className="shadow-lg rounded p-10 flex w-full max-w-md">
            <div className="border-b border-gray-900/10 pb-12 w-auto">
              <h2 className="text-base font-semibold leading-7 text-gray-900">Información del Producto</h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">Esta información es útil para la estimación.</p>

              {/* Información del producto */}
              <div className="sm:col-span-3 mt-8">
                <label htmlFor="type" className="block text-sm font-medium leading-6 text-gray-900">Tipo de Servicio</label>
                <div className="mt-2">
                  <select id="type" name="type" value={formData.type} onChange={handleChange} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                    <option value="">Seleccionar</option>
                    {services.map(service => (
                      <option key={service.id} value={service.name}>{service.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="sm:col-span-3 mt-8">
                <label htmlFor="details" className="block text-sm font-medium leading-6 text-gray-900">Detalles del Equipo</label>
                <div className="mt-2">
                  <input type="text" name="details" id="details" value={formData.details} onChange={handleChange} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
              </div>

              {/* Más campos del formulario */}
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label htmlFor="maker" className="block text-sm font-medium leading-6 text-gray-900">Fabricante</label>
                  <div className="mt-2">
                    <input type="text" name="maker" id="maker" value={formData.maker} onChange={handleChange} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="model" className="block text-sm font-medium leading-6 text-gray-900">Modelo</label>
                  <div className="mt-2">
                    <input type="text" name="model" id="model" value={formData.model} onChange={handleChange} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="serial" className="block text-sm font-medium leading-6 text-gray-900">Número de Serial</label>
                  <div className="mt-2">
                    <input type="text" name="serial" id="serial" value={formData.serial} onChange={handleChange} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>
                </div>

                <div className="mt-6 col-span-full">
                  <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">Descripción del Equipo</label>
                  <div className="mt-2">
                    <textarea id="description" name="description" value={formData.description} onChange={handleChange} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-600">Escribe los detalles del la situación del equipo.</p>
                </div>

                {/* Campo para subir archivo */}
                <div className="col-span-full">
                  <label htmlFor="image" className="block text-sm font-medium leading-6 text-gray-900">Subir Imagen del Equipo</label>
                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div className="text-center">
                      <svg className="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M12 4.25a8.75 8.75 0 100 17.5 8.75 8.75 0 000-17.5zM0 12a12 12 0 1124 0 12 12 0 01-24 0zM13 16.75v-5.5H8v-2.5h7v8H13z" clipRule="evenodd" />
                      </svg>
                      <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <label htmlFor="image" className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                          <span>Subir un archivo</span>
                          <input id="image" name="image" type="file" onChange={handleFileChange} className="sr-only" />
                        </label>
                      </div>
                      <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF de hasta 10MB</p>
                    </div>
                  </div>
                </div>

                {/* Más campos del formulario */}
                <div className="sm:col-span-3">
                  <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Nombre</label>
                  <div className="mt-2">
                    <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="lastname" className="block text-sm font-medium leading-6 text-gray-900">Apellido</label>
                  <div className="mt-2">
                    <input type="text" name="lastname" id="lastname" value={formData.lastname} onChange={handleChange} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Correo Electrónico</label>
                  <div className="mt-2">
                    <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">Teléfono</label>
                  <div className="mt-2">
                    <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">Dirección</label>
                  <div className="mt-2">
                    <input type="text" name="address" id="address" value={formData.address} onChange={handleChange} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label htmlFor="reference" className="block text-sm font-medium leading-6 text-gray-900">Referencia</label>
                  <div className="mt-2">
                    <input type="text" name="reference" id="reference" value={formData.reference} onChange={handleChange} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="status" className="block text-sm font-medium leading-6 text-gray-900">Estado</label>
                  <div className="mt-2">
                    <select id="status" name="status" value={formData.status} onChange={handleChange} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                      <option value="">Seleccionar</option>
                      <option value="Nuevo">Nuevo</option>
                      <option value="Usado">Usado</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Botón para enviar */}
              <div className="mt-10">
                <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  Enviar Solicitud
                </button>
              </div>
            </div>
          </div>
        </form>
        {message.text && (
          <div className={`mt-4 ${message.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
            {message.text}
          </div>
        )}
      </div>
    </div>
  );
}

export default Form;