'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import React from 'react';
import { useAuth } from "@/context/AuthContext";
import { useRouter, useSearchParams } from 'next/navigation';

function Form() {
  const router = useRouter();
  const token = localStorage.getItem('token');

  const searchParams = useSearchParams();
  const product_id = searchParams.get('id');
  const [formData, setFormData] = useState({
    type: '',
    equipId: product_id || '',
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
  const [equips, setEquips] = useState([]);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { isAuthenticated } = useAuth();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    console.log(token)
    if (!token) {
        router.push('/'); // Redirigir al inicio si no hay token
        return;
    }
    const fetchEquip = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      try {
        const response = await axios.get('https://back-vitalfix.onrender.com/api/v1/equips', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEquips(response.data);
      } catch (error) {
        console.error('Error fetching equips:', error);
      }
    };

    const fetchServices = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      try {
        const response = await axios.get('https://back-vitalfix.onrender.com/api/v1/services', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
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
            phone: userData.phone,
            address: userData.address,
            reference: userData.reference,
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
      fetchEquip();
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

    if (isSubmitting) return;

    setIsSubmitting(true);

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      setIsSubmitting(false);
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
      setShowModal(true);
    } catch (error) {
      if (error.response && error.response.data) {
        setMessage({ text: error.response.data.message || 'Error al enviar la solicitud. Inténtalo de nuevo.', type: 'error' });
      } else {
        setMessage({ text: 'Error al enviar la solicitud. Inténtalo de nuevo.', type: 'error' });
      }
      setShowModal(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleModalClose = () => {
    
    setShowModal(false);
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
                <label htmlFor="equipId" className="block text-sm font-medium text-gray-700">Producto</label>
                <select id="equipId" name="equipId" value={formData.equipId} onChange={handleChange} className='w-full text-black py-2 my-2 px-4 bg-transparent border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-indigo-500' disabled={!!product_id}>
                  <option value="">Seleccionar</option>
                  {equips.map(equip => (
                    <option key={equip.id} value={equip.id}>{equip.name}</option>
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
                <label htmlFor="serial" className="block text-sm font-medium text-gray-700">Número de Serie</label>
                <input type="text" name="serial" id="serial" value={formData.serial} onChange={handleChange} className='w-full text-black py-2 my-2 px-4 bg-transparent border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-indigo-500' />
              </div>

              <div className="mt-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descripción del Problema</label>
                <textarea id="description" name="description" value={formData.description} onChange={handleChange} className='w-full text-black py-2 my-2 px-4 bg-transparent border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-indigo-500' rows="4"></textarea>
              </div>
            </div>

            <div className="border-b border-gray-200 py-8">
              <h2 className="text-lg font-semibold">Información del Solicitante</h2>
              <p className="text-sm text-gray-600">Por favor, introduzca su información de contacto.</p>

              <div className="mt-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label>
                <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className='w-full text-black py-2 my-2 px-4 bg-transparent border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-indigo-500' />
              </div>

              <div className="mt-4">
                <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">Apellido</label>
                <input type="text" name="lastname" id="lastname" value={formData.lastname} onChange={handleChange} className='w-full text-black py-2 my-2 px-4 bg-transparent border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-indigo-500' />
              </div>

              <div className="mt-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className='w-full text-black py-2 my-2 px-4 bg-transparent border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-indigo-500' />
              </div>

              <div className="mt-4">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Teléfono</label>
                <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange} className='w-full text-black py-2 my-2 px-4 bg-transparent border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-indigo-500' />
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

            <div className="mt-4">
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">Estatus</label>
                <select id="status" name="status" value={formData.status} onChange={handleChange} className='w-full text-black py-2 my-2 px-4 bg-transparent border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-indigo-500'>
                  <option value="">Seleccionar</option>
                    <option key="Pendiente" value="pendiente">Pendiente</option>
                </select>
              </div>

            <div className="py-8">
              <h2 className="text-lg font-semibold">Imagen del Producto</h2>
              <p className="text-sm text-gray-600">Puede adjuntar una imagen del producto para que tengamos una mejor idea.</p>

              <div className="mt-4">
                <input type="file" name="image" id="image" onChange={handleFileChange} className="text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" />
              </div>
            </div>

            <div className="mt-8">
              <button type="submit" className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-150" disabled={isSubmitting}>
                {isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}
              </button>
            </div>
          </div>
        </form>

        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className={`text-lg font-semibold ${message.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                {message.type === 'success' ? 'Éxito' : 'Error'}
              </h2>
              <p className="mt-4">{message.text}</p>
              <button
                onClick={handleModalClose}
                className="mt-6 py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-150"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Form;
